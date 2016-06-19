/**
 * Created by genffy on 16/6/7.
 */
import React, { Component, PropTypes } from 'react'
import {fetchTagsIfNeeded} from '../services/actions.js'
import { connect } from 'react-redux'
class Picker extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        const { dispatch, value } = this.props
        dispatch(fetchTagsIfNeeded(value))
    }
    render() {
        const {tags, value, onChange} = this.props
        return (
            <span>
        <h1>{value}</h1>
        <select onChange={e => onChange(e.target.value)}
                value={value}>
          {tags.map(option =>
              <option value={option._content} key={option._content}>
                  {option._content}({option.score})
              </option>)
          }
        </select>
      </span>
        )
    }
}

Picker.propTypes = {
    tags: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
    const { tagsByDefault } = state
    return {
        tags: tagsByDefault['tags'] || []
    }
}
export default connect(mapStateToProps)(Picker)