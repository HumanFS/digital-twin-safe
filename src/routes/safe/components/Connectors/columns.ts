import { List } from 'immutable'
import { TableCellProps } from '@material-ui/core/TableCell/TableCell'

export const ICON_ID = 'icon'
export const DETAILS_ID = 'details'
export const EDIT_ENTRY_BUTTON = 'edit-entry-btn'
export const REMOVE_ENTRY_BUTTON = 'remove-entry-btn'
export const SEND_ENTRY_BUTTON = 'send-entry-btn'

type ConnectorsColumn = {
  id: string
  order: boolean
  disablePadding?: boolean
  label: string
  width?: number
  custom?: boolean
  align?: TableCellProps['align']
}

export const generateColumns = (): List<ConnectorsColumn> => {
  const iconColumn = {
    id: ICON_ID,
    order: false,
    disablePadding: false,
    label: 'Icon',
    width: 400,
    custom: false,
    align: 'center',
  }

  const DetailColumn = {
    id: DETAILS_ID,
    order: false,
    disablePadding: false,
    label: 'Detail',
    custom: false,
  }

  return List([iconColumn, DetailColumn])
}
