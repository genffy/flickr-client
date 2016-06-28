import React, { Component, PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { connect } from 'react-redux'

import Style from './Photos.scss'

class Photos extends Component {
    constructor(props) {
        super(props)
        this.getPhotos = this.getPhotos.bind(this)

        // init
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
        this.getPhotos(nextProps.route.type, false)
    }
    shouldComponentUpdate(nextProps, nextState) {

        return true
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentDidUpdate(prevProps, prevState) {
        console.log('must update?')
    }
    componentWillUnmount() {

    }
    // get photos by type
    getPhotos(type, isInit) {
        console.log(type, isInit)
    }
    // refresh
    handleRefreshClick(e) {
        // TODO
        this.props.refreshCb && this.props.refreshCb(e)
    }
    render() {
        const { posts, isFetching, lastUpdated } = this.props
        const isEmpty = posts.length === 0
        return (
            <div style={Style.root}>
                <p>
                    {lastUpdated &&
                    <span>
                        Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                        {' '}
                    </span>
                    }
                    {!isFetching &&
                    <a href="#" onClick={this.handleRefreshClick}> Refresh</a>
                    }
                </p>
                {isEmpty
                    ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
                    : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <GridList cols={5} style={Style.gridList}>
                        <Subheader>精彩瞬间</Subheader>
                        {posts.map((tile) => (
                            <GridTile
                                key={tile.id}
                                title={tile.title}
                                subtitle={<span>by <b>{tile.owner}</b></span>}
                                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                            >
                                <img src={tile.imgUrl} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>
                }
            </div>
        )
    }
}

export default Photos;