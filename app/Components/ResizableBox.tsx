"use client"
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
type ResizableBoxProps = React.AllHTMLAttributes<HTMLDivElement>
export default function ResizableBox({ className, maxWidth, maxHeight, settings }:
    ResizableBoxProps & {
        maxWidth: number,
        maxHeight: number,
        settings: MemeTextSetting
    }) {
    const [isDraggable, setIsDraggable] = React.useState<boolean>(true)
    const boxRef = React.useRef<HTMLDivElement>(null)
    const [boxSize, setBoxSize] = React.useState<{ width: number, height: number }>({
        width: boxRef.current?.clientWidth!,
        height: boxRef.current?.clientHeight!
    })
    return (
        <motion.div
            ref={boxRef}
            onDoubleClick={() => setIsDraggable((prev) => !prev)}
            onResize={() => setIsDraggable(false)}
            drag={isDraggable}
            dragConstraints={{
                top: 0,
                left: 0,
                right: maxWidth - boxSize.width,
                bottom: maxHeight - boxSize.height,
            }}
            onDragEnd={(event, info) => {
                if (boxRef.current?.clientHeight !== boxSize.height || boxRef.current?.clientWidth !== boxSize.width) {
                    setBoxSize({ width: boxRef.current?.clientWidth!, height: boxRef.current?.clientHeight! })
                }
            }}
            dragElastic={1}
            dragMomentum={false}
            style={
                {
                    resize: "both",
                    maxWidth, maxHeight,
                    color: settings?.color,
                    textTransform: settings?.isAllCaps ? "uppercase" : "initial",
                    fontWeight: settings?.isBold ? "bold" : "normal",
                    fontStyle: settings?.isItalic ? "italic" : "normal",
                    fontFamily: settings?.fontFamily,
                    fontSize: settings?.fontSize,
                    opacity: settings?.opacity,
                    textShadow: settings?.textDecoration === "shadow" ? `0px 0px ${settings?.outlineWidth}px ${settings?.outlineColor}` : "none",
                    WebkitTextStroke: settings?.textDecoration === "outline" ? `${settings?.outlineWidth}px ${settings?.outlineColor}` : "none",
                    textAlign: settings?.textAlign,
                }
            } className={twMerge(`absolute top-0 left-0 w-[200px] sm:w-[400px] h-20 z-50 overflow-hidden 
                hover:outline hover:outline-black hover:outline-2 roundedlg select-none`,
                className,
                `${isDraggable ? "cursor-move" : "cursor-pointer"}`
            )} >
            {settings?.text}
        </motion.div >
    )
}
