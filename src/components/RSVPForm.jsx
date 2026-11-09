import { useState } from 'react'
import { APPS_SCRIPT_URL, RSVP_SECRET } from '../data/config.js'

const MIN_GUESTS = 1
const MAX_GUESTS = 10

const initialForm = {
  status: null, // 'yes' | 'no'
  name: '',
  guests: 1,
  greeting: '',
}

export default function RSVPForm({ onSubmitted }) {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState('idle') // idle | submitting | success | error

  const canSubmit = form.status && form.name.trim().length > 0

  function changeGuests(delta) {
    setForm((f) => {
      const current = Number(f.guests) || MIN_GUESTS
      return {
        ...f,
        guests: Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, current + delta)),
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit || state === 'submitting') return

    setState('submitting')
    try {
      // Apps Script web apps don't send CORS headers for POST, so we use
      // text/plain + no-cors to avoid a blocked preflight request. We can't
      // read the response back, but the row still gets appended.
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          status: form.status,
          name: form.name.trim(),
          guests: form.status === 'yes' ? Number(form.guests) || MIN_GUESTS : 0,
          greeting: form.greeting.trim(),
          timestamp: new Date().toISOString(),
          secret: RSVP_SECRET,
        }),
      })
      setState('success')
      setForm(initialForm)
      onSubmitted?.()
    } catch (err) {
      console.error(err)
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-2xl italic text-ink">Thank you! 🤍</p>
        <p className="mt-2 text-ink/70">
          Your response has been received. We can't wait to celebrate with you.
        </p>
        <button
          className="mt-6 text-sm underline text-ink/75"
          onClick={() => setState('idle')}
        >
          Submit another response
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-6">
      <div>
        <p className="mb-3 text-center text-xs uppercase tracking-wide-label text-ink/75">
          Will you be joining us?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, status: 'yes' }))}
            className={`flex-1 rounded-2xl border-2 px-4 py-6 text-center transition ${
              form.status === 'yes'
                ? 'border-olive bg-olive text-cream'
                : 'border-ink/20 text-ink/70 hover:border-olive/60'
            }`}
          >
            <span className="block text-2xl">🎉</span>
            <span className="mt-1 block font-display text-lg italic">
              Joyfully yes!
            </span>
          </button>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, status: 'no' }))}
            className={`flex-1 rounded-2xl border-2 px-4 py-6 text-center transition ${
              form.status === 'no'
                ? 'border-olive bg-olive text-cream'
                : 'border-ink/20 text-ink/70 hover:border-olive/60'
            }`}
          >
            <span className="block text-2xl">💌</span>
            <span className="mt-1 block font-display text-lg italic">
              Sadly, can't make it
            </span>
          </button>
        </div>
      </div>

      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide-label text-ink/75">
          Your name
        </span>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-lg border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none focus:border-olive"
          placeholder="First Name Last Name"
        />
      </label>

      {form.status === 'yes' && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor="guests"
            className="text-xs uppercase tracking-wide-label text-ink/75"
          >
            Number of guests (including you)
          </label>
          <div className="flex items-stretch overflow-hidden rounded-lg border border-ink/20 focus-within:border-olive">
            <button
              type="button"
              aria-label="Decrease number of guests"
              onClick={() => changeGuests(-1)}
              disabled={(Number(form.guests) || MIN_GUESTS) <= MIN_GUESTS}
              className="w-14 shrink-0 text-2xl text-olive transition hover:bg-olive/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              &minus;
            </button>
            <input
              id="guests"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              value={form.guests}
              onChange={(e) => {
                // whole numbers only: strip anything that isn't a digit
                const digits = e.target.value.replace(/\D/g, '').slice(0, 2)
                setForm((f) => ({
                  ...f,
                  guests: digits === '' ? '' : Math.min(MAX_GUESTS, Number(digits)),
                }))
              }}
              onBlur={() =>
                setForm((f) => ({
                  ...f,
                  guests: Math.max(MIN_GUESTS, Number(f.guests) || MIN_GUESTS),
                }))
              }
              className="w-full min-w-0 border-x border-ink/20 bg-transparent py-3 text-center text-lg text-ink outline-none"
            />
            <button
              type="button"
              aria-label="Increase number of guests"
              onClick={() => changeGuests(1)}
              disabled={(Number(form.guests) || MIN_GUESTS) >= MAX_GUESTS}
              className="w-14 shrink-0 text-2xl text-olive transition hover:bg-olive/10 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              +
            </button>
          </div>
        </div>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide-label text-ink/75">
          A greeting for the couple (optional)
        </span>
        <textarea
          value={form.greeting}
          onChange={(e) => setForm((f) => ({ ...f, greeting: e.target.value }))}
          rows={3}
          className="resize-none rounded-lg border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none focus:border-olive"
          placeholder="Wishing you a lifetime of love..."
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit || state === 'submitting'}
        className="rounded-full bg-olive px-8 py-3 text-sm uppercase tracking-wide-label text-cream transition disabled:opacity-40"
      >
        {state === 'submitting' ? 'Sending…' : 'Send RSVP'}
      </button>

      {state === 'error' && (
        <p className="text-center text-sm text-red-600">
          Something went wrong sending your response. Please try again.
        </p>
      )}
    </form>
  )
}
