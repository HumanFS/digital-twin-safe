// @flow
import { Record } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'

export const INCOMING_TX_TYPES = {
  INCOMING: 'INCOMING',
  ERC721_TRANSFER: 'ERC721_TRANSFER',
  ERC20_TRANSFER: 'ERC20_TRANSFER',
  ETHER_TRANSFER: 'ETHER_TRANSFER',
}

export type IncomingTransactionProps = {
  blockNumber: number,
  executionTxHash: string,
  safeTxHash: string,
  to: string,
  value: number,
  tokenAddress: string,
  from: string,
  symbol: string,
  decimals: number,
  fee: string,
  executionDate: string,
  type: string,
  status: string,
  nonce: null,
  confirmations: null,
  recipient: null,
  data: null,
  operation: null,
  safeTxGas: null,
  baseGas: null,
  gasPrice: null,
  gasToken: null,
  refundReceiver: null,
  isExecuted: null,
  submissionDate: null,
  executor: null,
  cancelled: null,
  modifySettingsTx: null,
  cancellationTx: null,
  customTx: null,
  creationTx: null,
  isTokenTransfer: null,
  decodedParams: null,
  refundParams: null,
}

export const makeIncomingTransaction: RecordFactory<IncomingTransactionProps> = Record({
  blockNumber: 0,
  executionTxHash: '',
  safeTxHash: '',
  to: '',
  value: 0,
  tokenAddress: '',
  from: '',
  symbol: '',
  decimals: 18,
  fee: '',
  executionDate: '',
  type: 'INCOMING',
  status: 'success',
  nonce: null,
  confirmations: null,
  recipient: null,
  data: null,
  operation: null,
  safeTxGas: null,
  baseGas: null,
  gasPrice: null,
  gasToken: null,
  refundReceiver: null,
  isExecuted: null,
  submissionDate: null,
  executor: null,
  cancelled: null,
  modifySettingsTx: null,
  cancellationTx: null,
  customTx: null,
  creationTx: null,
  isTokenTransfer: null,
  decodedParams: null,
  refundParams: null,
})

export type IncomingTransaction = RecordOf<IncomingTransactionProps>