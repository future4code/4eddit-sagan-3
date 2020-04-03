import React, { Component } from "react";
import { connect } from "react-redux";
import { voteInDetail, getPostsDetail, getPostId } from '../../actions'

import { CardContent, Typography, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { CardPost, PostFooter, PostHeader, VotesWrapper, Image } from './styles'

class PostInDetail extends Component {

    onClickClearVote = (postId) => {
        const thisDirection = 0
        this.props.voteInDetail(postId, thisDirection)
    }


    onclickUp = (postId) => {
        const thisDirection = + 1
        this.props.voteInDetail(postId, thisDirection)
    }


    onclickDown = (postId) => {
        const thisDirection = - 1
        this.props.voteInDetail(postId, thisDirection)
    }


    render() {

        const { post } = this.props

        return (
            <>

                <CardPost>

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

                        <Typography>
                            {post.commentsCount} {post.commentsCount === 1 ? 'comentário' : 'comentários'}
                        </Typography>
                    </PostFooter>

                </CardPost>
            </>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        voteInDetail: (id, direction) => dispatch(voteInDetail(id, direction)),
        getPostsDetail: (postId) => dispatch(getPostsDetail(postId)),
        getPostId: (postId) => dispatch(getPostId(postId)),
    }
}

export default connect(null, mapDispatchToProps)(PostInDetail);