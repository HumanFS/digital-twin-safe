import { SafeAppData } from '@gnosis.pm/safe-react-gateway-sdk'
import { DataSource } from 'curedao-react-query-components/curedaoSchemas'
import { FETCH_STATUS } from 'src/utils/requests'

export type SafeApp = Omit<SafeAppData, 'id'> & {
  id: string
  disabled?: boolean
  fetchStatus: FETCH_STATUS
  custom?: boolean
}

export type ApiConnector = Omit<DataSource, 'id'> & {
  id: string
  disabled?: boolean
  fetchStatus: FETCH_STATUS
  custom?: boolean
}

export type StoredSafeApp = {
  url: string
}

export type SecurityFeedbackPractice = {
  id: string
  title: string
  subtitle?: string
  imageSrc?: string
}
