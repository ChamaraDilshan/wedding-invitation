import { useEffect, useState } from 'react'
import { APPS_SCRIPT_URL } from '../data/config.js'

const FADE_MS = 700 // fade in/out duration (keep in sync with duration-700 below)

// Longer greetings stay on screen longer: ~2.5s base + 60ms per character,
// never less than 4s and never more than 10s.
function readTimeMs(text) {
  return Math.min(10000, Math.max(4000, 2500 + (text?.length || 0) * 60))
}

export default function GreetingsLoop({ refreshKey }) {
  const [greetings, setGreetings] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(APPS_SCRIPT_URL)
        const data = await res.json()
        const withMessages = (Array.isArray(data) ? data : []).filter(
          (row) => row.greeting && String(row.greeting).trim().length > 0,
        )
        if (!cancelled) {
          setGreetings(withMessages)
          setIndex(0)
          setVisible(true)
          setStatus('ready')
        }
      } catch (err) {
        console.error(err)
        if (!cancelled) setStatus('error')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [refreshKey])

  // Show the current greeting, fade it out, then move to the next one.
  useEffect(() => {
    if (status !== 'ready' || greetings.length < 2) return

    const showFor = readTimeMs(greetings[index]?.greeting)
    const fadeOut = setTimeout(() => setVisible(false), showFor)
    const next = setTimeout(() => {
      setIndex((i) => (i + 1) % greetings.length)
      setVisible(true)
    }, showFor + FADE_MS)

    return () => {
      clearTimeout(fadeOut)
      clearTimeout(next)
    }
  }, [status, greetings, index])

  if (status === 'loading') {
    return <p className="text-center text-ink/70">Loading messages…</p>
  }

  if (status === 'error' || greetings.length === 0) {
    return (
      <p className="text-center text-ink/70">
        Be the first to leave a message for the couple!
      </p>
    )
  }

  const current = greetings[index]

  return (
    <div className="mx-auto flex min-h-[15rem] max-w-md items-center justify-center px-6">
      <figure
        aria-live="polite"
        className={`relative w-full rounded-2xl border border-gold/70 bg-white/90 px-8 pb-8 pt-12 text-center shadow-[0_12px_40px_rgba(59,47,42,0.10)] transition-opacity duration-700 ease-in-out motion-reduce:transition-none sm:px-10 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* decorative opening quote */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 -translate-x-1/2 font-display text-6xl leading-none text-gold"
        >
          &ldquo;
        </span>

        <blockquote className="whitespace-pre-line break-words font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
          {current.greeting}
        </blockquote>

        <div className="mx-auto my-5 h-px w-16 bg-gold/70" aria-hidden="true" />

        <figcaption className="font-display text-sm font-semibold uppercase tracking-wide-label text-olive">
          {current.name || 'A guest'}
        </figcaption>
      </figure>
    </div>
  )
}
