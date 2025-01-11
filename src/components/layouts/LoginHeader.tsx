'use client'

import {
  Avatar,
  Box,
  Container,
  Stack,
} from '@mui/material'

import NextLink from 'next/link'


const LoginHeader = () => {
  const logo = (
    <NextLink href="/home">
      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar sx={{ width: 78, height: 60 }} src="/icons/logo.svg" />
        <Avatar
          variant="square"
          sx={{ width: 100, height: 24 }}
          src="/icons/logo-text.svg"
        />
      </Stack>
    </NextLink>
  )

  return (
    <Box
      component="header"
      sx={{
        zIndex: 3,
        width: '100%',
        position: 'fixed',
        top: 0,
        py: {
          xs: 1,
          md: 1.5,
        },
        background: 'rgba(1, 1, 1, 0.1)',
        backdropFilter: 'blur(1px)',
      }}
    >
      <Container>
        <Stack
          sx={{ minHeight: '40px' }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
            {logo}
        </Stack>
      </Container>
    </Box>
  )
}

export default LoginHeader
