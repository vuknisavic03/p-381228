
import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-[#E7E8EC] bg-white px-4 py-2 text-sm text-gray-900 ring-offset-background placeholder:text-[#9EA3AD] focus-visible:outline-none focus:border-[#006FB5] focus:ring-1 focus:ring-[#006FB5] disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
