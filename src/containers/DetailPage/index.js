import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../../components/Comment";
import Loading from '../../components/Loading/'

import Appbar from "../../components/Appbar";

import { Typography } from "@material-ui/core";

import { DetailWrapper } from './styles'
// import Post from "../../components/Post";
import CreateComment from "../../components/CreateComment";
import PostInDetail from "../../components/PostInDetail";




class DetailPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  render() {
    const { postDetail } = this.props

    let newComments = []
    if (postDetail !== null) { // null - pessoa logada, acessa a rota diretamente
      newComments = [...postDetail.comments]
    }
    const ordenedComments = newComments.sort((a, b) => {
      return a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0
    })

    return (
      <div>
        <Appbar page={"detail"} />

        {postDetail ?

          <DetailWrapper>

            <PostInDetail post={postDetail} />

            <CreateComment />

            {ordenedComments
              ? ordenedComments.map(comment => <Comment comment={comment} key={comment.id} />)
              : <Loading open={true} />
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
  }
}

export default connect(mapStateToProps)(DetailPage);