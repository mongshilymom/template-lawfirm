import { defineType } from 'sanity'

export default defineType({
  name: 'case',
  title: '사건 사례',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '사건명',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL 슬러그',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: '요약',
      type: 'text',
      validation: (Rule) => Rule.required().max(200)
    },
    {
      name: 'publishedAt',
      title: '게시일',
      type: 'datetime',
      validation: (Rule) => Rule.required()
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
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'outcome',
      title: '결과',
      type: 'string',
      options: {
        list: [
          { title: '승소', value: 'won' },
          { title: '일부승소', value: 'partial-win' },
          { title: '합의', value: 'settlement' },
          { title: '무혐의', value: 'no-charge' },
          { title: '기소유예', value: 'suspended-prosecution' },
          { title: '집행유예', value: 'suspended-sentence' }
        ]
      }
    },
    {
      name: 'client',
      title: '의뢰인',
      type: 'string',
      description: '익명처리된 의뢰인 정보 (예: A회사, 김○○ 등)'
    },
    {
      name: 'image',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'body',
      title: '상세 내용',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'tags',
      title: '태그',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'practiceArea',
      title: '관련 업무 영역',
      type: 'reference',
      to: [{ type: 'practiceArea' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caseType',
      media: 'image'
    }
  },
  orderings: [
    {
      title: '게시일 최신순',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    }
  ]
})