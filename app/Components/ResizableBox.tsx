"use client";
import React, { ForwardedRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { getFontFamilyClass } from "@/lib/fontFamily";

type ResizableBoxProps = React.AllHTMLAttributes<HTMLDivElement>;

const ResizableBox = React.forwardRef<
  HTMLDivElement,
  ResizableBoxProps & {
    settings: MemeTextSetting;
  }
>(({ className, settings }, ref: ForwardedRef<HTMLDivElement>) => {
  const refImageHeight =
    typeof ref === "function" ? 0 : ref?.current?.clientHeight!;
  const refImageWidth =
    typeof ref === "function" ? 0 : ref?.current?.clientWidth!;
  const [isDraggable, setIsDraggable] = React.useState<boolean>(true);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [boxSize, setBoxSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: boxRef.current?.clientWidth!,
    height: boxRef.current?.clientHeight!,
  });
  const [memeSize, setMemeSize] = React.useState<{
    width: number;
    height: number;
  }>({
    width: refImageWidth,
    height: refImageHeight,
  });
  useEffect(() => {
    setMemeSize({
      width: typeof ref !== "function" ? ref?.current?.clientWidth! : 0,
      height: typeof ref !== "function" ? ref?.current?.clientHeight! : 0,
    });
  }, [refImageHeight !== memeSize.height, refImageWidth !== memeSize.width]);
  return (
    <motion.div
      ref={boxRef}
      onDoubleClick={() => setIsDraggable((prev) => !prev)}
      onResize={() => setIsDraggable(false)}
      drag={isDraggable}
      dragConstraints={{
        top: 0,
        left: 0,
        right: memeSize.width - boxSize.width,
        bottom: memeSize.height - boxSize.height,
      }}
      onDragEnd={(event, info) => {
        setBoxSize({
          width: boxRef.current?.clientWidth!,
          height: boxRef.current?.clientHeight!,
        });
        setMemeSize({ width: refImageWidth!, height: refImageHeight! });
      }}
      dragElastic={1}
      dragMomentum={false}
      style={{
        resize: "both",
        color: settings?.color,
        textTransform: settings?.isAllCaps ? "uppercase" : "initial",
        fontWeight: settings?.isBold ? "bold" : "normal",
        fontStyle: settings?.isItalic ? "italic" : "normal",
        fontSize: settings?.fontSize,
        opacity: settings?.opacity,
        textShadow:
          settings?.textDecoration !== "shadow"
            ? "none"
            : `0px 0px ${settings?.outlineWidth}px ${settings?.outlineColor}`,
        WebkitTextStroke:
          settings?.textDecoration !== "outline"
            ? "0px"
            : `${settings?.outlineWidth}px ${settings?.outlineColor}`,
      }}
      className={twMerge(
        `absolute top-0 left-0 w-[200px] sm:w-[400px] h-20 z-50 overflow-hidden
                hover:outline hover:outline-black hover:outline-2 roundedlg select-none flex`,
        className,
        `${
          isDraggable ? "active:cursor-grabbing cursor-grab" : "cursor-default"
        }`,
        `${getFontFamilyClass(settings?.fontFamily ?? "")}`,
        `${
          settings?.verticalAlign === "top"
            ? "items-start"
            : settings?.verticalAlign === "bottom"
            ? "items-end"
            : "items-center"
        }`,
        `${
          settings?.textAlign === "left"
            ? "justify-start"
            : settings?.textAlign === "right"
            ? "justify-end"
            : "justify-center"
        }`
      )}
    >
      <span>{settings?.text}</span>
    </motion.div>
  );
});

ResizableBox.displayName = "ResizableBox";

export default ResizableBox;
