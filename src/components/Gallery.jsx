import { GALLERY } from '../data/config.js'
import { BotanicalTopRight } from './Botanical.jsx'

export default function Gallery() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10 flex justify-center">
        <BotanicalTopRight className="h-20 w-32 rotate-90 text-ink/40" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {GALLERY.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`Wedding photo ${i + 1}`}
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-sm"
          />
        ))}
      </div>
    </div>
  )
}
