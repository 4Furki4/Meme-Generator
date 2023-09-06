import { Button } from '@/components/ui/button'
import { CardDescription } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Check, ChevronsUpDown, Settings } from 'lucide-react'
import { getFontFamilies } from '@/lib/fontFamily'
import React, { useContext, useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { SettingsContext } from '@/context/SettingsProvider'
import { handleAllCapsed, handleBolded, handleChangeFontFamily, handleFontSizeChange, handleItalicized, handleOpacityChange, handleOutlineWidthChange, handleTextAlignChange, handleTextDecoration, handleVerticalAlignChange } from '@/lib/stateHandlers'
export default function ExtendedSettings({ index }: {
    index: number
}) {

    const context = useContext(SettingsContext)
    const [openSettings, setOpenSettings] = useState(false)
    const [openFontFamily, setOpenFontFamily] = useState(false)
    const [selectedFontFamily, setSelectedFontFamily] = useState(() => context?.memeSettings?.settings[index]?.fontFamily ?? "")
    useEffect(() => {
        setSelectedFontFamily(() => context?.memeSettings?.settings[index]?.fontFamily ?? "")
    }, [context?.memeSettings?.settings[index]?.fontFamily])
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
                                        getFontFamilies().map((font, i) => (
                                            <CommandItem
                                                className='cursor-pointer'
                                                key={i}
                                                onSelect={(currentFamily) => handleChangeFontFamily(currentFamily, selectedFontFamily, context, index, setOpenFontFamily, setSelectedFontFamily)}
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
                            <Checkbox
                                checked={context?.memeSettings?.settings[index]?.isAllCaps}
                                onCheckedChange={() => handleAllCapsed(context, index)}
                                id={`all-caps-${index}`}
                            />
                            <label htmlFor={`all-caps-${index}`}
                                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none">
                                ALL CAPS
                            </label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                                checked={context?.memeSettings?.settings[index]?.isBold}
                                onCheckedChange={() => handleBolded(context, index)}
                                id={`bold-${index}`}
                            />
                            <label htmlFor={`bold-${index}`}
                                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none">
                                <strong className='font-extrabold'>Bold</strong>
                            </label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Checkbox
                                checked={context?.memeSettings?.settings[index]?.isItalic}
                                onCheckedChange={() => handleItalicized(context, index)}
                                id={`italic-${index}`}
                            />
                            <label htmlFor={`italic-${index}`}
                                className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none ">
                                <i>Italic</i>
                            </label>
                        </div>
                    </div>
                    {/* Text Decoration Ends */}

                    {/* Text Shadow-Outline Starts */}
                    <RadioGroup
                        defaultValue='outline'
                        value={context?.memeSettings?.settings[index]?.textDecoration}
                        onValueChange={(value: "outline" | "shadow" | "none") => handleTextDecoration(context, value, index)}
                        className='w-full flex justify-between'>
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
                        <Input
                            min={0}
                            max={5}
                            value={context?.memeSettings?.settings[index]?.outlineWidth ?? 0}
                            onChange={(e) => {
                                const outlineWidth = Number.parseInt(e.target.value, 10)
                                handleOutlineWidthChange(context, outlineWidth, index)
                            }}
                            className='col-span-1'
                            id='outline-width'
                            type='number' />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                        <Label className='col-span-2' htmlFor='font-size'>
                            {"Font Size (px)"}
                        </Label>
                        <Input
                            value={context?.memeSettings?.settings[index]?.fontSize ?? 0}
                            onChange={(e) => {
                                const fontSize = Number.parseInt(e.target.value, 10)
                                handleFontSizeChange(context, fontSize, index)
                            }}
                            className='col-span-1' id='font-size' type='number' />
                    </div>
                    {/* Text Alignment Starts */}
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor='font-size'>
                            {"Text Align"}
                        </Label>
                        <Select
                            defaultValue={context?.memeSettings?.settings[index]?.textAlign ?? "left"}
                            onValueChange={(value: "left" | "center" | "right") => {
                                handleTextAlignChange(context, value, index)
                            }}
                        >
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
                        <Select
                            defaultValue={context?.memeSettings?.settings[index]?.verticalAlign ?? "top"}
                            onValueChange={(value: "top" | "center" | "bottom") => {
                                handleVerticalAlignChange(context, value, index)
                            }}
                        >
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
                            onValueChange={([value]) => {
                                handleOpacityChange(context, value / 100, index)
                            }}
                            id='opacity'
                            className='col-span-3'
                            defaultValue={[context?.memeSettings?.settings[index]?.opacity ? context?.memeSettings?.settings[0]?.opacity * 100 : 100]}
                            max={100}
                            step={1} />
                        <Input
                            value={context?.memeSettings?.settings[index]?.opacity}
                            onChange={(e) => {
                                const opacity = Number.parseFloat(e.target.value)
                                handleOpacityChange(context, opacity, index)
                            }}
                            max={1} min={0} className='col-span-2' id='opacity' type='number' />
                    </div>
                    {/* Opacity Ends */}
                </PopoverContent>
            </Popover>
        </>
    )
}
