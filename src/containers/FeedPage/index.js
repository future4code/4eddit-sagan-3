import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'
import { getPosts } from '../../actions'

import Appbar from "../../components/Appbar";

import { TextField, CardContent, Typography, CardActionArea, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxPostWrapper, ButtonStyled, CardPost, Comments, FeedWrapper, FormCreatePost, PostFooter, PostHeader, VotesWrapper } from './styles'

class FeedPage extends Component {

  componentDidMount() {
    this.props.getPosts()
  }


  handleSubmission = (event) => {
    event.preventDefault()
    alert("Post cadastrado com sucesso!")
  }

  handlePostClicked = (postId) => {
    // this.props.goToDetail()
    console.log(postId)
  }

  render() {
    const { allPosts } = this.props
    console.log(allPosts)
    return (
      <>
        <Appbar page={"feed"} />

        <FeedWrapper>

          <BoxPostWrapper>
            <FormCreatePost
              autoComplete="on"
              onSubmit={this.handleSubmission}>

              <TextField id="post" label="Título" variant="outlined"
                type="text"
                required
                inputProps={{
                  pattern: ".{1,}",
                  maxLength: 50,
                  title: "O campo Título não pode ficar vazio."
                }}
              />

              <TextField id="post" label="Escreva aqui" margin="normal" variant="outlined" multiline rows={5}
                type="text"
                required
                inputProps={{
                  pattern: ".{1,}",
                  maxLength: 280,
                  title: "O campo Post não pode ficar vazio."
                }}
              />

              <ButtonStyled type="submit" color="primary" variant="contained"> Postar </ButtonStyled>
            </FormCreatePost>
          </BoxPostWrapper>

          {
            allPosts.map(post => (
              <CardPost key={post.id}>

                <CardActionArea onClick={() => this.handlePostClicked(post.id)}>
                  <PostHeader title={post.username} />
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {post.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary" component="p">
                      {post.text}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <PostFooter>
                  <VotesWrapper>
                    <IconButton>
                      <ArrowUpwardRounded color="primary" />
                    </IconButton>
                    <Typography>
                      {post.votesCount}
                    </Typography>
                    <IconButton>
                      <ArrowDownwardRounded color="secondary" />
                    </IconButton>
                  </VotesWrapper>

                  <Comments onClick={this.handlePostClicked}>
                    {post.commentsNumber} comentários
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

const mapStateToProps = (state) => ({
  allPosts: state.posts.allPosts
})

const mapDispatchToProps = (dispatch) => {
  return {
    goToLogin: () => dispatch(push(routes.root)),
    goToDetail: () => dispatch(push(routes.detail)),
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);