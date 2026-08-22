import { useState } from 'react'
import { APPS_SCRIPT_URL, RSVP_SECRET } from '../data/config.js'

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
          guests: form.status === 'yes' ? form.guests : 0,
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
          className="mt-6 text-sm underline text-ink/60"
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
        <p className="mb-3 text-center text-xs uppercase tracking-wide-label text-ink/60">
          Will you be joining us?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, status: 'yes' }))}
            className={`flex-1 rounded-2xl border-2 px-4 py-6 text-center transition ${
              form.status === 'yes'
                ? 'border-ink bg-ink text-cream'
                : 'border-ink/20 text-ink/70 hover:border-ink/50'
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
                ? 'border-ink bg-ink text-cream'
                : 'border-ink/20 text-ink/70 hover:border-ink/50'
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
        <span className="text-xs uppercase tracking-wide-label text-ink/60">
          Your name
        </span>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="rounded-lg border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink/60"
          placeholder="First Name Last Name"
        />
      </label>

      {form.status === 'yes' && (
        <label className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide-label text-ink/60">
            Number of guests (including you)
          </span>
          <input
            type="number"
            min={1}
            max={10}
            value={form.guests}
            onChange={(e) =>
              setForm((f) => ({ ...f, guests: Number(e.target.value) }))
            }
            className="rounded-lg border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink/60"
          />
        </label>
      )}

      <label className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide-label text-ink/60">
          A greeting for the couple (optional)
        </span>
        <textarea
          value={form.greeting}
          onChange={(e) => setForm((f) => ({ ...f, greeting: e.target.value }))}
          rows={3}
          className="resize-none rounded-lg border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink/60"
          placeholder="Wishing you a lifetime of love..."
        />
      </label>

      <button
        type="submit"
        disabled={!canSubmit || state === 'submitting'}
        className="rounded-full bg-ink px-8 py-3 text-sm uppercase tracking-wide-label text-cream transition disabled:opacity-40"
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
