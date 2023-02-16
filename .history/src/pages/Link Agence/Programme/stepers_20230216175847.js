import { Box, useTheme } from '@mui/material';
import { Button, message, Steps, theme } from 'antd';
import { useState } from 'react';
import { tokens } from '../../../theme';
import Chambre from '../chambre/Chambre';
import ReservationEvnt from '../Evenement/ReservationEvnt';
import FormProgAgence from './FormProgAgence';
import './steps.css'
const steps = [
  {
    title: 'Resrvation Hotel',
    content:<Chambre/>
  },
  {
    title: 'Reservation Transport',
    content: <FormProgAgence/>,
  },
  {
    title: 'Reservation Evenement',
    content: <ReservationEvnt/>,
    
  },
];
const Stepers = () => {
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
          <Button type="primary" onClick={(e) =>{ next(); console.log(e.target.value)}}>
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
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </Box>
  );
};
export default Stepers;