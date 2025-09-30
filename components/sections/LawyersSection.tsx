import Image from 'next/image';
import Link from 'next/link';
import { lawyers as fallbackLawyers } from '../../data/lawyers';
import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from '@/lib/sanity.client';

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

type SanityLawyer = {
  _id: string;
  name: string;
  title: string;
  email?: string;
  phone?: string;
  specialties?: string[];
  education?: string[];
  career?: string[];
  imageUrl?: string;
  image?: any;
};

/**
 * 변호사 프로필을 4개씩 그리드로 표시합니다.
 * Sanity CMS 데이터를 우선 사용하고, 없으면 fallback 데이터를 사용합니다.
 */
export default function LawyersSection({ lawyers: sanityLawyers }: { lawyers?: SanityLawyer[] }) {
  // Sanity 데이터가 없으면 fallback 사용
  const displayLawyers = sanityLawyers && sanityLawyers.length > 0 ? sanityLawyers : fallbackLawyers;
  const isSanityData = sanityLawyers && sanityLawyers.length > 0;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading mb-4">전문 변호사진</h2>
        <p className="text-lg opacity-80">각 분야의 전문성을 갖춘 경험 풍부한 변호사들</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayLawyers.slice(0, 4).map((lawyer: any) => {
          const imageUrl = isSanityData
            ? lawyer.imageUrl || (lawyer.image ? urlFor(lawyer.image).width(400).height(500).url() : null)
            : lawyer.image;

          return (
            <Link
              key={isSanityData ? lawyer._id : lawyer.id}
              href={`/lawyers/${isSanityData ? lawyer._id : lawyer.id}`}
              className="group block border rounded-xl p-6 bg-white dark:bg-zinc-900 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* 변호사 사진 */}
              {imageUrl && (
                <div className="aspect-[4/5] relative mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={imageUrl}
                    alt={lawyer.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized={isSanityData}
                  />
                </div>
              )}

              {/* 변호사 정보 */}
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-1">{lawyer.name}</h3>
                <p className="text-sm text-legend-gold mb-2">{lawyer.title}</p>
                {!isSanityData && lawyer.experience && (
                  <p className="text-xs opacity-70 mb-3">경력 {lawyer.experience}</p>
                )}

                {/* 전문 분야 */}
                {lawyer.specialties && lawyer.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {lawyer.specialties.slice(0, 2).map((specialty: string, idx: number) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                )}

                {/* 간단 설명 */}
                {!isSanityData && lawyer.description && (
                  <p className="text-sm opacity-60 leading-relaxed line-clamp-2">
                    {lawyer.description}
                  </p>
                )}

                <div className="mt-3 text-sm text-legend-gold group-hover:underline">
                  프로필 보기 →
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 더 보기 링크 */}
      <div className="text-center mt-8">
        <Link
          href="/lawyers"
          className="inline-block px-6 py-3 bg-legend-gold text-white rounded-lg hover:bg-legend-gold/90 transition-colors"
        >
          전체 변호사 보기
        </Link>
      </div>
    </section>
  );
}
