
import * as React from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { cn } from "@/lib/utils";

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden rounded-md", className)}
    {...props}
  >
    {children}
  </AspectRatioPrimitive.Root>
));

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
