import { BlockRenderer } from 'components/BlockRenderer'
import { MainMenu } from 'components/MainMenu'
import Head from 'next/head'

export function Page({ mainMenuItems, blocks, callToActionLabel, callToActionDestination, seo }) {
  console.log("PAGE PROPS:", { mainMenuItems, blocks, callToActionLabel, callToActionDestination, seo });
  return (
    <div>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDesc} />
      </Head>
      <MainMenu items={mainMenuItems} callToActionLabel={callToActionLabel} callToActionDestination={callToActionDestination} />
      <BlockRenderer blocks={blocks} />
    </div>
  )
}