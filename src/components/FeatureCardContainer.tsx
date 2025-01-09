import React from 'react';
import { Grid2 } from '@mui/material';
import FeatureCard from './FeatureCard';

const FeatureCardsContainer: React.FC = () => {
  const features = [
    { icon: '/icons/secureIcon.svg', label: 'Secure', gradientColors1: '#D40075', gradientColors2: '#4340FF' },
    { icon: '/icons/fastIcon.svg', label: 'Fast', gradientColors1: '#460354', gradientColors2: '#140746' },
    { icon: '/icons/earlyIcon.svg', label: 'Easy access', gradientColors1: '#460354', gradientColors2: '#140746' },
    { icon: '/icons/automateIcon.svg', label: 'Automated', gradientColors1: '#460354', gradientColors2: '#140746' },
  ];

  return (
      <Grid2 container spacing={1.5}>
        {features.map((feature, index) => (
          <Grid2 key={index}
            size ={{
            xs: 12,
            md: 6,
            lg: 3,
          }}>
            <FeatureCard {...feature} />
          </Grid2>
        ))}
      </Grid2>
  );
};

export default FeatureCardsContainer;
