'use client'

import React from 'react'
import { Avatar, Typography, Card, CardContent, Stack } from '@mui/material'
import CustomLoginButton from './CustomLoginButton'

interface LoginCardProps {
  onClickGoogle: () => void
}

const LoginCard: React.FC<LoginCardProps> = ({ onClickGoogle }) => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 572,
        bgcolor: 'grey.600',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
      }}
    >
      {/* Logo */}

      <Avatar
        sx={{
          width: '100%',
          maxWidth: 258,
          height: '100%',
          maxHeight: 258,
        }}
        src="/icons/full-logo.svg"
      ></Avatar>

      {/* Content */}
      <CardContent
        sx={{
          width: '100%',
        }}
      >
        <Typography variant="body2" fontWeight={600}>
          Sign in to your Account
        </Typography>

        {/* Buttons */}
        <Stack spacing={2} mt={2}>
          <CustomLoginButton
            onClick={onClickGoogle}
            logo="/icons/google-logo.svg"
            text="Continue with Google"
          />
          <CustomLoginButton
            logo="/icons/apple-logo.svg"
            text="Continue with Apple"
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LoginCard
