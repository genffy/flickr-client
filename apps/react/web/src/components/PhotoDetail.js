/**
 * Created by genffy on 16/6/5.
 */
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'
import Avatar from 'material-ui/Avatar'

import {getPhotoDetail, getPhotoComments} from '../services/actions.js'

class PhotoDetail extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const params = this.props.params
        console.log("get route urls", params)
        this.getPhotoComments()
        this.getPhotoDetail()
    }
    getPhotoDetail() {
        const { dispatch} = this.props
        dispatch(getPhotoDetail({
            photo_id: this.props.params.id
        }))
    }
    getPhotoComments() {
        const { dispatch} = this.props
        dispatch(getPhotoComments({
            photo_id: this.props.params.id
        }))
    }
    getAvUlr(farm, server, nsid) {
        return `http://farm${farm}.staticflickr.com/${server}/buddyicons/${nsid}.jpg`;
    }
    render() {
        let {detail, detailIsFetching, comments, commentsIsFetching} = this.props
        console.log(detail, comments)
        let imgUrl = `https://farm${detail.farm}.staticflickr.com/${detail.server}/${detail.id}_${detail.secret}.jpg`
        return(
            <Card>
                {!detailIsFetching && <div>
                    <CardMedia
                        overlay={<CardTitle title={detail.title._content}/>}
                    >
                        <img src={imgUrl} />
                    </CardMedia>
                    <CardHeader
                        title={detail.owner.realname}
                        subtitle={'位置:'+ detail.owner.location}
                        avatar={this.getAvUlr(detail.owner.iconfarm, detail.owner.iconserver, detail.owner.nsid)}
                    />
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>{detail.description._content}</CardText>
                </div>}
                <List>
                    {!commentsIsFetching && comments.map((item)=>(
                        <ListItem
                            key={item.id}
                            disabled={true}
                            leftAvatar={<Avatar src={this.getAvUlr(item.iconfarm, item.iconserver, item.author)} />}
                        >
                            <span>{item.authorname}</span>
                            <p>{item._content}</p>
                        </ListItem>
                    ))}
                </List>

            </Card>
        )
    }
}

PhotoDetail.PropTypes = {
    detail: PropTypes.object.isRequired,
    detailIsFetching: PropTypes.boolean,
    comments: PropTypes.array,
    commentsIsFetching: PropTypes.boolean
}

export default connect((state)=> {
    const {PhotoComments, PhotoDetail} = state
    return {
        detail: PhotoDetail.detail || {},
        detailIsFetching: PhotoDetail.isFetching,
        comments: PhotoComments.comments || [],
        commentsIsFetching: PhotoComments.isFetching
    }
})(PhotoDetail);