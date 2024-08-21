// import { createElement } from 'react'
import { getTextAlign,/* getTextColor*/ } from 'utils/fonts'
import { relativeToAbsoluteUrls } from 'utils/relativeToAbsoluteUrls';

export function Paragraph({ textAlign, content, textColor }) {
  // const tag = createElement(`p`, {
  //   dangerouslySetInnerHTML: {__html: content},
  //   className: `font-heading max-width-5xl mx-auto my-5 ${getTextColor(textColor)} ${getTextAlign(textAlign)}`
  // })
  
  return (
    <p 
      className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
      style={{ color: textColor }}
      dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }} 
    />
  );
}