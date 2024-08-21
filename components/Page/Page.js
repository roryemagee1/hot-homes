import { BlockRenderer } from 'components/BlockRenderer'
import { MainMenu } from 'components/MainMenu'

export function Page({ mainMenuItems, blocks, callToActionLabel, callToActionDestination }) {
  return (
    <div>
      <MainMenu items={mainMenuItems} callToActionLabel={callToActionLabel} callToActionDestination={callToActionDestination} />
      <BlockRenderer blocks={blocks} />
    </div>
  )
}