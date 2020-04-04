import React, { Component } from "react";
import { connect } from "react-redux";
import { vote, getPostsDetail, getPostId } from '../../actions'

import { turnsDate } from './constants'

import { Typography, CardActionArea, IconButton, CardHeader } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { CardPost, Comments, PostFooter, VotesWrapper, Image, Date, CardContentStyled, AvatarStyled } from './styles'


class Post extends Component {

    handlePostClicked = (postId) => {
        this.props.getPostId(postId)
    }

    onClickClearVote = (postId) => {
        const thisDirection = 0
        this.props.vote(postId, thisDirection)
    }

    onclickUp = (postId) => {
        const thisDirection = + 1
        this.props.vote(postId, thisDirection)
    }

    onclickDown = (postId) => {
        const thisDirection = - 1
        this.props.vote(postId, thisDirection)
    }

    render() {

        const { post } = this.props
        const date = turnsDate(post.createdAt)
        const newAvatar = post.username.slice(0, 1).toUpperCase()

        return (
            <>

                <CardPost>

                    <CardActionArea onClick={() => this.handlePostClicked(post.id)}>
                        <CardHeader
                            title={
                                <Typography variant="h5" component="p">
                                    {post.title}
                                </Typography>
                            }
                            subheader={
                                <>
                                <Typography>
                                    {post.username} <Date>{date}</Date>
                                </Typography>
                                </>
                            }
                            avatar={
                                <AvatarStyled aria-label="recipe">
                                    {newAvatar}
                                </AvatarStyled>
                            }
                        />
                        <CardContentStyled>
                            {/* Fazendo uma brincadeirinha no front - sabemos que só vai funcionar no nosso site ;) */}
                            {post.text.includes('.jpeg') || post.text.includes('.png') || post.text.includes('.gif') ?
                                <Image src={post.text} />
                                :
                                <Typography variant="body1" component="p">
                                    {post.text}
                                </Typography>
                            }
                        </CardContentStyled>
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
                            {post.commentsCount} {post.commentsCount === 1 ? 'comentário' : 'comentários'}
                        </Comments>
                    </PostFooter>

                </CardPost>
            </>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        vote: (id, direction) => dispatch(vote(id, direction)),
        getPostsDetail: (postId) => dispatch(getPostsDetail(postId)),
        getPostId: (postId) => dispatch(getPostId(postId)),
    }
}

export default connect(null, mapDispatchToProps)(Post);