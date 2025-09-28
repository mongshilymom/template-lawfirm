import Image from 'next/image';

export interface Lawyer {
  name: string;
  title: string;
  description: string;
  imageSrc: string;
}

export default function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <div className="p-4 border rounded-lg shadow-md dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          <Image
            src={lawyer.imageSrc}
            alt={lawyer.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-heading">{lawyer.name}</h3>
          <p className="text-legend-gold font-semibold">{lawyer.title}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed">{lawyer.description}</p>
    </div>
  );
}