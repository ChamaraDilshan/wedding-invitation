import { useRef, useState } from 'react'
import { MUSIC_SRC } from '../data/config.js'

function SpeakerOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 sm:h-7 sm:w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="m4 4 16 16" />
    </svg>
  )
}

function SpeakerOnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 sm:h-7 sm:w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.08" />
      <path d="M18.07 5.93a8.5 8.5 0 0 1 0 12.14" />
    </svg>
  )
}

export default function MusicToggle() {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [promptOpen, setPromptOpen] = useState(true)

  function pauseMusic() {
    audioRef.current?.pause()
    setPlaying(false)
  }

  function playMusic() {
    audioRef.current?.play().catch(() => {})
    setPlaying(true)
  }

  function declineMusic() {
    pauseMusic()
    setPromptOpen(false)
  }

  function enableMusic() {
    playMusic()
    setPromptOpen(false)
  }

  function toggle() {
    if (playing) pauseMusic()
    else playMusic()
  }

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" playsInline />

      {promptOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center px-5 sm:px-8">
          <div className="absolute inset-0 bg-ink/30" />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="music-prompt-title"
            className="relative w-full max-w-[18.5rem] rounded-[2rem] border border-white/50 bg-white/55 px-8 py-8 text-center shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:max-w-md sm:rounded-[2.75rem] sm:px-16 sm:py-10"
          >
            <p
              id="music-prompt-title"
              className="font-display text-lg text-ink sm:text-xl"
            >
              Enable Music?
            </p>
            <div className="mt-6 flex items-center justify-center gap-8 sm:mt-8 sm:gap-12">
              <button
                type="button"
                onClick={declineMusic}
                aria-label="Keep music off"
                className="flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
              >
                <SpeakerOffIcon />
              </button>
              <button
                type="button"
                onClick={enableMusic}
                aria-label="Enable music"
                className="flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition hover:scale-105 active:scale-95 sm:h-16 sm:w-16"
              >
                <SpeakerOnIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {!promptOpen && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          className="fixed bottom-6 right-6 z-[400] flex h-14 w-14 touch-manipulation items-center justify-center rounded-full bg-gold text-2xl text-ink shadow-xl ring-2 ring-cream transition hover:brightness-110"
        >
          <span
            className={playing ? 'inline-block animate-spin-slow' : 'inline-block'}
            aria-hidden="true"
          >
            🎵
          </span>
        </button>
      )}
    </>
  )
}
