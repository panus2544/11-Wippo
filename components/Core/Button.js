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

export const ButtonTranparent = styled(DefaultButton)`
  background-color: transparent;
  border:0px;
`

export default ButtonPrimary