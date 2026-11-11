import { COUPLE, VENUE } from '../data/config.js'

// The calendar event is derived from COUPLE.weddingDateISO (the moment the
// ceremony begins), so it stays in sync if you change the date in config.js.
const ARRIVE_MINUTES_BEFORE = 30 // card: guests welcome from 4:30 PM, ceremony 5:00 PM
const END_HOURS_AFTER = 6 // card: event ends 11:00 PM

const ceremonyStart = new Date(COUPLE.weddingDateISO)
const START = new Date(ceremonyStart.getTime() - ARRIVE_MINUTES_BEFORE * 60 * 1000)
const END = new Date(ceremonyStart.getTime() + END_HOURS_AFTER * 60 * 60 * 1000)

const TITLE = `${COUPLE.name1} & ${COUPLE.name2}'s Wedding`

function description() {
  return [
    'Ceremony begins at 5:00 PM. Reception to follow.',
    `Venue: ${VENUE.address}`,
    `Invitation: ${window.location.origin}`,
  ].join('\n')
}

// 2026-12-19T11:00:00.000Z -> 20261219T110000Z
function toCalendarUtc(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

function escapeIcs(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

// ICS lines should be at most 75 characters; longer ones are folded.
function fold(line) {
  const parts = []
  let rest = line
  while (rest.length > 74) {
    parts.push(rest.slice(0, 74))
    rest = ' ' + rest.slice(74)
  }
  parts.push(rest)
  return parts.join('\r\n')
}

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITLE,
    dates: `${toCalendarUtc(START)}/${toCalendarUtc(END)}`,
    details: description(),
    location: VENUE.address,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Downloads an .ics file that Apple Calendar, Outlook and most Android
// calendars can import. It includes reminders 1 day and 3 hours before.
export function downloadIcs() {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${toCalendarUtc(START)}@wedding-invitation`,
    `DTSTAMP:${toCalendarUtc(new Date())}`,
    `DTSTART:${toCalendarUtc(START)}`,
    `DTEND:${toCalendarUtc(END)}`,
    `SUMMARY:${escapeIcs(TITLE)}`,
    `LOCATION:${escapeIcs(VENUE.address)}`,
    `DESCRIPTION:${escapeIcs(description())}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(`${TITLE} is tomorrow`)}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(`${TITLE} starts in 3 hours`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const ics = lines.map(fold).join('\r\n') + '\r\n'
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'wedding-invitation.ics'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
