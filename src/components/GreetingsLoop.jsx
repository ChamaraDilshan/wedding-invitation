import { useEffect, useState } from 'react'
import { APPS_SCRIPT_URL } from '../data/config.js'

const SHOW_MS = 2000
const GAP_MS = 1500

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
          (row) => row.greeting && row.greeting.trim().length > 0,
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

  useEffect(() => {
    if (status !== 'ready' || greetings.length === 0) return

    let timeout
    let cancelled = false

    function cycle() {
      timeout = setTimeout(() => {
        if (cancelled) return
        setVisible(false)
        timeout = setTimeout(() => {
          if (cancelled) return
          setIndex((i) => (i + 1) % greetings.length)
          setVisible(true)
          cycle()
        }, GAP_MS)
      }, SHOW_MS)
    }

    cycle()
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [status, greetings])

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

  const current = greetings[index]

  return (
    <div className="mx-auto flex min-h-[10rem] max-w-md items-center justify-center px-6">
      <div
        className={`w-full rounded-[2rem] border border-white/40 bg-gradient-to-b from-sky-100/80 to-blue-900/90 px-8 py-8 text-center shadow-[0_18px_50px_rgba(47,53,66,0.18)] backdrop-blur-xl transition-opacity duration-[1500ms] ease-in-out sm:rounded-[2.25rem] sm:px-10 sm:py-10 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="font-display italic text-ink/90">"{current.greeting}"</p>
        <p className="mt-4 text-sm uppercase tracking-wide-label text-white/80">
          — {current.name || 'A guest'}
        </p>
      </div>
    </div>
  )
}
