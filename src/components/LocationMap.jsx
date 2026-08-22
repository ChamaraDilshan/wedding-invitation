import { VENUE } from '../data/config.js'

export default function LocationMap() {
  const query = encodeURIComponent(VENUE.address || VENUE.name)
  const embedSrc = `https://maps.google.com/maps?q=${query}&output=embed`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`

  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-display text-xl italic text-ink">{VENUE.name}</p>
      <p className="mt-1 text-sm text-ink/60">{VENUE.address}</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
        <iframe
          title="Venue location"
          src={embedSrc}
          width="100%"
          height="320"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block rounded-full border border-ink/30 px-6 py-2 text-xs uppercase tracking-wide-label text-ink transition hover:bg-ink/5"
      >
        Get Directions
      </a>
    </div>
  )
}
