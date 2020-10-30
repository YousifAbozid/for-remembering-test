import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        props.setFilter(event.target.value)
    }
    const style = {
        marginBottom: 10,
        marginTop: 10
    }

    return (
        <div style={style}>
        filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    setFilter
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)