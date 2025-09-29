import { defineType } from 'sanity'

export default defineType({
  name: 'review',
  title: '고객 후기',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: '의뢰인명',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: '익명처리 (예: 김○○, A회사 등)'
    },
    {
      name: 'rating',
      title: '평점',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      options: {
        list: [
          { title: '⭐ 1점', value: 1 },
          { title: '⭐⭐ 2점', value: 2 },
          { title: '⭐⭐⭐ 3점', value: 3 },
          { title: '⭐⭐⭐⭐ 4점', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5점', value: 5 }
        ]
      }
    },
    {
      name: 'content',
      title: '후기 내용',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(1000)
    },
    {
      name: 'caseType',
      title: '사건 유형',
      type: 'string',
      options: {
        list: [
          { title: '형사사건', value: 'criminal' },
          { title: '민사소송', value: 'civil' },
          { title: '가사사건', value: 'family' },
          { title: '기업법무', value: 'corporate' },
          { title: '부동산분쟁', value: 'real-estate' },
          { title: '노동법', value: 'labor' },
          { title: '세무법', value: 'tax' },
          { title: '의료분쟁', value: 'medical' },
          { title: '상속분쟁', value: 'inheritance' }
        ]
      }
    },
    {
      name: 'publishedAt',
      title: '게시일',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'featured',
      title: '추천 후기',
      type: 'boolean',
      initialValue: false,
      description: '메인 페이지에 표시될 추천 후기'
    },
    {
      name: 'approved',
      title: '승인 상태',
      type: 'boolean',
      initialValue: false,
      description: '후기 승인 여부'
    }
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'caseType',
      rating: 'rating'
    },
    prepare({ title, subtitle, rating }) {
      const stars = '⭐'.repeat(rating || 0)
      return {
        title: `${title} (${stars})`,
        subtitle: subtitle || '미분류'
      }
    }
  },
  orderings: [
    {
      title: '게시일 최신순',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: '평점 높은순',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }]
    }
  ]
})