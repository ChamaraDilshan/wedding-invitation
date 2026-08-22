import Countdown from './Countdown.jsx'
import { BotanicalTopRight, BotanicalBottomLeft } from './Botanical.jsx'
import { COUPLE } from '../data/config.js'

export default function Hero({ onRSVPClick }) {
  const weddingDate = new Date(COUPLE.weddingDateISO)
  const formattedDate = weddingDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
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

      {/* Right: details panel — the only section shown on mobile */}
      <div className="panel-texture relative flex w-full flex-col items-center justify-center px-8 py-16 text-center md:w-1/2">
        <BotanicalTopRight className="pointer-events-none absolute right-4 top-4 h-56 w-40 text-cream/25 sm:right-8 sm:top-8" />
        <BotanicalBottomLeft className="pointer-events-none absolute bottom-4 left-4 h-64 w-44 text-cream/25 sm:bottom-8 sm:left-8" />

        <div className="relative z-10 flex max-w-sm flex-col items-center gap-8">
          <p className="font-display text-base italic text-cream/80 sm:text-lg">
            We joyfully invite you
            <br />
            to the wedding of
          </p>

          <div>
            <h1 className="font-script text-6xl leading-tight text-cream sm:text-7xl">
              {COUPLE.name1}
            </h1>
            <p className="font-display my-1 text-sm italic text-cream/70">and</p>
            <h1 className="font-script text-6xl leading-tight text-cream sm:text-7xl">
              {COUPLE.name2}
            </h1>
          </div>

          <p className="font-display text-lg text-cream/90 sm:text-xl">
            {formattedDate}
          </p>

          <div className="flex flex-col items-center gap-6">
            <p className="text-xs tracking-wide-label uppercase text-gold">
              Save the Date
            </p>
            <Countdown targetDateISO={COUPLE.weddingDateISO} />
          </div>

          <button
            onClick={onRSVPClick}
            className="mt-2 rounded-full border border-cream/40 px-8 py-3 text-xs tracking-wide-label uppercase text-cream transition hover:bg-cream/10"
          >
            RSVP
          </button>
        </div>
      </div>
    </section>
  )
}
