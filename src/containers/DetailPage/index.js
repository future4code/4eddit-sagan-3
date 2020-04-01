import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'
import { getPostsDetail, vote } from '../../actions'

import Appbar from "../../components/Appbar";

import { TextField, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxCommentWrapper, ButtonStyled, CardPost, CommentHeader, DetailWrapper, FormCreateComment, PostFooter, PostHeader, VotesWrapper, TitleCreateComment, Comments } from './styles'

class DetailPage extends Component {


  componentDidMount = () => {
    // this.props.getPostsDetail()
  }

  handleSubmission = (event) => {
    event.preventDefault()
    alert("Comentário criado com sucesso!")
  }

  handlePostClicked = () => {
    this.props.goToDetail()
  }

  onclickUp = (postId, postVotesCount) => {
    const thisDirection = Number(postVotesCount) + 1
    // console.log("cliquei pra cima!", postId, thisDirection)
    this.props.vote(postId, thisDirection)
  }

  onclickDown = (postId, postVotesCount) => {
    const thisDirection = Number(postVotesCount) - 1
    // console.log("cliquei pra baixo!", postId, thisDirection)
    this.props.vote(postId, thisDirection)
  }

  onClickCommentUp = () => {

  }
  
  onClickCommentDown = () => {

  }

  
  render() {
    console.log(this.props.postDetail)
    const { postDetail } = this.props

    return (
      <div>
        <Appbar page={"detail"} />
        <DetailWrapper>

          <CardPost>
            <PostHeader title={postDetail.title} />

            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                {postDetail.text}
              </Typography>
            </CardContent>

            <PostFooter>
                  <VotesWrapper>
                    <IconButton onClick={() => this.onclickUp(postDetail.id, postDetail.votesCount)}>
                      <ArrowUpwardRounded color="primary" />
                    </IconButton>
                    <Typography>
                      {postDetail.votesCount}
                    </Typography>
                    <IconButton onClick={() => this.onclickDown(postDetail.id, postDetail.votesCount)}>
                      <ArrowDownwardRounded color="secondary" />
                    </IconButton>
                  </VotesWrapper>

                  <Comments>
                    {postDetail.commentsNumber} comentários
                  </Comments>
                </PostFooter>

          </CardPost>


          <BoxCommentWrapper>
            <FormCreateComment
              autoComplete="off"
              onSubmit={this.handleSubmission}>

                <TitleCreateComment variant="h6" component="p">
                  Criar Comentário
                </TitleCreateComment>

              <TextField id="comment" label="Escreva seu comentário" variant="outlined" multiline rows={2}
              type="text"
              required
              inputProps = {{
                pattern: ".{1,}",
                maxLength: 180,
                title:"O campo Comentário não pode ficar vazio."
              }}
              />
              <ButtonStyled type="submit" color="primary" variant="contained"> Comentar </ButtonStyled>
            </FormCreateComment>
          </BoxCommentWrapper>

          {
            postDetail.comments.map(comment => (
              <CardPost key={comment.id}>
                <CommentHeader subheader={comment.username} />

                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {comment.text}
                    </Typography>
                </CardContent>

                <CardActions>
                  <IconButton onClick={() => this.onClickCommentUp()}>
                    <ArrowUpwardRounded color="primary" />
                  </IconButton>
                  <Typography>
                    {comment.votesCount}
                  </Typography>
                  <IconButton onClick={() => this.onClickCommentDown()}>
                    <ArrowDownwardRounded color="secondary" />
                  </IconButton>
                </CardActions>
              </CardPost>
            ))
          }

        </DetailWrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    postDetail: state.posts.postDetail,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToLogin: () => dispatch(push(routes.root)),
    goToDetail: () => dispatch(push(routes.detail)),
    getPostsDetail: () => dispatch(getPostsDetail()),
    vote: (id, direction) => dispatch(vote(id, direction))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);