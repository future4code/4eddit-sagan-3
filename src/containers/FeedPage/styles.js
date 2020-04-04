import styled from 'styled-components';
import { IconButton } from "@material-ui/core";

export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem auto;
  width: 40vw;
  min-height: 80vh;
  justify-content: center;
  
  @media screen and (max-device-width: 1200px){
  width: 90vw;
  }
`

export const ButtonTop = styled(IconButton)`
  position: fixed;
  right: 0;
  margin: 0.5rem;
  background-color: rgba(225,225,225, 0.5);
  padding: 0.5rem;
`