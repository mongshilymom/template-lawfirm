import Image from 'next/image';
import Link from 'next/link';
import { sanityFetch } from '../../lib/sanity.fetch';
import { qLawyers } from '../../lib/sanity.queries';
import { urlForImage } from '../../lib/sanity.image';

/**
 * 변호사 프로필을 4개씩 그리드로 표시합니다.
 * Sanity CMS의 데이터를 사용하여 동적으로 렌더링합니다.
 */
export default async function LawyersSection() {
  const lawyers = await sanityFetch<any[]>(qLawyers, {}, ['lawyers'], 180);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading mb-4">전문 변호사진</h2>
        <p className="text-lg opacity-80">각 분야의 전문성을 갖춘 경험 풍부한 변호사들</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lawyers.slice(0, 4).map((lawyer) => (
          <Link
            key={lawyer._id}
            href={`/lawyers/${lawyer.slug?.current || lawyer._id}`}
            className="group block border rounded-xl p-6 bg-white dark:bg-zinc-900 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {/* 변호사 사진 */}
            <div className="aspect-[4/5] relative mb-4 overflow-hidden rounded-lg">
              <Image
                src={lawyer.image ? urlForImage(lawyer.image)?.url() || '/images/lawyers/default.jpg' : '/images/lawyers/default.jpg'}
                alt={lawyer.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>

            {/* 변호사 정보 */}
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-1">{lawyer.name}</h3>
              <p className="text-sm text-legend-gold mb-2">{lawyer.title}</p>
              <p className="text-xs opacity-70 mb-3">경력 {lawyer.experience}</p>

              {/* 전문 분야 */}
              <div className="flex flex-wrap gap-1 justify-center mb-3">
                {lawyer.specialties.slice(0, 2).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* 간단 설명 */}
              <p className="text-sm opacity-60 leading-relaxed line-clamp-2">
                {lawyer.description}
              </p>

              <div className="mt-3 text-sm text-legend-gold group-hover:underline">
                프로필 보기 →
              </div>
            </div>
          </Link>
        ))}
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
