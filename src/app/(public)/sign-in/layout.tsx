import { Box } from '@mui/material'

interface Props {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Box
        sx={{
          backgroundImage: 'url(/login-bg.png)',
          height: 'calc(100vh - 108px)',
        }}
      >
        {children}
      </Box>
    </>
  )
}
