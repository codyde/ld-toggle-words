"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
<SwitchPrimitives.Root
  className={cn(
    "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 relative",
    className
  )}
  {...props}
  ref={ref}
>
  <span 
    style={{
      background: props.checked ? 'linear-gradient(41.76deg, #912FD6 -17.05%, #00CDED 147.06%)' : 'rgba(71, 71, 71, 1)'
    }}
    className={cn(
      "absolute inset-0 rounded-full transition-colors",
    )}
  />
  <SwitchPrimitives.Thumb
    className={cn(
      "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
    )}
  />
</SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
