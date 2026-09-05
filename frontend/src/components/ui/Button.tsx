import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    href?: undefined
    download?: undefined
  }

type ButtonAsLink = CommonProps & {
  href: string
  download?: boolean | string
  type?: never
  onClick?: () => void
}

type ButtonProps = ButtonAsButton | ButtonAsLink

function classNames(variant: Variant, className?: string) {
  return ['btn', `btn--${variant}`, className].filter(Boolean).join(' ')
}

export function Button(props: ButtonProps) {
  const { children, variant = 'primary', className } = props
  const classes = classNames(variant, className)

  if ('href' in props && props.href) {
    const isHash = props.href.startsWith('#')
    return (
      <a
        className={classes}
        href={props.href}
        onClick={props.onClick}
        download={props.download}
        {...(isHash || props.download
          ? {}
          : { target: '_blank', rel: 'noreferrer noopener' })}
      >
        {children}
      </a>
    )
  }

  const { type = 'button', onClick, disabled } = props as ButtonAsButton
  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
