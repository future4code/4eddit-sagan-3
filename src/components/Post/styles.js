import styled from 'styled-components';
import { Card, CardHeader, CardContent, Typography, CardActions } from "@material-ui/core";

export const CardPost = styled(Card)`
  margin: 1rem;
`

export const PostHeader = styled(CardHeader)`
  text-align: center;
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
  width: 100%
`