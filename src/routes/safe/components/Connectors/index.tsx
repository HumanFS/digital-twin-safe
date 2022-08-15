import { ReactElement, useEffect, useState, SyntheticEvent } from 'react'
import { Breadcrumb, BreadcrumbElement, Menu } from '@gnosis.pm/safe-react-components'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import styled from 'styled-components'
import Table from 'src/components/Table'
import Col from 'src/components/layout/Col'
import { SearchInputCard } from './components/SearchInputCard'
import { ConnectItem } from './components/ConnectItem'
import { generateColumns } from './columns'
import fallbackConnectAppLogoSvg from 'src/assets/icons/apps.svg'

type SafeAppCardSize = 'md' | 'lg'

const setConnectAppLogoFallback = (error: SyntheticEvent<HTMLImageElement, Event>): void => {
  error.currentTarget.onerror = null
  error.currentTarget.src = fallbackConnectAppLogoSvg
}

const Connectors = (): ReactElement => {
  const columns = generateColumns()
  const [token, setToken] = useState('')
  const [connectData, setConnectData] = useState([])

  useEffect(() => {
    const _token = token === '' ? 'demo' : token

    const options = {
      method: 'GET',
      headers: { Accept: 'application/json', Authorization: `Bearer ${_token}` },
    }

    fetch('https://app.quantimo.do/api/v3/connectors/list', options)
      .then((response) => response.json())
      .then((response) => setConnectData(response.connectors))
      .catch((err) => console.error(err))
  }, [token])

  return (
    <>
      <Menu>
        <Col start="sm" xs={12}>
          <Breadcrumb>
            <BreadcrumbElement iconType="search" text="Connectors" />
          </Breadcrumb>
        </Col>
      </Menu>
      <ContentWrapper>
        <SearchInputCard value={token} onValueChange={(value) => setToken(value.replace(/\s{2,}/g, ' '))} />
        <TableContainer style={{ marginTop: '20px' }}>
          {connectData.length > 0 && (
            <Table
              columns={columns}
              data={connectData}
              defaultFixed
              defaultRowsPerPage={25}
              disableLoadingOnEmptyTable
              label="Connectors"
              size={connectData?.length || 0}
            >
              {(sortedData) =>
                sortedData.map((data, index) => {
                  return (
                    <TableRow key={index} tabIndex={-1}>
                      <CellWrapper>
                        <ConnectAppLogo size="md" src={data.image} alt={` Logo`} onError={setConnectAppLogoFallback} />
                      </CellWrapper>
                      <CellWrapper>
                        <ConnectItem data={data} />
                      </CellWrapper>
                    </TableRow>
                  )
                })
              }
            </Table>
          )}
        </TableContainer>
      </ContentWrapper>
    </>
  )
}

export default Connectors

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
`
const ConnectAppLogo = styled.img`
  height: ${(props: { size: SafeAppCardSize }) => (props.size === 'lg' ? '112px' : '60px')};
  width: ${(props: { size: SafeAppCardSize }) => (props.size === 'lg' ? '112px' : '60px')};
  object-fit: contain;
`
const CellWrapper = styled(TableCell)`
  vertical-align: top;
  padding: 20px 30px;
`
