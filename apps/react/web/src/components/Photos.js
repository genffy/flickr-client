import React, { Component, PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import { getPhotosByCondition } from '../services/actions.js'

import Style from './Photos.scss'

class Photos extends Component {
    constructor(props) {
        super(props)
        // init
        this.getPhotos = this.getPhotos.bind(this)
        this.getPhotos(this.props.route.type, true)
    }
    componentWillMount() {

    }
    componentDidMount() {
        const params = this.props.params
        console.log("componentDidMount", params)
    }
    // 重复点击的时候又会更新一次
    componentWillReceiveProps(nextProps) {
        // reinit
        if (nextProps.route.type !== this.props.route.type) {
            this.getPhotos(nextProps.route.type, false)
        }
    }
    shouldComponentUpdate(nextProps, nextState) {

        return true
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentDidUpdate(prevProps, prevState) {

    }
    componentWillUnmount() {

    }
    // get photos by type
    getPhotos(type, isInit) {
        console.log(type, isInit)
        let params = {};
        switch (type){
            case 'recent':
                params = {};
                break;
            case 'tag':
                params = {
                    tags: 'florida'
                };
                break;
            case 'user':
                params = {
                    user_id: '52601501@N02'
                };
                break;
            case 'fav':
                params = {
                    photoset_id: 72157669389143341,
                    user_id: '52601501@N02'
                };
                break;
            default:
                params = {};
        }
        const { dispatch} = this.props
        dispatch(getPhotosByCondition({
            type: type,
            data: params
        }))
    }
    // refresh
    handleRefreshClick(e) {
        // TODO
        this.props.refreshCb && this.props.refreshCb(e)
    }
    HandleOnTouchTap(e, data){
        this.props.router.push(`/photos/detail/${data.id}`);
    }
    render() {
        const { photos, isFetching, lastUpdated } = this.props
        const isEmpty = photos.length === 0
        return (
            <div style={Style.root}>
                <p>
                    {lastUpdated &&
                    <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                    }
                    {!isFetching && <a href="#" onClick={this.handleRefreshClick}> Refresh</a>}
                </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <GridList cols={4} style={Style.gridList}>
                        <Subheader>精彩瞬间</Subheader>
                        {photos.map((data) => (
                            <GridTile
                                key={data.id}
                                title={data.title}
                                subtitle={<span>by <Link to={'/author/'+data.owner}>{data.owner}</Link></span>}
                                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                            >
                                {/*<Link className="cover-link" to={'/photos/detail/'+ data.id }></Link>*/}
                                <img onClick={()=>this.HandleOnTouchTap(event, data)} src={data.imgUrl} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>
                }
            </div>
        )
    }
}
Photos.propTypes = {
    photos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {photos, isFetching, lastUpdated} = state.photos || {
        photos: [],
        isFetching: true,
        lastUpdated: 0
    }
    return {
        photos,
        isFetching,
        lastUpdated
    }
}
export default connect(mapStateToProps)(withRouter(Photos));