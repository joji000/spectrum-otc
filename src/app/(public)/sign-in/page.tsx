'use client'

import LoginCard from '@/components/LoginCard'

import { Container } from '@mui/material'

const SignInPage = () => {
  

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        pt: 5
      }}
    >
      <LoginCard />
    </Container>
  )
}

export default SignInPage
