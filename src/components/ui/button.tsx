import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Botón ERVIA (docs/design-base.md §3). Pill, DM Sans 600, transiciones de 120 ms.
 * - primary: el ÚNICO uso del verde como relleno (CTA).
 * - secondary: azul.
 * - outline: transparente con borde.
 * Objetivo táctil mínimo de 44 px de alto (regla del proyecto).
 */
const buttonVariants = cva(
  [
    "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-pill border border-transparent",
    "font-body font-semibold whitespace-nowrap select-none no-underline",
    "transition-[background-color,box-shadow,border-color,color,transform] duration-(--duration-fast) ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-green-500 text-text-on-green shadow-cta",
          "hover:-translate-y-px hover:bg-green-400 hover:shadow-glow-green",
          "active:translate-y-0 active:bg-green-600 active:shadow-cta",
        ],
        secondary: [
          "bg-blue-500 text-text-on-blue",
          "hover:bg-blue-400 active:bg-blue-600",
        ],
        outline: [
          "border-border-default bg-transparent text-text-body",
          "hover:border-border-strong hover:text-text-strong",
        ],
      },
      size: {
        sm: "px-[18px] py-2 text-[14px]",
        md: "px-[22px] py-2.5 text-[15px]",
        lg: "px-[30px] py-3.5 text-[17px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      data-size={size ?? "md"}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Button, buttonVariants }
