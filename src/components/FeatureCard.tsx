'use client'

import React from 'react'
import { Typography, Card, Avatar } from '@mui/material'

interface FeatureProp {
    icon: string
    label: string
    gradientColors1: string
    gradientColors2: string
    sx?: object;
  }


const FeatureCard = ({ icon, label, gradientColors1, gradientColors2, sx }: FeatureProp) => {
  return (
    <Card
    sx={{
        height:170,
        background: `linear-gradient(to right, ${gradientColors1}, ${gradientColors2})`,
        backgroundSize: '200% 200%',
        animation: 'gradientAnimation 5s linear infinite',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        ...sx
    }}>
        <Avatar 
        sx={{
          width:48,
          height:66
        }}
        variant="square"
        src={icon}>
        </Avatar>
        <Typography sx={{
            fontSize: '24px',
            fontWeight: '600',
            background: 'linear-gradient(to bottom,#FFFFFF 20%, #999999 )',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }}>
            {label}
        </Typography>
                
    </Card>
  )
}

export default FeatureCard
