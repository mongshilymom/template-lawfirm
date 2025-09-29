import { defineType } from 'sanity'

export default defineType({
  name: 'lawyer',
  title: '변호사',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '이름',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL 슬러그',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'title',
      title: '직책',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'specialties',
      title: '전문 분야',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.min(1).max(5)
    },
    {
      name: 'experience',
      title: '경력',
      type: 'string',
      description: '예: "15년"'
    },
    {
      name: 'education',
      title: '학력',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'achievements',
      title: '주요 성과',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'image',
      title: '프로필 이미지',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'description',
      title: '소개',
      type: 'text',
      validation: (Rule) => Rule.required().max(500)
    },
    {
      name: 'email',
      title: '이메일',
      type: 'email'
    },
    {
      name: 'phone',
      title: '전화번호',
      type: 'string'
    },
    {
      name: 'orderRank',
      title: '정렬 순서',
      type: 'number',
      initialValue: 10,
      description: '낮을수록 앞에 표시됩니다'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image'
    }
  }
})