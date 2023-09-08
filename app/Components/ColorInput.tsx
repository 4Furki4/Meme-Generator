import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SettingsContext } from "@/context/SettingsProvider";
import React from "react";

export default function ColorInput({
  index,
  handler,
  value,
  tooltipContent,
}: {
  index: number;
  handler: (context: SettingsContext, color: string, index: number) => void;
  value: string | undefined;
  tooltipContent: string;
}) {
  const [color, setColor] = React.useState<string>("#ffffff");
  const context = React.useContext(SettingsContext);
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger className="w-20 cursor-pointer" asChild>
          <Input
            value={value}
            onChange={(e) => setColor(e.currentTarget.value)}
            onBlur={() => handler(context, color, index)}
            type="color"
          />
        </TooltipTrigger>
        <TooltipContent className="p-2 bg-black/25 backdrop-blur-lg rounded-lg">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
