import Countdown from './Countdown.jsx'
import { LilyCluster } from './Botanical.jsx'
import { COUPLE } from '../data/config.js'

export default function Hero({ onRSVPClick }) {
  const weddingDate = new Date(COUPLE.weddingDateISO)
  // Always show the date as it is in Sri Lanka, whatever the viewer's timezone.
  const formattedDate = weddingDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Colombo',
  })

  return (
    <section className="relative flex min-h-screen w-full overflow-hidden">
      {/* Left: photo panel — hidden on mobile per requirement */}
      <div className="relative hidden w-1/2 md:block">
        <img
          src={COUPLE.photo}
          alt={`${COUPLE.name1} and ${COUPLE.name2}`}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right: invitation panel — the only section shown on mobile */}
      <div className="panel-texture relative flex w-full flex-col items-center justify-center px-8 py-20 text-center md:w-1/2">
        {/* Gold frame, like the printed card */}
        <div
          className="pointer-events-none absolute inset-4 border border-gold sm:inset-8"
          aria-hidden="true"
        />

        <LilyCluster className="pointer-events-none absolute -bottom-2 -left-3 w-40 sm:bottom-2 sm:left-0 sm:w-60" />
        <LilyCluster className="pointer-events-none absolute -right-3 -top-2 w-32 rotate-180 sm:right-0 sm:top-2 sm:w-52" />

        <div className="relative z-10 flex max-w-sm flex-col items-center gap-7">
          <p className="font-display text-xs font-semibold uppercase leading-relaxed tracking-[0.22em] text-ink/80 sm:text-sm">
            Together with
            <br />
            our loving families
          </p>

          <div>
            <h1 className="font-script text-6xl leading-tight text-leaf sm:text-7xl">
              {COUPLE.name1}
            </h1>
            <p className="font-script text-3xl leading-none text-gold">&amp;</p>
            <h1 className="font-script text-6xl leading-tight text-leaf sm:text-7xl">
              {COUPLE.name2}
            </h1>
          </div>

          <p className="font-display text-xs font-semibold uppercase leading-relaxed tracking-[0.2em] text-ink/80 sm:text-sm">
            Request the honour of your presence
            <br />
            at our marriage ceremony
          </p>

          <p className="font-display text-lg font-semibold uppercase tracking-[0.12em] text-ink sm:text-xl">
            {formattedDate}
          </p>

          <div className="flex flex-col items-center gap-5">
            <p className="font-display text-xs font-semibold uppercase tracking-wide-label text-olive">
              Save the Date
            </p>
            <Countdown targetDateISO={COUPLE.weddingDateISO} />
          </div>

          <button
            onClick={onRSVPClick}
            className="mt-1 rounded-full bg-olive px-9 py-3 text-xs font-semibold uppercase tracking-wide-label text-cream shadow-sm transition hover:brightness-110"
          >
            RSVP
          </button>
        </div>
      </div>
    </section>
  )
}
