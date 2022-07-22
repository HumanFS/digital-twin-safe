import { ReactElement, useMemo } from 'react'
import styled from 'styled-components'
import { Button } from '@gnosis.pm/safe-react-components'
import { generatePath, Link } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton/Skeleton'
import { Grid } from '@material-ui/core'

import { screenSm, screenMd } from 'src/theme/variables'
import { useAppList } from 'src/routes/safe/components/Apps/hooks/appList/useAppList'
import { GENERIC_CONNECTORS_ROUTE } from 'src/routes/routes'
import SafeAppCard, {
  SAFE_APP_CARD_HEIGHT,
  SAFE_APP_CARD_PADDING,
} from 'src/routes/safe/components/Apps/components/SafeAppCard/SafeAppCard'
import ExploreIcon from 'src/assets/icons/explore.svg'
import { WidgetTitle, WidgetBody, WidgetContainer, Card } from 'src/components/Dashboard/styled'
// const options = {
//   method: 'GET',
//   headers: { Accept: 'application/json', Authorization: 'Bearer demo' },
// }
// connectors = fetch('https://app.quantimo.do/api/v3/connectors/list', options)
//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err))

export const CARD_PADDING = 24

const SkeletonWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
`

const StyledExploreBlock = styled.div`
  background: url(${ExploreIcon}) center top no-repeat;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  text-decoration: none;

  > button {
    width: 200px;
  }
`

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, 1fr);
  gap: 24px;

  @media (max-width: ${screenMd}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${screenSm}px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`

const StyledAppCard = styled(Card)`
  padding: ${SAFE_APP_CARD_PADDING}px;
`

const ApiConnectors = ({ size = 6 }: { size?: number }): ReactElement => {
  const { pinnedSafeApps, isLoading, togglePin } = useAppList()
  const displayedApps = useGetConnectors({})
  const allConnectorsUrl = generatePath(GENERIC_CONNECTORS_ROUTE)

  const LoadingState = useMemo(
    () => (
      <Grid container spacing={2}>
        {Array.from(Array(size).keys()).map((key) => (
          <Grid item xs={12} md={4} key={key}>
            <SkeletonWrapper>
              <Skeleton variant="rect" height={SAFE_APP_CARD_HEIGHT + 2 * SAFE_APP_CARD_PADDING} />
            </SkeletonWrapper>
          </Grid>
        ))}
      </Grid>
    ),
    [size],
  )

  if (isLoading) return LoadingState

  return (
    <WidgetContainer id="api-connectors">
      <WidgetTitle>API Connectors</WidgetTitle>

      <WidgetBody>
        <StyledGrid>
          {displayedApps.map((safeApp) => (
            <SafeAppCard
              key={safeApp.id}
              safeApp={safeApp}
              togglePin={togglePin}
              size="md"
              isPinned={pinnedSafeApps.some((pinnedSafeApp) => pinnedSafeApp.id === safeApp.id)}
            />
          ))}

          <StyledLink to={allConnectorsUrl}>
            <StyledAppCard>
              <StyledExploreBlock>
                <Button size="md" color="primary" variant="contained">
                  Explore Connectors
                </Button>
              </StyledExploreBlock>
            </StyledAppCard>
          </StyledLink>
        </StyledGrid>
      </WidgetBody>
    </WidgetContainer>
  )
}

export default ApiConnectors
