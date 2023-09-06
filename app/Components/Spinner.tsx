import { cn } from '@/lib/utils'
import React from 'react'
type SpinnerProps = React.HTMLAttributes<HTMLDivElement>
const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={cn(
            'animate-spin rounded-full h-16 w-16 border-4 border-b-transparent border-s-foreground',
            className
        )}>
        </div>
    )
})


Spinner.displayName = "Spinner"

export default Spinner