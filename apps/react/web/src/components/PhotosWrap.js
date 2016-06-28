import React, { Component, PropTypes} from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'
import { selectReddit, fetchPostsIfNeeded, invalidateReddit} from '../services/actions.js'

class PhotosWrap extends Component{
    constructor(props) {
        super(props)
        this.handleRefresh = this.handleRefresh.bind(this)
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

    handleRefresh(e) {
        console.log('天辣噜,我要刷新了')
        e.preventDefault()

        const { dispatch, selectedReddit } = this.props
        dispatch(invalidateReddit(selectedReddit))
        dispatch(fetchPostsIfNeeded(selectedReddit))
    }
    render(){
        const { selectedReddit, posts, isFetching, lastUpdated } = this.props
        return (
            <div>
                <h2>一个图片的外包页面</h2>
                <Link to='/photos'>最新照片</Link><br/>
                <Link to='/photos/tag'>根据tag选择</Link><br/>
                <Link to='/photos/detail'>照片详细</Link><br/>
                <div class="wrap">
                    {this.props.children && React.cloneElement(this.props.children, {
                        photos: photos,
                        refreshCb: this.handleRefresh,
                        isFetching: isFetching,
                        lastUpdated: lastUpdated
                    })}
                </div>
            </div>
        )
    }
}

PhotosWrap.propTypes = {
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
export default connect(mapStateToProps)(PhotosWrap);
