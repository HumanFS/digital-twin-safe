import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { Text } from '@gnosis.pm/safe-react-components'
import Input from '@material-ui/core/Input'
import ClearIcon from '@material-ui/icons/Clear'
import styled from 'styled-components'
import { Card } from '@gnosis.pm/safe-react-components'

type Props = {
  value: string
  onValueChange: (value: string) => void
}

const SearchInputCard = ({ value, onValueChange }: Props): React.ReactElement => (
  <Container>
    <Title size="md">AUTHENTICATION</Title>
    <InputWrapper>
      <Label size="md">Bearer:</Label>
      <Input
        inputProps={{
          'aria-label': 'search',
        }}
        endAdornment={
          value && (
            <IconButton aria-label="Clear the search" onClick={() => onValueChange('')}>
              <ClearIcon />
            </IconButton>
          )
        }
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(event.target.value)}
        placeholder="token"
        value={value}
        style={{ width: '100%' }}
      />
    </InputWrapper>
  </Container>
)

export { SearchInputCard }

const Container = styled(Card)`
  width: 100%;
  box-sizing: border-box;
`
const Title = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 12px;
`
const Label = styled(Text)`
  margin-right: 20px;
`
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`
