import Image from 'next/image';
import lawyers from '../../data/lawyers.json';

/**
 * Displays a selection of lawyer profiles in a grid.  The component uses
 * the first four entries from the lawyers data file.  If an image is
 * missing for a lawyer, a placeholder will be displayed instead.
 */
export default function LawyersSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-heading mb-8">구성원</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {lawyers.slice(0, 4).map((l: any, i: number) => (
          <div
            key={i}
            className="border rounded-lg p-4 bg-white dark:bg-zinc-900 hover:shadow-lg transition"
          >
            <div className="aspect-[4/5] relative mb-3 overflow-hidden rounded">
              <Image
                src={l.image || '/lawyer-placeholder.png'}
                alt={l.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="font-semibold">{l.name}</div>
            <div className="text-sm opacity-80">{l.title}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
