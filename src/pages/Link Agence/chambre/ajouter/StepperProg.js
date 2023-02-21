import { Box, useTheme } from '@mui/material';
import { Button, message, Steps, theme } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
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
  useEffect(() => {
 
  }, [])
  const nextStep = useSelector((state) => state.productFilter.next);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(nextStep + 1);
  };
  const prev = () => {
    setCurrent(nextStep - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <Box  m="20px">
      <Steps  current={nextStep} items={items} />
      <div>{steps[nextStep].content}</div>
  
    </Box>
  );
};
export default StepperProg;