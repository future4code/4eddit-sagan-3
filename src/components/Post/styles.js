import styled from 'styled-components';
import { Card, CardHeader, CardContent, Typography, CardActions } from "@material-ui/core";

export const CardPost = styled(Card)`
  margin: 1rem;
`

export const PostHeader = styled(CardHeader)`
  text-align: center;
  padding-bottom: 0;
`

export const PostFooter = styled(CardContent)`
  display: flex;
  justify-content:space-between;
  align-items: center;
`

export const VotesWrapper = styled(CardActions)`
  padding: 0;
`

export const Comments = styled(Typography)`
  :hover{
    cursor: pointer;
  }
`

export const Image = styled.img`
  width: 100%;
`

export const Date = styled(Typography)`
  text-align: right;
  padding-right: 1rem;
  font-style: italic;
`

export const CardContentStyled = styled(CardContent)`
  padding-top: 0;
  padding-bottom: 0;
`