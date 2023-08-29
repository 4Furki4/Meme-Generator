import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TooltipContent, TooltipTrigger, Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import { Check, ChevronsUpDown, Settings } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { getFontFamilies } from '@/lib/fontFamily'
export default function MemeSettings({ settings, setSettings, otherMemes, setOtherMemes, selectedMeme, setSelectedMeme }:
    {
        settings: MemeTextSettings,
        setSettings: React.Dispatch<React.SetStateAction<MemeTextSettings>>,
        otherMemes: Meme[],
        setOtherMemes: React.Dispatch<React.SetStateAction<Meme[]>>,
        selectedMeme: Meme | null,
        setSelectedMeme: React.Dispatch<React.SetStateAction<Meme | null>>,
    }) {
    const [openOtherMemes, setOpenOtherMemes] = React.useState(false)
    const [openSettings, setOpenSettings] = React.useState(false)
    const [memeValue, setMemeValue] = React.useState("")
    const [openFontFamily, setOpenFontFamily] = React.useState(false)
    const [selectedFontFamily, setSelectedFontFamily] = React.useState("")
    return (
        <Card className='basis-full'>
            <CardHeader>
                <Popover open={openOtherMemes} onOpenChange={setOpenOtherMemes}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role='combobox'
                            aria-expanded={openOtherMemes}
                            className='justify-between'
                        >
                            {
                                memeValue === "" ? "Select a meme" : memeValue
                            }
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[250px] md:w-[300px] p-2'>
                        <Command>
                            <CommandInput className='p-4' placeholder="Search for a meme" />
                            <CommandEmpty>No Memes Found</CommandEmpty>
                            <CommandGroup>
                                <ScrollArea className='max-h-[250px] md:max-h-[500px] overflow-y-scroll' >
                                    {
                                        otherMemes.map((meme) => (
                                            <CommandItem
                                                className='flex gap-2'
                                                key={meme?.id}
                                                onSelect={(currentMeme) => {
                                                    setMemeValue(currentMeme === memeValue ? "" : currentMeme)
                                                    setSelectedMeme(meme)
                                                    setOpenOtherMemes(false)
                                                }}
                                            >
                                                <Check
                                                    className={
                                                        cn("mr-2 h-4 w-4",
                                                            meme?.id === selectedMeme?.id ? "opacity-100" : "opacity-0"
                                                        )
                                                    }
                                                />
                                                <Image
                                                    src={meme?.url}
                                                    alt={meme?.name}
                                                    width={50}
                                                    height={50}
                                                    className="rounded-lg"
                                                    loading='lazy'
                                                    sizes='50px'
                                                />
                                                <CardDescription>{meme?.name}</CardDescription>
                                            </CommandItem>
                                        ))
                                    }
                                </ScrollArea>

                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </CardHeader>
            <CardContent>
                {/* Text Settings Start */}
                <Card>
                    <CardContent className='flex gap-1 sm:gap-4 items-center max-sm:p-1'>
                        <Input placeholder='Text #1' />
                        {/* Text and Outline colors with info that's being displayed when hovered start */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className='w-20 cursor-pointer' asChild>
                                    <Input type='color' />
                                </TooltipTrigger>
                                <TooltipContent className='p-2 bg-black/25 backdrop-blur-lg rounded-lg'>
                                    Change text color
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger className='w-20 cursor-pointer' asChild>
                                    <Input type='color' />
                                </TooltipTrigger>
                                <TooltipContent className='p-2 bg-black/25 backdrop-blur-lg rounded-lg'>
                                    Change outline color
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/* Text and Outline colors with info that's being displayed when hovered start */}

                        {/* Settings button start */}
                        <Popover open={openSettings} onOpenChange={setOpenSettings}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className='mx-auto justify-between'>
                                    <Settings className="w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-80 grid gap-4'>
                                {/* Font Family Starts */}
                                <Popover open={openFontFamily} onOpenChange={setOpenFontFamily}>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className='justify-between'>
                                            {
                                                selectedFontFamily === "" ? "Select a font" : selectedFontFamily
                                            }
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80 grid gap-4'>
                                        <Command>
                                            <CommandInput className='p-4' placeholder="Search for a font" />
                                            <CommandEmpty>No Fonts Found</CommandEmpty>
                                            <CommandGroup className='h-40 overflow-y-scroll'>
                                                {
                                                    getFontFamilies().map((font, index) => (
                                                        <CommandItem
                                                            className='cursor-pointer'
                                                            key={index}
                                                            onSelect={(currentFont) => {
                                                                setSelectedFontFamily(currentFont === selectedFontFamily ? "" : currentFont)
                                                                setOpenFontFamily(false)
                                                            }}
                                                        >
                                                            <Check
                                                                className={
                                                                    cn("mr-2 h-4 w-4",
                                                                        font.toLowerCase() === selectedFontFamily.toLowerCase() ? "opacity-100" : "opacity-0"
                                                                    )
                                                                }
                                                            />
                                                            <CardDescription>{font}</CardDescription>
                                                        </CommandItem>
                                                    ))
                                                }
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>


                                {/* Font Family Ends */}
                                {/* Text Decoration Starts */}
                                <div className='w-full justify-between flex items-center space-x-2'>
                                    <div className='flex items-center space-x-2'>
                                        <Checkbox id='all-caps' />
                                        <label htmlFor="all-caps"
                                            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none">
                                            ALL CAPS
                                        </label>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <Checkbox id='bold' />
                                        <label htmlFor="bold"
                                            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none">
                                            <strong className='font-extrabold'>Bold</strong>
                                        </label>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <Checkbox id='italic' />
                                        <label htmlFor="italic"
                                            className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none ">
                                            <i>Italic</i>
                                        </label>
                                    </div>
                                </div>
                                {/* Text Decoration Ends */}

                                {/* Text Shadow-Outline Starts */}
                                <RadioGroup className='w-full flex justify-between'>
                                    <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='shadow' id='shadow' />
                                        <Label className='cursor-pointer' htmlFor='shadow'>Shadow</Label>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='outline' id='outline' />
                                        <Label className='cursor-pointer' htmlFor='outline'>Outline</Label>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <RadioGroupItem value='none' id='none' />
                                        <Label className='cursor-pointer' htmlFor='none'>None</Label>
                                    </div>
                                </RadioGroup>

                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label className='col-span-2' htmlFor='outline-width'>
                                        {"Outline Width (px)"}
                                    </Label>
                                    <Input className='col-span-1' id='outline-width' type='number' />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label className='col-span-2' htmlFor='font-size'>
                                        {"Font Size (px)"}
                                    </Label>
                                    <Input className='col-span-1' id='font-size' type='number' />
                                </div>
                                {/* Text Alignment Starts */}
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor='font-size'>
                                        {"Text Align"}
                                    </Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Text Alignment</SelectLabel>
                                                <SelectItem value='left'>Left</SelectItem>
                                                <SelectItem value='center'>Center</SelectItem>
                                                <SelectItem value='right'>Right</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Text Alignment Ends */}

                                {/* Vertical Alignment Starts */}
                                <div className="grid grid-cols-2 items-center gap-4">
                                    <Label htmlFor='font-size'>
                                        {"Vertical Align"}
                                    </Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Vertical Alignment</SelectLabel>
                                                <SelectItem value='top'>Top</SelectItem>
                                                <SelectItem value='center'>Center</SelectItem>
                                                <SelectItem value='bottom'>Bottom</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Vertical Alignment Ends */}

                                {/* Opacity Starts */}
                                <div className='grid grid-cols-7 items-center gap-2'>
                                    <Label className='col-span-2'>Opacity</Label>
                                    <Slider
                                        id='opacity'
                                        className='col-span-3'
                                        defaultValue={[100]}
                                        max={100}
                                        step={1} />
                                    <Input max={1} min={0} className='col-span-2' id='opacity' type='number' />
                                </div>
                                {/* Opacity Ends */}

                                {/* TODO: FONT FAMILY OPTIONS */}
                            </PopoverContent>
                        </Popover>
                        {/* Settings button end */}
                    </CardContent>
                </Card>
                {/* Text Settings End */}
            </CardContent>
        </Card>
    )
}
