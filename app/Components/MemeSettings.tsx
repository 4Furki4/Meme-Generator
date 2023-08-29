import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TooltipContent, TooltipTrigger, Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import { Check, ChevronsUpDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import ExtendedSettings from './ExtendedSettings'
import { SettingsContext } from '@/context/SettingsProvider'



export default function MemeSettings({ otherMemes, setOtherMemes, selectedMeme, setSelectedMeme }:
    {
        otherMemes: Meme[],
        setOtherMemes: React.Dispatch<React.SetStateAction<Meme[]>>,
        selectedMeme: Meme | null,
        setSelectedMeme: React.Dispatch<React.SetStateAction<Meme | null>>,
    }) {
    const context = React.useContext(SettingsContext)
    const [openOtherMemes, setOpenOtherMemes] = React.useState(false)
    const [memeValue, setMemeValue] = React.useState("")
    function getSettings() {
        const memeSettings = []
        for (let i = 0; i < selectedMeme?.box_count!; i++) {
            memeSettings.push(
                <>
                    <CardContent>
                        {/* Text Settings Start */}
                        <Card>
                            <CardContent className='flex gap-1 sm:gap-4 items-center max-sm:p-1'>
                                <Input placeholder='Text #1' value={context?.memeSettings?.settings[i]?.text} onChange={(e) => {
                                    const text = e.target.value
                                    context?.setMemeSettings((prev: MemeTextSettings) => {
                                        return {
                                            ...prev,
                                            settings: prev?.settings.map((setting, index) => {
                                                if (index === i) {
                                                    return {
                                                        ...setting,
                                                        text
                                                    }
                                                }
                                                return setting
                                            }
                                            )
                                        }
                                    }
                                    )
                                }} />
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
                                <ExtendedSettings />
                                {/* Settings button end */}
                            </CardContent>
                        </Card>
                        {/* Text Settings End */}
                    </CardContent>
                </>
            )
        }
        return memeSettings
    }

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
            {getSettings().map((setting, index) => (
                <React.Fragment key={index}>
                    {setting}
                </React.Fragment>
            ))
            }
        </Card>
    )
}
