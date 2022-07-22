import { SyntheticEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import IconButton from '@material-ui/core/IconButton'
import { Card, Title, Text, Icon } from '@gnosis.pm/safe-react-components'

import { generateSafeRoute, SAFE_ROUTES, getShareApiConnectorUrl } from 'src/routes/routes'
import { ApiConnector } from 'src/routes/safe/components/Apps/types'
import fallbackApiConnectorLogoSvg from 'src/assets/icons/apps.svg'
import { currentChainId } from 'src/logic/config/store/selectors'
import { showNotification } from 'src/logic/notifications/store/notifications'
import { NOTIFICATIONS } from 'src/logic/notifications'
import { FETCH_STATUS } from 'src/utils/requests'
import { copyToClipboard } from 'src/utils/clipboard'
import { getShortName } from 'src/config'
import { ApiConnectorDescriptionSK, ApiConnectorLogoSK, ApiConnectorTitleSK } from './ApiConnectorSkeleton'
import { primary200, primary300 } from 'src/theme/variables'
import useSafeAddress from 'src/logic/currentSession/hooks/useSafeAddress'

type ApiConnectorCardSize = 'md' | 'lg'

type ApiConnectorCardProps = {
  apiConnector: ApiConnector
  size: ApiConnectorCardSize
  togglePin: (app: ApiConnector) => void
  isPinned?: boolean
  isCustomApiConnector?: boolean
  onRemove?: (app: ApiConnector) => void
}

const ApiConnectorCard = ({
  apiConnector,
  size,
  togglePin,
  isPinned,
  isCustomApiConnector,
  onRemove,
}: ApiConnectorCardProps): React.ReactElement => {
  const chainId = useSelector(currentChainId)
  const dispatch = useDispatch()

  const { safeAddress } = useSafeAddress()
  const appsPath = generateSafeRoute(SAFE_ROUTES.CONNECTORS, {
    shortName: getShortName(),
    safeAddress,
  })
  let url = ''
  if (apiConnector.connectInstructions) {
    url = apiConnector.connectInstructions.url
  }
  const openApiConnectorLink = `${appsPath}?appUrl=${encodeURI(url)}`

  const shareApiConnector = () => {
    const shareApiConnectorUrl = getShareApiConnectorUrl(url, chainId)
    copyToClipboard(shareApiConnectorUrl)
    dispatch(showNotification(NOTIFICATIONS.SHARE_SAFE_APP_URL_COPIED))
  }

  const isApiConnectorLoading = apiConnector.fetchStatus === FETCH_STATUS.LOADING

  if (isApiConnectorLoading) {
    return (
      <ApiConnectorContainer size={size}>
        <StyledAppCard size={size}>
          <LogoContainer size={size}>
            <ApiConnectorLogoSK size={size} />
          </LogoContainer>
          <DescriptionContainer size={size}>
            <ApiConnectorTitleSK />
            <ApiConnectorDescriptionSK />
            <ApiConnectorDescriptionSK />
          </DescriptionContainer>
        </StyledAppCard>
      </ApiConnectorContainer>
    )
  }

  return (
    <ApiConnectorContainer size={size}>
      <StyledLink to={openApiConnectorLink} aria-label={`open ${apiConnector.displayName} Safe App`}>
        <StyledAppCard size={size}>
          {/* Safe App Logo */}
          <LogoContainer size={size}>
            <ApiConnectorLogo
              size={size}
              src={apiConnector.image}
              alt={`${apiConnector.displayName || 'Safe App'} Logo`}
              onError={setApiConnectorLogoFallback}
            />
          </LogoContainer>

          {/* Safe App Description */}
          <DescriptionContainer size={size}>
            <ApiConnectorTitle size="xs">{apiConnector.displayName}</ApiConnectorTitle>
            <ApiConnectorDescription size="lg" color="inputFilled">
              {apiConnector.shortDescription}
            </ApiConnectorDescription>
          </DescriptionContainer>

          {/* Safe App Actions */}
          <ActionsContainer onClick={(e) => e.preventDefault()}>
            {/* Share Safe App button */}
            <IconBtn
              onClick={shareApiConnector}
              aria-label={`copy ${apiConnector.displayName} Safe App share link to clipboard`}
            >
              <Icon size="md" type="share" tooltip="Copy share link" />
            </IconBtn>

            {/* Pin & Unpin Safe App button */}
            {!isCustomApiConnector && (
              <IconBtn
                onClick={() => togglePin(apiConnector)}
                aria-label={`${isPinned ? 'Unpin' : 'Pin'} ${apiConnector.displayName} Safe App`}
              >
                {isPinned ? (
                  <PinnedIcon size="md" type="bookmarkFilled" color="primary" tooltip="Unpin from the Safe Apps" />
                ) : (
                  <PinnedIcon size="md" type="bookmark" tooltip="Pin from the Safe Apps" />
                )}
              </IconBtn>
            )}

            {/* Remove custom Safe App button */}
            {isCustomApiConnector && (
              <IconBtn
                onClick={() => onRemove?.(apiConnector)}
                aria-label={`Remove ${apiConnector.displayName} custom Safe App`}
              >
                <Icon size="md" type="delete" color="error" tooltip="Remove Custom Safe App" />
              </IconBtn>
            )}
          </ActionsContainer>
        </StyledAppCard>
      </StyledLink>
    </ApiConnectorContainer>
  )
}

export default ApiConnectorCard

const setApiConnectorLogoFallback = (error: SyntheticEvent<HTMLImageElement, Event>): void => {
  error.currentTarget.onerror = null
  error.currentTarget.src = fallbackApiConnectorLogoSvg
}

export const SAFE_APP_CARD_HEIGHT = 190
export const SAFE_APP_CARD_PADDING = 16

const ApiConnectorContainer = styled(motion.div).attrs({
  layout: true,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
})`
  position: relative;
  display: flex;
  height: ${SAFE_APP_CARD_HEIGHT}px;

  grid-column: span ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? '2' : '1')};
`

const StyledLink = styled(Link)`
  display: flex;
  flex: 1 0;
  height: ${SAFE_APP_CARD_HEIGHT}px;
  text-decoration: none;
`

const StyledAppCard = styled(Card)`
  flex: 1 1 100%;
  padding: ${SAFE_APP_CARD_PADDING}px;
  display: flex;
  flex-direction: ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? 'row' : 'column')};
  box-shadow: none;
  border: 2px solid transparent;

  transition: all 0.3s ease-in-out 0s;
  transition-property: border-color, background-color;

  :hover {
    background-color: ${primary200};
    border: 2px solid ${primary300};
  }
`

const LogoContainer = styled.div`
  flex: 0 0;
  flex-basis: ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? '50%' : 'auto')};

  display: flex;
  justify-content: ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? 'center' : 'start')};
  align-items: center;
`

const ApiConnectorLogo = styled.img`
  height: ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? '112px' : '50px')};
  width: ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? '112px' : '50px')};
  object-fit: contain;
`

const DescriptionContainer = styled.div`
  flex: 0 0;

  flex-basis: ${(props: { size: ApiConnectorCardSize }) => (props.size === 'lg' ? '50%' : 'auto')};

  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ApiConnectorTitle = styled(Title)`
  margin: 8px 0px;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  color: initial;
`

const ApiConnectorDescription = styled(Text)`
  margin: 0;
  line-height: 22px;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`

const ActionsContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  margin: 16px 12px;
`

const IconBtn = styled(IconButton)`
  padding: 8px;

  && svg {
    width: 16px;
    height: 16px;
  }
`
const PinnedIcon = styled(Icon)`
  padding-left: 2px;
`
