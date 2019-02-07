import { Button as DefaultButton } from 'antd'
import styled from 'styled-components'
import colors from '../../config/colors'

const ButtonPrimary = styled(DefaultButton)`
  color: #fff;
`

export const FacebookButton = styled(DefaultButton)`
  background-color: ${colors.facebook};
  color: white;
`

export default ButtonPrimary