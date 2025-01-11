
import LoginHeader from '@/components/layouts/LoginHeader'
import { Box } from '@mui/material'

interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
    <LoginHeader/>
      <Box
        sx={{
          backgroundImage: 'url(/login-bg.png)',
          height: '100vh',
        }}
      >
        {children}
      </Box>
    </>
  )
}
