import { Box, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import TheMainFooter from './TheMainFooter'


const TheMainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Stack minHeight="100vh">
      <Box flex={1}>{children}</Box>
      <TheMainFooter />
    </Stack>
  )
}

export default TheMainLayout
