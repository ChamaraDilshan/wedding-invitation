import { useEffect, useRef, useState } from 'react'
import Hero from './components/Hero.jsx'
import CoupleSection from './components/CoupleSection.jsx'
import Gallery from './components/Gallery.jsx'
import Agenda from './components/Agenda.jsx'
import LocationMap from './components/LocationMap.jsx'
import RSVPForm from './components/RSVPForm.jsx'
import GreetingsLoop from './components/GreetingsLoop.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import { COUPLE } from './data/config.js'

export default function App() {
  const rsvpRef = useRef(null)
  const mainRef = useRef(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [introDone, setIntroDone] = useState(false)

  // While the intro video is showing, keep the invitation underneath loading
  // but out of reach of keyboard / screen-reader focus.
  useEffect(() => {
    if (mainRef.current) mainRef.current.inert = !introDone
  }, [introDone])

  return (
    <>
      {!introDone && (
        <IntroScreen
          onDone={() => {
            setIntroDone(true)
            window.scrollTo(0, 0)
          }}
        />
      )}

      {/* Outside <main> so it stays clickable while the intro is showing */}
      <MusicToggle />

      <main ref={mainRef} className="bg-cream">
        <Hero onRSVPClick={() => rsvpRef.current?.scrollIntoView({ behavior: 'smooth' })} />

        <section className="px-6 py-20 sm:py-28">
          <CoupleSection />
        </section>

        <section className="bg-leaf/[0.08] px-6 py-20 sm:py-28">
          <h2 className="mb-2 text-center font-script text-4xl text-leaf sm:text-5xl">
            Photo Gallery
          </h2>
          <Gallery />
        </section>

        <section className="px-6 py-20 sm:py-28">
          <Agenda />
        </section>

        <section className="bg-leaf/[0.08] px-6 py-20 sm:py-28">
          <h2 className="mb-10 text-center font-script text-4xl text-leaf sm:text-5xl">
            Location
          </h2>
          <LocationMap />
        </section>

        <section ref={rsvpRef} className="px-6 py-20 sm:py-28">
          <h2 className="mb-10 text-center font-script text-4xl text-leaf sm:text-5xl">
            RSVP
          </h2>
          <RSVPForm onSubmitted={() => setRefreshKey((k) => k + 1)} />
        </section>

        <section className="bg-leaf/[0.08] px-0 py-20 sm:py-28">
          <h2 className="mb-10 text-center font-script text-4xl text-leaf sm:text-5xl">
            Messages for us
          </h2>
          <GreetingsLoop refreshKey={refreshKey} />
        </section>

        <footer className="py-10 text-center text-xs uppercase tracking-wide-label text-ink/60">
          With love, {COUPLE.name1} &amp; {COUPLE.name2}
        </footer>
      </main>
    </>
  )
}
