import { Box, useTheme } from '@mui/material';
import { Button, message, Steps, theme } from 'antd';
import AjouterChambre from './ajouter/AjouterChambre';
import { useState } from 'react';
const steps = [
    {
      title: 'Resrvation Chambre',
      content:<AjouterChambre/>
    },
    {
      title: 'Affecter Client',
      content: <AjouterChambre/>,
    }
  ];

  const Reervationhotel = () => {
  const theme = useTheme();
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
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between"
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={(e) =>{ next(); console.log(steps[current+1].title)}}>
            Affecter client
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Aller au réservation transport
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            précédent
          </Button>
        )}
      </div>
    </Box>
  );
}
export default Reervationhotel;
