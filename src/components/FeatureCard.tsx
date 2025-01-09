'use client'

import React from 'react'
import { Typography, Card, Avatar } from '@mui/material'

interface FeatureProp {
    icon: string
    label: string
  }


const FeatureCard = ({ icon, label }: FeatureProp) => {
  return (
    <Card
    sx={{
        height:170,
        background: 'linear-gradient(to right,#D40075, #4340FF)',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection:'column',
        
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
            background: 'linear-gradient(to bottom,#FFFFFF, #999999 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        }}>
            {label}
        </Typography>
                
    </Card>
  )
}

export default FeatureCard
