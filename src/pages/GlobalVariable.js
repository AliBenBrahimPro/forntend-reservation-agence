import { Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilter } from '../redux/globalSlice';
import Test from './test';

function GlobalVariable() {
    const filter = useSelector((state) => state.productFilter.filter);
    const dispatch = useDispatch()
    const navigate= useNavigate()
  return (
    <div className="wrapper">
<div >
<input
onChange={(e) =>
dispatch(setFilter(e.target.value))
}
value={filter}
placeholder="filter by name"
></input>
</div>
<button onClick={(e)=>navigate("/test")}>click me!</button>
    </div>
  );
}

export default GlobalVariable