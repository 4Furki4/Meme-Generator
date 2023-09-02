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
    return (
        <motion.div
            onDoubleClick={() => setIsDraggable((prev) => !prev)}
            onResize={() => setIsDraggable(false)}
            drag={isDraggable}
            dragConstraints={{
                top: 0,
                left: 0,
                right: maxWidth - 400,
                bottom: maxHeight - 80,
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
                    opacity: settings?.opacity
                }
            } className={twMerge(`absolute top-0 left-0 w-[400px] h-20 z-50 overflow-hidden hover:outline hover:outline-black hover:outline-2 roundedlg`,
                className,
                `text-${settings?.textAlign} text-[${settings?.color}]`,
                `${isDraggable ? "cursor-move" : "cursor-pointer"}`
            )} >
            {settings?.text}
        </motion.div >
    )
}
