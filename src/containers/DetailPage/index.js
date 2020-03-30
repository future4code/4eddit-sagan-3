import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'

import Appbar from "../../components/Appbar";

import styled from 'styled-components';
import { TextField, Button, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Paper } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';


const DetailWrapper = styled.div`
display: flex;
flex-direction: column;
margin: 2rem auto;
width: 30vw;
min-height: 80vh;
justify-content: center;
@media screen and (max-device-width: 1200px){
 width: 90vw;
}
`
const BoxCommentWrapper = styled(Paper) `
margin: 1rem;
`

const FormCreateComment = styled.form`
display:flex;
flex-direction: column;
`
const ButtonStyled = styled(Button)`
margin: 1rem auto;
`
const CardPost = styled(Card)`
margin: 1rem;
`
const PostHeader = styled(CardHeader)`
text-align: center;
:hover {
  cursor: pointer;
}
`
const PostContent = styled(CardContent)`
:hover {
  cursor: pointer;
}
`


const PostFooter = styled(CardContent)`
display: flex;
justify-content:space-between;
align-items: center;
padding-top: 0;
padding-bottom:0;
`

class DetailPage extends Component {

  handleSubmission = (event) => {
    event.preventDefault()
    this.props.goToLogin()
  }

  handlePostClicked = () => {
    this.props.goToDetail()
  }

  render() {
    return (
      <div>
        <Appbar page={"detail"}/>
        <DetailWrapper>


          <CardPost>
            <PostHeader title="Fulano" />

            <PostContent>
              <Typography variant="body1" color="textSecondary" component="p">
                Texto do post.
                  </Typography>
            </PostContent>

            <PostFooter>
              <CardActions>
                <IconButton>
                  <ArrowUpwardRounded color="primary" />
                </IconButton>
                <Typography>0 </Typography>
                <IconButton>
                  <ArrowDownwardRounded color="secondary" />
                </IconButton>
              </CardActions>

              <Typography>0 comentários</Typography>
            </PostFooter>
          </CardPost>

          <BoxCommentWrapper>
            <FormCreateComment
              autoComplete="off"
              onSubmit={this.handleSubmission}>
              <TextField id="comment" label="Escreva seu comentário" variant="outlined" multiline rows={2} />

              <ButtonStyled type="submit" color="primary" variant="contained"> Comentar </ButtonStyled>
            </FormCreateComment>
          </BoxCommentWrapper>

          {
            [1, 2, 3].map(item => (
              <CardPost key={item}>
                <PostHeader subheader="Fulano" onClick={this.handlePostClicked}/>

                <PostContent onClick={this.handlePostClicked}>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Texto do comentário.
                  </Typography>
                </PostContent>
                
                {/* <PostFooter> */}
                <CardActions>
                  <IconButton>
                    <ArrowUpwardRounded color="primary"/>
                  </IconButton>
                  <Typography>0 </Typography>
                  <IconButton>
                    <ArrowDownwardRounded color="secondary"/>
                  </IconButton>
                </CardActions>
                
                {/* </PostFooter> */}

              </CardPost>
            ))
          }

        </DetailWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToLogin: () => dispatch(push(routes.root)),
    goToDetail: () => dispatch(push(routes.detail))
  }
}

export default connect(null, mapDispatchToProps)(DetailPage);