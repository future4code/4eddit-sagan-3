import React, { Component } from "react";
import { connect } from "react-redux";
import { voteInDetail, voteComment } from '../../actions'

import { CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { CardPost, CommentHeader } from './styles'

class Comment extends Component {

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


    render() {
        const { comment } = this.props
        console.log(comment)

        return (
            <>
                <CardPost>
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
                            {comment.votesCount ? comment.votesCount : 0 }
                            {/* {comment.votesCount } */}
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

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        postId: state.posts.postId
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        voteComment: (postId, commentId, direction) => dispatch(voteComment(postId, commentId, direction)),
        voteInDetail: (id, direction) => dispatch(voteInDetail(id, direction)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);