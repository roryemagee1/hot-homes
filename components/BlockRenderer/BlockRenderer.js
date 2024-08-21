import { Cover } from 'components/Cover'
import { Heading } from 'components/Heading'
import { Paragraph } from 'components/Paragraph'
import { CallToActionButton } from 'components/CallToActionButton'
import { Columns } from 'components/Columns'
import { Column } from 'components/Column'
import { PropertySearch } from 'components/PropertySearch'
import Image from 'next/image'

import { theme } from 'theme'

export function BlockRenderer({ blocks }) {
  return blocks.map(block => {
    switch(block.name) {
      case "core/columns": {
        return (
          <Columns 
            key={block.id} 
            isStackedOnMobile={block.attributes.isStackedOnMobile}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        )
      }
      case "core/column": {
        return (
          <Column 
            key={block.id} 
            width={block.attributes?.width}
          ><BlockRenderer blocks={block.innerBlocks} />
          </Column>
        )
      }
      case "core/image": {
        return (
          <Image 
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes?.alt || ""}
          />
        )
      }
      case "core/block":
      case "core/group": {
        return (
          <BlockRenderer 
            key={block.id} 
            blocks={block.innerBlocks} 
          />
        )
      }
      case "acf/ctabutton": {
        return (
          <CallToActionButton 
            key={block.id} 
            buttonLabel={block.attributes.data.label} 
            destination={block.attributes.data.destination || "/"} 
            align={block.attributes.data.align}
          />
        )
      }
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading 
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign} 
          />
        );
      };
      case "acf/propertysearch": {
        return <PropertySearch key={block.id}/>
      }
      case "core/paragraph": {
        return (
          <Paragraph 
            key={block.id}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            textColor={theme[block.attributes.textColor] || block.attributes.style?.color?.text}
          />
        )
      };
      case "core/cover": {
        return (
          <Cover key={block?.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        )
      };
      default: {
        console.log("UNKNOWN: ", block)
        return null;
      }
    }
  })
}