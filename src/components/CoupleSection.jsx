import { BRIDE, GROOM } from '../data/config.js'

function Profile({ person }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <img
        src={person.photo}
        alt={person.name}
        className="h-32 w-32 rounded-full object-cover shadow-sm"
      />
      <p className="font-display text-2xl text-ink">{person.name}</p>
      <p className="text-xs uppercase tracking-wide-label text-ink/50">
        {person.role}
      </p>
      {person.note && (
        <p className="max-w-xs text-sm italic text-ink/60">{person.note}</p>
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
