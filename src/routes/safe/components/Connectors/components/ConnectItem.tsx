import React from 'react'
import styled from 'styled-components'
import { Text } from '@gnosis.pm/safe-react-components'
import { HighlightOff, Link, Backup } from '@material-ui/icons'

type Props = {
  data: any
}

const ConnectItem = ({ data }: Props): React.ReactElement => (
  <ContentWrapper>
    <Title size="lg">{data.displayName}</Title>
    <Content size="md">{data.longDescription}</Content>
    <LeftContent>
      <ButtonWrapper>
        {data.connected ? (
          <>
            <GreenButton>
              <HighlightOff style={iconStyle} />
              Disconnect
            </GreenButton>
            <GreenButton>
              <Backup style={iconStyle} />
              Update
            </GreenButton>
          </>
        ) : (
          <GreenButton>
            <Link style={iconStyle} />
            Connect
          </GreenButton>
        )}
      </ButtonWrapper>
    </LeftContent>
  </ContentWrapper>
)

export { ConnectItem }

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  word-break: break-word;
  white-space: normal;
`
const Title = styled(Text)`
  padding-left: 5px;
`
const Content = styled(Text)`
  margin: ${({ theme }) => `${theme.margin.md} 0 0 0`};
`
const LeftContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => `${theme.margin.xxl} 0 0 0`};
  width: 600px;
`
const GreenButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2ace67;
  color: #fff;
  border-radius: 20px;
  padding: 6px 12px;
  margin-right: 10px;
`
const iconStyle = {
  width: '18px',
  transform: 'translateY(1px)',
  marginRight: '5px',
}
