import React, { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';
import FeatureCard from './FeatureCard';

const initialFeatures = [
  { icon: '/icons/secureIcon.svg', label: 'Secure' },
  { icon: '/icons/fastIcon.svg', label: 'Fast' },
  { icon: '/icons/earlyIcon.svg', label: 'Easy access' },
  { icon: '/icons/automateIcon.svg', label: 'Automated' },
];

const initialGradients = [
  { gradientColors1: '#D40075', gradientColors2: '#4340FF' },
  { gradientColors1: '#460354', gradientColors2: '#140746' },
  { gradientColors1: '#460354', gradientColors2: '#140746' },
  { gradientColors1: '#460354', gradientColors2: '#140746' },
];


const FeatureCardsContainer: React.FC = () => {

  const [gradients, setGradients] = useState(initialGradients);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradients((prevGradients) => {
        const last = prevGradients[prevGradients.length - 1];
        const rest = prevGradients.slice(0, prevGradients.length - 1);
        return last ? [last, ...rest] : prevGradients;
      });
    }, 3000); 
  
    return () => clearInterval(interval);
  }, []);

  return (
      <Grid2 container spacing={1.5}>
        {initialFeatures.map((feature, index) => (
          <Grid2 key={index}
            size ={{
            xs: 12,
            md: 6,
            lg: 3,
          }}>
            <FeatureCard key={index}
              icon={feature.icon}
              label={feature.label}
              gradientColors1={gradients[index].gradientColors1}
              gradientColors2={gradients[index].gradientColors2} 
              sx={
                gradients[index].gradientColors1 === '#D40075' && gradients[index].gradientColors2 === '#4340FF'
                  ? { transform: 'scale(1.03)' }
                  : {}
                }
              />
          </Grid2>
        ))}
      </Grid2>
  );
};

export default FeatureCardsContainer;
