import styled from 'styled-components';
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";

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

export const Image = styled.img`
  width: 100%
`