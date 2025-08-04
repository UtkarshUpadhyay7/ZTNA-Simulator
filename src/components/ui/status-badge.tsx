import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        approved: "border-success bg-success/10 text-success shadow-glow-success",
        denied: "border-destructive bg-destructive/10 text-destructive shadow-glow-danger",
        pending: "border-warning bg-warning/10 text-warning",
        secure: "border-primary bg-primary/10 text-primary shadow-glow-primary",
        threat: "border-destructive bg-gradient-threat text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <div className={cn(statusBadgeVariants({ variant }), className)} {...props} />
  )
}

export { StatusBadge, statusBadgeVariants }