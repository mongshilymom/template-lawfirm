import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client'

const builder = imageUrlBuilder(client)

export const urlForImage = (source: any) => {
  return builder.image(source).auto('format').fit('max')
}

export const urlForImageWithSize = (source: any, width: number, height: number) => {
  return builder.image(source).auto('format').fit('max').width(width).height(height)
}