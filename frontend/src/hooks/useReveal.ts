import { useEffect, useRef, useState } from 'react'

export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const revealIfReached = () => {
      const top = node.getBoundingClientRect().top
      return top < window.innerHeight * 0.92
    }

    if (revealIfReached()) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry?.isIntersecting ||
          (entry && entry.boundingClientRect.top < window.innerHeight)
        ) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '80px 0px -5% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, visible }
}
