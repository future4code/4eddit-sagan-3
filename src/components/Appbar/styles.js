import { Toolbar, Typography } from "@material-ui/core";
import styled from 'styled-components'

export const ToolbarStyled = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
`

export const Logo = styled(Typography)`
  :hover{
    cursor: pointer;
  }
`