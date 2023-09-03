"use client"
import React from 'react'
import { GithubIcon, Sun, Moon, Info } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    return (
        <nav className='w-3/4 mx-auto flex justify-center items-center py-1 px-2 gap-2 shadow-sm shadow-border'>
            <TooltipProvider>
                <Tooltip
                    defaultOpen={true}
                    delayDuration={100}>
                    <TooltipTrigger className='focus'>
                        <Info
                            size={40}
                            className='hover:bg-gray-100 hover:dark:bg-gray-800 rounded-full p-2'
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>
                            Please double click on the text boxes to switch between draggable and resizable mode.
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <Link href={"https://github.com/4Furki4/Meme-Generator"} target='_blank' className="hover:bg-gray-100 hover:dark:bg-gray-800 rounded-full p-2">
                <GithubIcon />
            </Link>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='' size="icon">
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                        Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                        System
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}
