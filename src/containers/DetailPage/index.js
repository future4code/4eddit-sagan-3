import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from '../Router'

import Appbar from "../../components/Appbar";

import { TextField, CardContent, Typography, CardActions, IconButton } from "@material-ui/core";
import { ArrowDownwardRounded, ArrowUpwardRounded } from '@material-ui/icons';

import { BoxCommentWrapper, ButtonStyled, CardPost, CommentHeader, DetailWrapper, FormCreateComment, PostFooter, PostHeader, VotesWrapper, TitleCreateComment } from './styles'

class DetailPage extends Component {

  handleSubmission = (event) => {
    event.preventDefault()
    alert("Comentário criado com sucesso!")
  }

  handlePostClicked = () => {
    this.props.goToDetail()
  }

  render() {
    return (
      <div>
        <Appbar page={"detail"} />
        <DetailWrapper>

          <CardPost>
            <PostHeader title="Fulano" />

            <CardContent>
              <Typography variant="body1" color="textSecondary" component="p">
                Texto do post.
              </Typography>
            </CardContent>

            <PostFooter>
              <VotesWrapper>
                <IconButton>
                  <ArrowUpwardRounded color="primary" />
                </IconButton>
                <Typography>
                  0
                </Typography>
                <IconButton>
                  <ArrowDownwardRounded color="secondary" />
                </IconButton>
              </VotesWrapper>
              <Typography>
                0 comentários
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
            [1, 2, 3].map(item => (
              <CardPost key={item}>
                <CommentHeader subheader="Beltrano" />

                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Texto do comentário.
                    </Typography>
                </CardContent>

                <CardActions>
                  <IconButton>
                    <ArrowUpwardRounded color="primary" />
                  </IconButton>
                  <Typography>
                    0 
                  </Typography>
                  <IconButton>
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

const mapDispatchToProps = (dispatch) => {
  return {
    goToLogin: () => dispatch(push(routes.root)),
    goToDetail: () => dispatch(push(routes.detail))
  }
}

export default connect(null, mapDispatchToProps)(DetailPage);