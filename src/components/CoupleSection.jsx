import { BRIDE, GROOM } from '../data/config.js'
import { LilyCluster } from './Botanical.jsx'

// Rectangular portrait frame: thin gold border, ivory mat, and lily bouquets
// wrapping two opposite corners (same artwork as the invitation header).
function Profile({ person }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="relative mb-3 w-52 sm:w-56">
        <div className="border border-gold bg-white/80 p-2 shadow-sm">
          <div className="aspect-[4/5] w-full border border-gold/50">
            <img
              src={person.photo}
              alt={person.name}
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <LilyCluster className="pointer-events-none absolute -bottom-4 -left-6 z-10 w-24 sm:-left-8 sm:w-28" />
        <LilyCluster className="pointer-events-none absolute -right-6 -top-4 z-10 w-20 rotate-180 sm:-right-8 sm:w-24" />
      </div>

      <p className="font-display text-2xl text-ink">{person.name}</p>
      <p className="text-xs uppercase tracking-wide-label text-ink/70">
        {person.role}
      </p>
      {person.note && (
        <p className="max-w-xs text-sm italic text-ink/75">{person.note}</p>
      )}
    </div>
  )
}

export default function CoupleSection() {
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center gap-10">
      <Profile person={BRIDE} />
      <span className="text-3xl text-gold" aria-hidden="true">
        ♥
      </span>
      <Profile person={GROOM} />
    </div>
  )
}
