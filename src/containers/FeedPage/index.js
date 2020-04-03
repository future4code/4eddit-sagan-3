import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from '../../actions'
import CreatePost from "../../components/CreatePost"
import Post from "../../components/Post"

import Appbar from "../../components/Appbar";
import Loading from '../../components/Loading/'

import { FeedWrapper } from './styles'


class FeedPage extends Component {

  componentDidMount = () => {
    this.props.getPosts()
  }

  render() {
    const { allPosts } = this.props

    const newAllPosts = [...allPosts]
    const ordenedPosts = newAllPosts.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    })

    return (
      <>
        <Appbar page={"feed"} />

        <FeedWrapper>

          <CreatePost />

          { ordenedPosts.length > 0 ?
             ordenedPosts.map(post => <Post post={post} key={post.id} />)
             :
             <Loading open={true} />
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