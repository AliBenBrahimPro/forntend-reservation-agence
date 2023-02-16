import { Box, useTheme } from '@mui/material';
import { Button, message, Steps, theme } from 'antd';
import { useState } from 'react';
import { tokens } from '../../../theme';
import './steps.css'
const steps = [
  {
    title: 'First',
    content: <Cha,
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
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
  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: colors.greenAccent[700],
    backgroundColor: colors.greenAccent[500],
    borderRadius: colors.greenAccent[300],
    border: `1px dashed ${colors.greenAccent[100]}`,
    marginTop: 16,
  };
  return (
    <Box  m="20px">
      <Steps  current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
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