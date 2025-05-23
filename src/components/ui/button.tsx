import type { ComponentProps } from 'react'
import { type VariantProps, tv } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex justify-center items-center transition-colors px-4 py-2 h-14 text-xl font-medium rounded-md outline-none',
  variants: {
    variant: {
      default:
        'border bg-neutral-900/80 text-white transition-colors hover:bg-neutral-900 border-neutral-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={button({ className, variant })}
      {...props}
    />
  )
}
