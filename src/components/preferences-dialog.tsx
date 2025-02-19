"use client"
import { UsecolorPreferences } from '@/provider/color-preferences';
import { useTheme } from 'next-themes'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Typography from '@/components/ui/Typography';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HiOutlinePaintBrush } from "react-icons/hi2"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MdLightMode } from 'react-icons/md';
import { BsLaptop } from 'react-icons/bs';

const PreferencesDialog = () => {
    const { setTheme, theme } = useTheme();
    const { selectColor } = UsecolorPreferences();


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Typography className='hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer' variant='p' text='Preferences' />
            </DialogTrigger>
            <DialogContent className='max-w-md  '>
                <DialogTitle>
                    <Typography variant='h3' text="Preferences" className='py-5' />
                    <hr className='bg-gray-200' />
                </DialogTitle>

                <Tabs orientation="horizontal" defaultValue='themes'>
                    <TabsList>
                        <TabsTrigger value='themes'>
                            <HiOutlinePaintBrush className="mr-2" />
                            <Typography text='Themes' variant='p' />
                        </TabsTrigger>

                    </TabsList>
                    <TabsContent className="max-w-sm" value='themes'>
                        <Typography text="Color Mode" variant='p' className='font-semibold' />
                        <Typography text="Choose the color theme as per your choice" variant='p' className='pb-4 text-xs' />
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" className={`w-full ${cn(theme === 'light' && "border-blue-600")}`} onClick={() => { setTheme("light") }}>
                                <Typography text='Light' variant='p' />
                                <MdLightMode className='mr-2' size={20} />
                            </Button>

                            <Button variant="outline" className={`w-full ${cn(theme === 'dark' && "border-blue-600")}`} onClick={() => { setTheme("dark") }}>
                                <Typography text='Dark' variant='p' />
                                <BsLaptop className='mr-2' size={20} />
                            </Button>

                            {/* <Button variant="outline" className={`w-full ${cn(theme === 'system' && "border-blue-600")}`} onClick={() => { setTheme("system") }}>
                                <Typography text='System' variant='p' />
                                <MdLightMode className='mr-2' size={20} />
                            </Button> */}
                        </div>

                        <hr className='bg-gray-200 my-5' />
                        <Typography text='Single Color' variant='p' className='py-2 font-bold' />
                        <div className='flex flex-wrap gap-2'>
                            <Button className='w-full hover:border-green-800 border-2' variant={"outline"} onClick={() => { selectColor("green") }}>Green</Button>

                            <Button className='w-full hover:border-blue-800 border-2' variant={"outline"} onClick={() => { selectColor("blue") }}>Blue</Button>

                            <Button className='w-full hover:border-purple-800 border-2' variant={"outline"} onClick={() => { selectColor('') }}>Reset</Button>
                        </div>

                    </TabsContent>
                </Tabs>
            </DialogContent>

        </Dialog>
    )
}

export default PreferencesDialog