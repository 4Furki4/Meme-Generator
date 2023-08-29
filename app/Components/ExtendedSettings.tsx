import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Check, ChevronsUpDown, Command, Settings } from 'lucide-react'
import { getFontFamilies } from '@/lib/fontFamily'
import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

export default function ExtendedSettings() {

    const [openSettings, setOpenSettings] = React.useState(false)
    const [openFontFamily, setOpenFontFamily] = React.useState(false)
    const [selectedFontFamily, setSelectedFontFamily] = React.useState("")
    return (
        <>
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
        </>
    )
}
