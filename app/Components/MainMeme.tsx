"use client"
import Image from "next/image"
import ResizableBox from "./ResizableBox"
import { ForwardedRef, forwardRef, useContext } from "react"
import { SettingsContext } from "@/context/SettingsProvider"

const MainMeme = forwardRef(({ selectedMeme }: { selectedMeme: Meme | null }, ref : ForwardedRef<HTMLDivElement>) => {
    const boxCount = []
    for (let i = 0; i < selectedMeme?.box_count!; i++) {
        boxCount.push(i)
    }

    const context = useContext(SettingsContext)
    return (
        <div className="basis-full rounded-lg flex flex-col items-center">
            {selectedMeme && (
                <div ref={ref} className="relative max-w-max">
                    <Image
                        className={`relative`}
                        alt={selectedMeme?.name}
                        width={selectedMeme?.width}
                        height={selectedMeme?.height}
                        src={selectedMeme?.url} />
                    <div className="absolute top-0 left-0">
                        {
                            boxCount.map((box) => (
                                <ResizableBox
                                    ref={ref}
                                    settings={context?.memeSettings?.settings[box]!}
                                    key={box}
                                />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
})



MainMeme.displayName = "MainMeme"


export default MainMeme