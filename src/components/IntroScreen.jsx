import { useEffect, useRef, useState } from 'react'
import { LilyCluster, LilyDivider } from './Botanical.jsx'
import { COUPLE } from '../data/config.js'

// ---- Intro settings -------------------------------------------------------
// Put your video in /public and point INTRO_VIDEO at it. Keep it short, muted,
// and small (see README / notes: ~720p, a few MB) so it starts fast on mobile.
const INTRO_VIDEO = '/intro.mp4'
// Optional still image shown until the video's first frame is ready ('' = none)
const INTRO_POSTER = ''
const BUTTON_LABEL = 'Open Invitation'
const FADE_MS = 700 // keep in sync with duration-700 below
// ---------------------------------------------------------------------------

function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </svg>
  )
}

export default function IntroScreen({ onDone }) {
  const videoRef = useRef(null)
  const [leaving, setLeaving] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)

  // Stop the page behind from scrolling while the intro is up.
  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  // React doesn't always apply the `muted` attribute, and browsers only allow
  // autoplay for muted video, so set it on the element and start playback.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  function handleOpen() {
    if (leaving) return
    setLeaving(true)
    setTimeout(onDone, FADE_MS)
  }

  return (
    <div
      role="dialog"
      aria-label="Wedding invitation welcome screen"
      className={`panel-texture fixed inset-0 z-[300] overflow-hidden transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {!videoFailed ? (
        <>
          <video
            ref={videoRef}
            src={INTRO_VIDEO}
            poster={INTRO_POSTER || undefined}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoFailed(true)}
          />
          {/* soft shade so the button stays readable on any video */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 to-transparent"
            aria-hidden="true"
          />
        </>
      ) : (
        // Fallback if the video file is missing or can't play: themed ivory page
        <>
          <LilyCluster className="pointer-events-none absolute -bottom-2 -left-3 w-44 sm:w-64" />
          <LilyCluster className="pointer-events-none absolute -right-3 -top-2 w-36 rotate-180 sm:w-56" />
          <div className="absolute inset-x-0 top-1/3 flex -translate-y-1/4 flex-col items-center px-8 text-center">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-ink/80 sm:text-sm">
              Together with our loving families
            </p>
            <p className="mt-4 font-script text-6xl leading-tight text-leaf sm:text-7xl">
              {COUPLE.name1}
            </p>
            <p className="font-script text-3xl leading-none text-gold">&amp;</p>
            <p className="font-script text-6xl leading-tight text-leaf sm:text-7xl">
              {COUPLE.name2}
            </p>
          </div>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <LilyDivider className="w-40 sm:w-52" />

        <div className="relative">
          {/* gentle pulse ring to draw the eye to the button */}
          <span
            className="absolute inset-0 animate-ping rounded-full border border-gold/70 motion-reduce:hidden"
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={handleOpen}
            className="relative flex touch-manipulation items-center gap-3 rounded-full border-2 border-gold bg-olive px-9 py-4 font-display text-sm font-semibold uppercase tracking-wide-label text-cream shadow-xl transition hover:brightness-110 active:scale-95"
          >
            <EnvelopeIcon />
            {BUTTON_LABEL}
          </button>
        </div>
      </div>
    </div>
  )
}
