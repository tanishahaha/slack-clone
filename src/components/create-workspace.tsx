import React, { useState } from 'react'
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa';
import Typography from './ui/Typography';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/input';
import ImageUpload from './image-upload';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import { createWorkspace } from '@/actions/create-workspace';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useCreateWorkspaceValues } from '@/hooks/create-workspace-values';

const CreateWorkspace = () => {
    const router = useRouter();
    const { imageUrl, updateImageUrl } = useCreateWorkspaceValues();
    const  [isDialogOpen, setIsDialogOpen  ]= useState(false);
    const [isSubmitting, setIsSubmitting] =useState(false);


    const formSchema = z.object({
        name: z.string().min(2, { message: "Name must be atleast of 2 characters long" }),

    })
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        },
    })

    async function onSubmit({ name }: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        const slug = slugify(name, { lower: true });
        const invite_code = uuidv4();
        const res = await createWorkspace({ name, slug, invite_code, imageUrl })

        setIsSubmitting(false);
        if (res?.error) {
            console.error(res.error);
        }
        
        router.refresh();
        form.reset();
        updateImageUrl('');
        setIsDialogOpen(false);

        toast.success("Workspace created successfully!");
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={()=>setIsDialogOpen(prev=>!prev)}>
            <DialogTrigger>
                <div className='flex items-center gap-2 p-2 cursor-pointer hover:opacity-80 border-none'>
                    <Button variant="secondary">
                        <FaPlus />
                    </Button>
                    <Typography variant='p' text='Add workspace' />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='my-4'>
                        <Typography variant='h4' text='Create Workspace' className='tracking-wide' />
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField control={form.control} name='name' render={({ field }) => <FormItem >
                            <FormLabel>
                                <Typography text="Name" variant='p' />
                            </FormLabel>
                            <FormControl>
                                <Input placeholder='Your company name' {...field} />
                            </FormControl>
                            <FormDescription>
                                <Typography text='This is the name of your workspace' variant='p' />
                            </FormDescription>
                            <FormMessage>

                            </FormMessage>
                        </FormItem>}></FormField>

                        <ImageUpload />

                        <Button type="submit" disabled={isSubmitting}>
                            <Typography variant="p" text='Submitt' />
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateWorkspace