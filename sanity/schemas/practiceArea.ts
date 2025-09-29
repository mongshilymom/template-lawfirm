import { defineType } from 'sanity'

export default defineType({
  name: 'practiceArea',
  title: '업무 영역',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '업무 영역명',
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
      name: 'description',
      title: '설명',
      type: 'text',
      validation: (Rule) => Rule.required().max(300)
    },
    {
      name: 'icon',
      title: '아이콘',
      type: 'string',
      description: 'Lucide React 아이콘 이름 (예: Scale, Users, Home 등)',
      validation: (Rule) => Rule.required()
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
      name: 'orderRank',
      title: '정렬 순서',
      type: 'number',
      initialValue: 10,
      description: '낮을수록 앞에 표시됩니다'
    },
    {
      name: 'services',
      title: '세부 서비스',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: '서비스명',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: '서비스 설명',
              type: 'text'
            }
          ]
        }
      ]
    },
    {
      name: 'relatedCases',
      title: '관련 사례',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'case' }]
        }
      ]
    },
    {
      name: 'content',
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image'
    }
  },
  orderings: [
    {
      title: '정렬 순서',
      name: 'orderRank',
      by: [{ field: 'orderRank', direction: 'asc' }]
    }
  ]
})