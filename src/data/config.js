// Edit these values for your wedding.

export const COUPLE = {
  name1: 'Sandali',
  name2: 'Chamara',
  // ISO date string, in the timezone the wedding takes place
  weddingDateISO: '2026-12-19T17:00:00+05:30', // ceremony begins 5:00 PM (Sri Lanka time)
  venue: 'The Grand Walawwa',
  photo: '/couple.jpeg', // put your photo in the /public folder with this name
}

// The day's schedule. Add/remove/edit events freely — each renders as its
// own card with date, time, location, and a "Navigate" button.
export const AGENDA = [
  {
    title: 'Ceremony',
    date: 'Saturday, December 19, 2026',
    timeRange: 'From 4:30 PM to 11:00 PM',
    note: 'Ceremony begins at 5:00 PM',
    location: 'The Grand Walawwa, No 190/8, Kandy Road, Kegalle',
  },
]

// Script line shown under the agenda (from the printed card).
export const FOOTNOTE = 'Reception to follow'

// A short verse or quote shown under the agenda.
export const LOVE_QUOTE = `Love is patient, love is kind,
It leads us here, our hearts aligned.
With family near and friends so dear,
We start our journey, full of cheer.`

// Bride & groom profile cards.
export const BRIDE = {
  name: 'Sandali',
  role: 'The Bride',
  photo: '/bride.jpeg',
  note: 'Daughter of Mrs. Susantha and Mr. Nihal',
}

export const GROOM = {
  name: 'Chamara',
  role: 'The Groom',
  photo: '/groom.jpeg',
  note: 'Son of Mrs. Manori and Mr. Hasitha',
}

// Photo gallery — add paths to images placed in /public.
export const GALLERY = [
  '/gallery-1.jpeg',
  '/gallery-2.jpeg',
  '/gallery-13.jpeg',
  '/gallery-4.jpeg',
]

// Venue location for the map. Easiest option: paste the venue name or full
// address here — no API key needed for the embedded map.
export const VENUE = {
  name: 'The Grand Walawwa',
  address: 'The Grand Walawwa, No 190/8, Kandy Road, Kegalle',
}

// Background music. Put an MP3 you have the rights to use in /public
// (royalty-free tracks work well — e.g. from Pixabay Music or YouTube Audio
// Library) and point this at it.
export const MUSIC_SRC = '/music.mp3'

// Paste the Web App URL you get after deploying the Google Apps Script
// (see apps-script/Code.gs and the README for setup steps).
export const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxkQ1UfiCnF24_YRuTxf2ynw3QAC6yXqD57hVwAwyR2mtxJI-qywzCEZaXe-n3oQMPZ/exec'

// Optional: must match SHARED_SECRET in apps-script/Code.gs. Leave blank to skip.
export const RSVP_SECRET = ''
