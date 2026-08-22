import { useEffect, useState } from 'react'
import { APPS_SCRIPT_URL } from '../data/config.js'

export default function GreetingsLoop({ refreshKey }) {
  const [greetings, setGreetings] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(APPS_SCRIPT_URL)
        const data = await res.json()
        const withMessages = (Array.isArray(data) ? data : []).filter(
          (row) => row.greeting && row.greeting.trim().length > 0,
        )
        if (!cancelled) {
          setGreetings(withMessages)
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

  if (status === 'loading') {
    return <p className="text-center text-ink/50">Loading messages…</p>
  }

  if (status === 'error' || greetings.length === 0) {
    return (
      <p className="text-center text-ink/50">
        Be the first to leave a message for the couple!
      </p>
    )
  }

  // Duplicate the list so the CSS marquee can loop seamlessly.
  const looped = [...greetings, ...greetings]

  return (
    <div className="overflow-hidden">
      <div className="marquee-track">
        {looped.map((g, i) => (
          <div
            key={i}
            className="w-72 shrink-0 rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-sm"
          >
            <p className="font-display italic text-ink/90">"{g.greeting}"</p>
            <p className="mt-4 text-sm uppercase tracking-wide-label text-ink/50">
              — {g.name || 'A guest'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
