import { useEffect, useState } from 'react'

function getTimeLeft(targetDate) {
  const total = Math.max(0, targetDate.getTime() - Date.now())
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { total, days, hours, minutes, seconds }
}

export default function Countdown({ targetDateISO }) {
  const targetDate = new Date(targetDateISO)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDateISO])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  if (timeLeft.total <= 0) {
    return (
      <p className="font-display text-2xl italic text-leaf">
        Today is the day! ✨
      </p>
    )
  }

  return (
    <div className="flex gap-5 sm:gap-8">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div className="font-display text-4xl font-medium italic tabular-nums text-leaf sm:text-5xl">
            {String(u.value).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide-label text-ink/70">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  )
}
