'use client'
import { Button, Box, Avatar, Typography } from '@mui/material'

interface CustomLoginButton {
  logo: string
  text: string
  onClick?: () => void
}

const CustomLoginButton: React.FC<CustomLoginButton> = ({
  logo,
  text,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: '100%',
        borderRadius: 10,
        bgcolor: '#303030',
        textTransform: 'none',
        '&:hover': { bgcolor: '#3A3A3C' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar src={logo}></Avatar>
      </Box>
      <Typography
        variant="body1"
        fontWeight={500}
        color="common.white"
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          mr: '40px',
        }}
      >
        {text}
      </Typography>
    </Button>
  )
}

export default CustomLoginButton
