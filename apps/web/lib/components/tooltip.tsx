'use client';
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '../shadcn/components/ui/tooltip';

export function TT({
  children,
  message,
}: {
  children: React.ReactNode;
  message: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>
  );
}
