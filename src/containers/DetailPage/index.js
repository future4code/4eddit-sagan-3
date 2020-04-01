import React, { Component } from "react";
import { connect } from "react-redux";
import { voteInDetail, createComment, voteComment } from '../../actions'

import Appbar from "../../components/Appbar";

import { TextField, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxCommentWrapper, ButtonStyled, CardPost, CommentHeader, DetailWrapper, FormCreateComment, PostFooter, PostHeader, VotesWrapper, TitleCreateComment, Comments } from './styles'

class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: ""
    }
  }


  handleSubmission = (event) => {
    event.preventDefault()
    this.props.createComment(this.state.commentText, this.props.postId)
    this.setState({
      commentText: ""
    })
  }

  handlePostClicked = () => {
    this.props.goToDetail()
  }

  onclickUp = () => {
    const thisDirection = + 1
    this.props.voteInDetail(this.props.postId, thisDirection)
  }

  onclickDown = () => {
    const thisDirection = - 1
    this.props.voteInDetail(this.props.postId, thisDirection)
  }

  onClickCommentUp = (commentId) => {
    const thisDirection = + 1
    this.props.voteComment(this.props.postId, commentId, thisDirection)
  }

  onClickCommentDown = (commentId) => {
    const thisDirection = - 1
    this.props.voteComment(this.props.postId, commentId, thisDirection)
  }

  handleTextFieldChange = (event) => {
    this.setState({
      commentText: event.target.value
    })
  }

  render() {
    const { postDetail} = this.props

    const newComments = [...postDetail.comments]
    const ordenedComments = newComments.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    })


    return (
      <div>
        <Appbar page={"detail"} />
        {postDetail ?
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
                  <IconButton onClick={this.onclickUp}>
                    <ArrowUpwardRounded color="primary" />
                  </IconButton>
                  <Typography>
                    {postDetail.votesCount}
                  </Typography>
                  <IconButton onClick={this.onclickDown}>
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
                  inputProps={{
                    pattern: ".{1,}",
                    maxLength: 180,
                    title: "O campo Comentário não pode ficar vazio."
                  }}
                  value={this.state.commentText}
                  onChange={this.handleTextFieldChange}
                />
                <ButtonStyled type="submit" color="primary" variant="contained"> Comentar </ButtonStyled>
              </FormCreateComment>
            </BoxCommentWrapper>

            {
              ordenedComments.map(comment => (
                <CardPost key={comment.id}>
                  <CommentHeader subheader={comment.username} />

                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {comment.text}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <IconButton onClick={() => this.onClickCommentUp(comment.id)}>
                      <ArrowUpwardRounded color="primary" />
                    </IconButton>
                    <Typography>
                      {comment.votesCount}
                    </Typography>
                    <IconButton onClick={() => this.onClickCommentDown(comment.id)}>
                      <ArrowDownwardRounded color="secondary" />
                    </IconButton>
                  </CardActions>
                </CardPost>
              ))
            }

          </DetailWrapper>
          :
          <DetailWrapper>carregando ...</DetailWrapper>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postDetail: state.posts.postDetail,
    postId: state.posts.postId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createComment: (createCommentData, postId) => dispatch(createComment(createCommentData, postId)),
    voteComment: (postId, commentId, direction) => dispatch(voteComment(postId, commentId, direction)),
    voteInDetail: (id, direction) => dispatch(voteInDetail(id, direction)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage);