import { createElement } from 'react'
import { getTextAlign, getFontSizeForHeading } from 'utils/fonts'

export function Heading({ textAlign, content, level = 2 }) {
  const tag = createElement(`h${level}`, {
    dangerouslySetInnerHTML: {__html: content},
    className: `font-heading max-width-5xl mx-auto my-5 ${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`
  })
  
  return tag;
}