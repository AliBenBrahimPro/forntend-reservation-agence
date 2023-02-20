import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

function Test() {
  const filterby = useSelector(state => state.productFilter.filter);
    const dispatch = useDispatch()
    console.log(filterby)
  return (
    <div>Test : {filterby}</div>
  )
}

export default Test