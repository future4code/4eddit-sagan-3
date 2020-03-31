import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'

import Appbar from "../../components/Appbar";

import { TextField, CardContent, Typography, CardActionArea, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxPostWrapper, ButtonStyled, CardPost, Comments, FeedWrapper, FormCreatePost, PostFooter, PostHeader, VotesWrapper } from './styles'

class FeedPage extends Component {

  handleSubmission = (event) => {
    event.preventDefault()
    this.props.goToLogin()
  }

  handlePostClicked = () => {
    this.props.goToDetail()
  }

  render() {
    return (
      <>
        <Appbar page={"feed"} />
        
        <FeedWrapper>

          <BoxPostWrapper>
            <FormCreatePost
              autoComplete="on"
              onSubmit={this.handleSubmission}>
              <TextField id="post" label="Escreva aqui" variant="outlined" multiline rows={5} />

              <ButtonStyled type="submit" color="primary" variant="contained"> Postar </ButtonStyled>
            </FormCreatePost>
          </BoxPostWrapper>

          {
            [1, 2, 3].map(item => (
              <CardPost key={item}>

                <CardActionArea onClick={this.handlePostClicked}>
                  <PostHeader title="Fulano" />
                  <CardContent>
                    <Typography variant="body1" color="textSecondary" component="p">
                      Texto do post.
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <PostFooter>
                  <VotesWrapper>
                    <IconButton>
                      <ArrowUpwardRounded color="primary" />
                    </IconButton>
                    <Typography>
                      0 
                    </Typography>
                    <IconButton>
                      <ArrowDownwardRounded color="secondary" />
                    </IconButton>
                  </VotesWrapper>

                  <Comments onClick={this.handlePostClicked}>
                    0 comentários
                  </Comments>
                </PostFooter>

              </CardPost>
            ))
          }
        </FeedWrapper>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToLogin: () => dispatch(push(routes.root)),
    goToDetail: () => dispatch(push(routes.detail))
  }
}

export default connect(null, mapDispatchToProps)(FeedPage);