'use client'
import { Arrow } from "@radix-ui/react-tooltip";
import { TooltipTrigger, Tooltip, TooltipContent } from "../shadcn/components/ui/tooltip";

export function TT({children, message }: {children : React.ReactNode , message : string }){
    return (
        <Tooltip>
            <TooltipTrigger >
                {children}
            </TooltipTrigger>
            <TooltipContent>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    );
}