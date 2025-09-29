import { defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: '뉴스 & 공지',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '제목',
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
      name: 'author',
      title: '작성자',
      type: 'string',
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
      name: 'body',
      title: '본문',
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
      ],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '공지사항', value: 'notice' },
          { title: '법률뉴스', value: 'legal-news' },
          { title: '로펌소식', value: 'firm-news' },
          { title: '법률칼럼', value: 'column' },
          { title: '세미나', value: 'seminar' },
          { title: '언론보도', value: 'media' }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'tags',
      title: '태그',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'featured',
      title: '주요 뉴스',
      type: 'boolean',
      initialValue: false,
      description: '메인 페이지에 표시될 주요 뉴스'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
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