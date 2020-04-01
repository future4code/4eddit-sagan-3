import styled from 'styled-components';
import { Button, Card, CardHeader, CardContent, CardActions, Paper, Typography } from "@material-ui/core";

export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  width: 40vw;
  min-height: 80vh;
  justify-content: center;

  @media screen and (max-device-width: 1200px){
  width: 90vw;
  }
`

export const BoxCommentWrapper = styled(Paper)`
  margin: 1rem;
  padding: 0 1rem;
`

export const FormCreateComment = styled.form`
  display:flex;
  flex-direction: column;
`

export const ButtonStyled = styled(Button)`
  margin: 1rem auto;
`

export const CardPost = styled(Card)`
  margin: 1rem;
`

export const PostHeader = styled(CardHeader)`
  text-align: center;
`

export const VotesWrapper = styled(CardActions)`
  padding: 0;
`

export const PostFooter = styled(CardContent)`
  display: flex;
  justify-content:space-between;
  align-items: center;
`

export const CommentHeader = styled(CardHeader)`
  text-align: center;
  padding-bottom: 0;
`

export const TitleCreateComment = styled(Typography)`
  text-align:center;
  margin: 1rem;
`

export const Comments = styled(Typography)`
  :hover{
    cursor: pointer;
  }
`