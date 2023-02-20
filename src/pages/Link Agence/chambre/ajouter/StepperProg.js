import { Box, useTheme } from '@mui/material';
import { Button, message, Steps, theme } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../../../redux/globalSlice';
import { tokens } from '../../../../theme';
import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import AffecterClient from './AffecterClient';
import AjouterChambre from './AjouterChambre';


import './steps.css'



const steps = [
  {
    title: 'Resrvation Hotel',
    content:<StepOne/>
  },
  {
    title: 'Reservation Transport',
    content: <StepTwo/>,
  },

];
const StepperProg = () => {
    const dispatch = useDispatch()
  useEffect(() => {
 
  }, [])
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Box  m="20px">
      <Steps  current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={(e) =>{ next()}}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => {prev(); }}
          >
            Previous
          </Button>
        )}
      </div>
    </Box>
  );
};
export default StepperProg;