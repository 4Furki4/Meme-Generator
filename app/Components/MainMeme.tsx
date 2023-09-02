"use client"
import Image from "next/image"
import ResizableBox from "./ResizableBox"
import { useContext, useRef } from "react"
import { SettingsContext } from "@/context/SettingsProvider"


export default function MainMeme({ selectedMeme }: { selectedMeme: Meme | null }) {
    const boxCount = []
    for (let i = 0; i < selectedMeme?.box_count!; i++) {
        boxCount.push(i)
    }
    const context = useContext(SettingsContext)
    const imageRef = useRef<HTMLImageElement>(null)
    const imageWidth = imageRef.current?.width
    const imageHeight = imageRef.current?.height
    return (
        <div className="basis-full rounded-lg">
            {selectedMeme && (
                <div className="w-full h-full relative">
                    <Image
                        ref={imageRef}
                        className="absolute top-0 left-0 rounded-lg"
                        alt={selectedMeme?.name}
                        width={selectedMeme?.width}
                        height={selectedMeme?.height}
                        src={selectedMeme?.url} />
                    <div className="absolute">
                        {
                            boxCount.map((box) => (
                                <ResizableBox
                                    settings={context?.memeSettings?.settings[box]!}
                                    maxHeight={imageHeight!}
                                    maxWidth={imageWidth!}
                                    key={box}
                                    width={selectedMeme.width}
                                    height={selectedMeme.height}
                                />
                            ))
                        }
                    </div>
                </div>
            )}
        </div>
    )
}
