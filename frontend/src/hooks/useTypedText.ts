import { useEffect, useState } from 'react'

export function useTypedText(words: string[], typingMs = 68, pauseMs = 1500) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || words.length === 0) {
      setText(words[0] ?? '')
      setReady(false)
      return
    }

    setReady(true)
  }, [words])

  useEffect(() => {
    if (!ready || words.length === 0) return

    const word = words[index % words.length]
    const atFull = text === word
    const delay = deleting ? (text ? 36 : 280) : atFull ? pauseMs : typingMs

    const timer = window.setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1)
        setText(next)
        if (next === word) setDeleting(true)
        return
      }

      const next = word.slice(0, Math.max(0, text.length - 1))
      setText(next)
      if (next === '') {
        setDeleting(false)
        setIndex((current) => (current + 1) % words.length)
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [deleting, index, pauseMs, ready, text, typingMs, words])

  return ready ? text : (words[0] ?? '')
}
