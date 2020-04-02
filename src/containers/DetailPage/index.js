import React, { Component } from "react";
import { connect } from "react-redux";
import { voteInDetail, createComment, voteComment } from '../../actions'

import Appbar from "../../components/Appbar";
import Loading from '../../components/Loading/'

import { TextField, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxCommentWrapper, ButtonStyled, CardPost, CommentHeader, DetailWrapper, FormCreateComment, PostFooter, PostHeader, VotesWrapper, TitleCreateComment, Image } from './styles'


class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      commentText: "",
      loading: false
    }
  }

  handleSubmission = async (event) => {
    event.preventDefault()
    this.setState({loading: true})
    await this.props.createComment(this.state.commentText, this.props.postId)
    this.setState({
      commentText: "",
      loading: false
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

  onClickClearVote = () => {
    const thisDirection = 0
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

  onClickClearVoteComment = (commentId) => {
    const thisDirection = 0
    this.props.voteComment(this.props.postId, commentId, thisDirection)
  }


  handleTextFieldChange = (event) => {
    this.setState({
      commentText: event.target.value
    })
  }

  render() {
    const { postDetail } = this.props
    // console.log(postDetail)

    let newComments = []
    if (postDetail !== null) { // null - pessoa logada, acessa a rota diretamente
      newComments = [...postDetail.comments]
    }
    const ordenedComments = newComments.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    })

    // console.log(ordenedComments)

    return (
      <div>
        <Appbar page={"detail"} />
        <Loading open={this.state.loading}/>

        {postDetail ?

          <DetailWrapper>

            <CardPost>
              <PostHeader title={postDetail.username} />

              <CardContent>
                <Typography variant="h6" component="p">
                  {postDetail.title}
                </Typography>
                {postDetail.text.includes('.jpeg') || postDetail.text.includes('.png') || postDetail.text.includes('.gif') ?
                  <Image src={postDetail.text} />
                  :
                  <Typography variant="body1" color="textSecondary" component="p">
                    {postDetail.text}
                  </Typography>
                }
              </CardContent>

              <PostFooter>
                <VotesWrapper>

                  {postDetail.userVoteDirection === 1 ?
                    <IconButton onClick={this.onClickClearVote}>
                      <ArrowUpwardRounded />
                    </IconButton>
                    :
                    <IconButton onClick={this.onclickUp}>
                      <ArrowUpwardRounded color="primary" />
                    </IconButton>
                  }

                  <Typography>
                    {postDetail.votesCount}
                  </Typography>

                  {postDetail.userVoteDirection === -1 ?
                    <IconButton onClick={this.onClickClearVote}>
                      <ArrowDownwardRounded />
                    </IconButton>
                    :
                    <IconButton onClick={this.onclickDown}>
                      <ArrowDownwardRounded color="secondary" />
                    </IconButton>
                  }

                </VotesWrapper>

                <Typography>
                  {postDetail.commentsNumber} {postDetail.commentsNumber === 1 ? 'comentário' : 'comentários'}
                </Typography>
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

            {ordenedComments ?

              ordenedComments.map(comment => (
                <CardPost key={comment.id}>
                  <CommentHeader subheader={comment.username} />

                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {comment.text}
                    </Typography>
                  </CardContent>

                  <CardActions>

                    {comment.userVoteDirection === 1 ?
                      <IconButton onClick={() => this.onClickClearVoteComment(comment.id)}>
                        <ArrowUpwardRounded />
                      </IconButton>
                      :
                      <IconButton onClick={() => this.onClickCommentUp(comment.id)}>
                        <ArrowUpwardRounded color="primary" />
                      </IconButton>

                    }

                    <Typography>
                      {comment.votesCount}
                    </Typography>

                    {comment.userVoteDirection === -1 ?
                      <IconButton onClick={() => this.onClickClearVoteComment(comment.id)}>
                        <ArrowDownwardRounded />
                      </IconButton>
                      :
                      <IconButton onClick={() => this.onClickCommentDown(comment.id)}>
                        <ArrowDownwardRounded color="secondary" />
                      </IconButton>
                    }

                  </CardActions>
                </CardPost>
              ))

              :

              <Loading open={true}/>

            }

          </DetailWrapper>

          :

          <DetailWrapper>
            <Typography component="p" variant="h6" color="inherit">
              <strong>ERRO:</strong> retorne ao FEED para selecionar um post!
            </Typography>
          </DetailWrapper>

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