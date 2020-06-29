import React from 'react'
import { 
    FacebookShareButton, FacebookIcon, 
    TwitterShareButton, TwitterIcon, 
    LinkedinShareButton, LinkedinIcon, 
    WhatsappShareButton, WhatsappIcon,
    RedditShareButton, RedditIcon,    
} from 'react-share'

import { SharedWrapper } from './styles'

export default function SharedSocialMedia(props) {

    const { url } = props

    return (
        <SharedWrapper>

            <FacebookShareButton url={url}>
                <FacebookIcon round size={32} />
            </FacebookShareButton>

            <TwitterShareButton url={url}>
                <TwitterIcon round size={32} />
            </TwitterShareButton>

            <LinkedinShareButton url={url}>
                <LinkedinIcon round size={32} />
            </LinkedinShareButton>

            <RedditShareButton url={url}>
                <RedditIcon round size={32} />
            </RedditShareButton>

            <WhatsappShareButton url={url}>
                <WhatsappIcon round size={32} />
            </WhatsappShareButton>

        </SharedWrapper>
    )
}