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
            seo {
              title
              metaDesc
            }
          }
          ... on Property {
            id
            blocks(postTemplate: false)
            seo {
              title
              metaDesc
            }
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
  console.log("Data: ", data);
  return {
    props: {
      seo: data.nodeByUri?.seo,
      mainMenuItems: mapMainMenuItems(data.acfOptionsMainMenu.mainMenu.menuItems),
      callToActionLabel: data.acfOptionsMainMenu.mainMenu.callToActionButton.label,
      callToActionDestination: data.acfOptionsMainMenu.mainMenu.callToActionButton.destination.uri,
      blocks: cleanAndTransformBlocks(data.nodeByUri.blocks), 
    }
  }
}