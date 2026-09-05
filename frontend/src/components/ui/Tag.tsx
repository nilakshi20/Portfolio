import type { CSSProperties } from 'react'

type TagProps = {
  children: string
  style?: CSSProperties
}

export function Tag({ children, style }: TagProps) {
  return (
    <span className="tag" style={style}>
      {children}
    </span>
  )
}
