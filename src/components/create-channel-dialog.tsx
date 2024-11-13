import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import Typography from './ui/Typography';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { createChannel } from '@/actions/create-channel';
import { useRouter } from 'next/navigation';

const CreateChannelDialog: FC<{ dialogOpen: boolean; setDialogOpen: Dispatch<SetStateAction<boolean>>; workspaceId: string; userId: string; }> = ({ dialogOpen, setDialogOpen, workspaceId, userId }) => {

    const formSchema = z.object({
        name: z.string().min(2, { message: "Channel name must be atleast 2 characters long." })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })

    const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
        try {
            setIsSubmitting(true);

            await createChannel({ name, workspaceId, userId });

            router.refresh();
            setDialogOpen(false);
            setIsSubmitting(false);
            form.reset();
            toast.success("Channel created successfully");

        } catch (err: unknown) {
            console.log(err)
            setIsSubmitting(false);
            toast.error("Something went wrong. Please try again later.")
        }
        console.log(name);
    }

    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(prev => !prev)}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle className='my-4'>
                        <Typography text='Create Channel' variant='h4' className='font-semibold tracking-wider' />
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField name='name' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Typography text='Channel Name' variant='p' />
                                </FormLabel>

                                <FormControl>
                                    <Input placeholder='Channel 1' {...field} />
                                </FormControl>

                                <FormDescription >
                                    <Typography text='This is your channel name.' variant='p' />
                                </FormDescription>

                                <FormMessage></FormMessage>
                            </FormItem>
                        )}></FormField>

                        <Button disabled={isSubmitting} type="submit" className='my-2'>
                            {
                                isSubmitting ? "Creating Channel..." : "Create"
                            }
                        </Button>
                    </form>

                </Form>
            </DialogContent>
        </Dialog>
    )
}


export default CreateChannelDialog