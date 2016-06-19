/**
 * Created by genffy on 16/6/4.
 */
import React, { Component, PropTypes} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Picker from './Picker.js'

import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit} from '../services/actions.js'
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    gridList: {
        width: '100%',
        height: '100%',
        overflowY: 'auto',
        marginBottom: 24
    }
};

class PhotoList extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }
    componentDidMount() {
        const { dispatch, selectedReddit } = this.props
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const { dispatch, selectedReddit } = nextProps
            dispatch(fetchPostsIfNeeded(selectedReddit))
        }
    }

    handleChange(nextReddit) {
        this.props.dispatch(selectReddit(nextReddit))
    }

    handleRefreshClick(e) {
        e.preventDefault()

        const { dispatch, selectedReddit } = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }
    render() {
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props
        const isEmpty = posts.length === 0
        return (
            <div style={styles.root}>
                <Picker value={selectedReddit}
                        onChange={this.handleChange} />
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
                    <GridList cols={5} style={styles.gridList}>
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


PhotoList.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const { selectedReddit, postsByReddit} = state
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    }
    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    }
}
export default connect(mapStateToProps)(PhotoList);