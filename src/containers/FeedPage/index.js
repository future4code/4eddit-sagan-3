import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from '../../actions'
import CreatePost from "../../components/CreatePost"
import Post from "../../components/Post"

import Appbar from "../../components/Appbar";
import Loading from '../../components/Loading/'

import { FeedWrapper } from './styles'


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
        <Loading open={this.state.loading} />

        <FeedWrapper>

          <CreatePost />

          {ordenedPosts.length > 0
            ? ordenedPosts
              // .filter(post => post.username === newUser.username)
              .map(post => <Post post={post} key={post.id} />)

            : <Loading open={true} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);