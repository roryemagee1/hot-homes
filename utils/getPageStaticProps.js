import { gql } from '@apollo/client'
import client from 'client.js'
import cleanAndTransformBlocks from 'utils/cleanAndTransformBlocks'
import mapMainMenuItems from 'utils/mapMainMenuItems'

export async function getPageStaticProps(context) {
  const uri = context?.params?.slug ? `/${context.params.slug.join("/")}/` : "/";

  const { data } = await client.query({
    query: gql`
      query PageQuery($uri: String!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            id
            blocks(postTemplate: false)
          }
          ... on Property {
            id
            blocks(postTemplate: false)
          }
        }
        acfOptionsMainMenu {
          mainMenu {
            callToActionButton {
              label
              destination {
                ... on Page {
                  uri
                }
              }
            }
            menuItems {
              menuItem {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
              items {
                destination {
                  ... on Page {
                    uri
                  }
                }
                label
              }
            }
          }
        }
      } 
    `,
    variables: {
      uri,
    }
  });
  console.log("D: ", data);
  return {
    props: {
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks), 
    }
  }
}