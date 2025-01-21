'use client'

import { Container } from '@mui/material'

import LoginCard from '@/components/LoginCard'
import { createClient } from '@/utils/supabase/client.util'

const SignInPage = () => {
  const handleSignIn = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
      },
    })
  }

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
      <LoginCard onClickGoogle={handleSignIn} />
    </Container>
  )
}

export default SignInPage