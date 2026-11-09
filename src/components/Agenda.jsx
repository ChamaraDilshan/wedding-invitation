import { AGENDA, LOVE_QUOTE, FOOTNOTE } from '../data/config.js'

function IconCircle({ children }) {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink/30 text-ink/70">
      {children}
    </div>
  )
}

function EventCard({ event }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location,
  )}`

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center">
      <p className="font-display text-2xl italic text-ink">{event.title}</p>

      <IconCircle>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      </IconCircle>
      <p className="text-ink/80">{event.date}</p>

      <IconCircle>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      </IconCircle>
      <p className="text-ink/80">{event.timeRange}</p>
      {event.note && (
        <p className="-mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-olive">
          {event.note}
        </p>
      )}

      <IconCircle>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      </IconCircle>
      <p className="text-ink/80">{event.location}</p>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-1 rounded-md bg-olive px-6 py-3 text-xs uppercase tracking-wide-label text-cream transition hover:opacity-90"
      >
        Navigate
      </a>
    </div>
  )
}

export default function Agenda() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-16">
      {AGENDA.map((event) => (
        <EventCard key={event.title} event={event} />
      ))}

      {FOOTNOTE && (
        <p className="-mt-6 text-center font-script text-3xl text-leaf">{FOOTNOTE}</p>
      )}

      {LOVE_QUOTE && (
        <p className="mx-auto max-w-md whitespace-pre-line text-center font-display text-lg italic text-ink/80">
          {LOVE_QUOTE}
        </p>
      )}
    </div>
  )
}
