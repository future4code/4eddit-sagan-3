import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, createPost, vote, getPostsDetail, getPostId } from '../../actions'

import Appbar from "../../components/Appbar";
import Loading from '../../components/Loading/'

import { TextField, CardContent, Typography, CardActionArea, IconButton  } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxPostWrapper, ButtonStyled, CardPost, Comments, FeedWrapper, FormCreatePost, PostFooter, PostHeader, VotesWrapper, TitleCreatePost, Image } from './styles'

class FeedPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createPostData: {},
      loading: false
    }
  }

  componentDidMount = () => {
    this.props.getPosts()
  }

  handleSubmission = async (event) => {
    event.preventDefault()
    this.setState({loading: true})
    await this.props.createPost(this.state.createPostData)
    this.setState({
      createPostData: {
        title: '',
        text: ''
      },
      loading: false
    })
  }

  handlePostClicked = (postId) => {
    this.props.getPostsDetail(postId)
    this.props.getPostId(postId)
  }

  handleTextFieldChange = (event) => {
    this.setState({
      createPostData: {
        ...this.state.createPostData,
        [event.target.name]: event.target.value
      }
    })
  }

  onclickUp = (postId) => {
    const thisDirection = + 1
    this.props.vote(postId, thisDirection)
  }

  onclickDown = (postId) => {
    const thisDirection = - 1
    this.props.vote(postId, thisDirection)
  }

  onClickClearVote = (postId) => {
    const thisDirection = 0
    this.props.vote(postId, thisDirection)
  }

  render() {
    const { allPosts } = this.props

    const newAllPosts = [...allPosts]
    const ordenedPosts = newAllPosts.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    })

    // const user = localStorage.getItem('user')
    // const newUser = JSON.parse(user)

    return (
      <>
        <Appbar page={"feed"} />
        <Loading open={this.state.loading}/>

        <FeedWrapper>

          <BoxPostWrapper>

            <FormCreatePost
              autoComplete="on"
              onSubmit={this.handleSubmission}>

              <TitleCreatePost variant="h4" component="p">
                Criar Publicação
                </TitleCreatePost>

              <TextField id="post" label="Título" variant="outlined"
                type="text"
                required
                inputProps={{
                  pattern: ".{1,}",
                  maxLength: 50,
                  title: "O campo Título não pode ficar vazio."
                }}
                name="title"
                value={this.state.createPostData.title || ""}
                onChange={this.handleTextFieldChange}
              />

              <TextField id="post" label="Escreva aqui" margin="normal" variant="outlined" multiline rows={5}
                type="text"
                required
                inputProps={{
                  pattern: ".{1,}",
                  maxLength: 280,
                  title: "O campo Post não pode ficar vazio."
                }}
                name="text"
                value={this.state.createPostData.text || ""}
                onChange={this.handleTextFieldChange}
              />

              <ButtonStyled type="submit" color="primary" variant="contained"> Postar </ButtonStyled>
            </FormCreatePost>
          </BoxPostWrapper>

          {ordenedPosts.length > 0 ?

            ordenedPosts
              // .filter(post => post.username === newUser.username)
              .map(post => (
                <CardPost key={post.id}>

                  <CardActionArea onClick={() => this.handlePostClicked(post.id)}>
                    <PostHeader title={post.username} />
                    <CardContent>
                      <Typography variant="h6" component="p">
                        {post.title}
                      </Typography>
                      {/* Fazendo uma brincadeirinha no front - sabemos que só vai funcionar no nosso site ;) */}
                      {post.text.includes('.jpeg') || post.text.includes('.png') || post.text.includes('.gif') ?
                        <Image src={post.text} />
                        :
                        <Typography variant="body1" color="textSecondary" component="p">
                          {post.text}
                        </Typography>
                      }
                    </CardContent>
                  </CardActionArea>

                  <PostFooter>
                    <VotesWrapper>

                      {post.userVoteDirection === 1 ?
                        <IconButton onClick={() => this.onClickClearVote(post.id)}>
                          <ArrowUpwardRounded />
                        </IconButton>
                        :
                        <IconButton onClick={() => this.onclickUp(post.id)}>
                          <ArrowUpwardRounded color="primary" />
                        </IconButton>
                      }

                      <Typography>
                        {post.votesCount}
                      </Typography>

                      {post.userVoteDirection === -1 ?
                        <IconButton onClick={() => this.onClickClearVote(post.id)}>
                          <ArrowDownwardRounded />
                        </IconButton>
                        :
                        <IconButton onClick={() => this.onclickDown(post.id)}>
                          <ArrowDownwardRounded color="secondary" />
                        </IconButton>
                      }

                    </VotesWrapper>

                    <Comments onClick={() => this.handlePostClicked(post.id)}>
                      {post.commentsNumber} {post.commentsNumber === 1 ? 'comentário' : 'comentários'}
                    </Comments>
                  </PostFooter>

                </CardPost>
              ))

            :

            <Loading open={true}/>

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
    getPosts: () => dispatch(getPosts()),
    createPost: (createPostData) => dispatch(createPost(createPostData)),
    vote: (id, direction) => dispatch(vote(id, direction)),
    getPostsDetail: (postId) => dispatch(getPostsDetail(postId)),
    getPostId: (postId) => dispatch(getPostId(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);