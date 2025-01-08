import { Box, Container, Typography } from '@mui/material'
import Image from 'next/image'

const TheMainFooter = () => {
  return (
    <Box
      sx={{
        height: '108px',
        backgroundColor: 'grey.600',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Image
            src="/spectrum-footer.svg"
            alt="logo"
            width={100}
            height={24}
          />
          <Typography
            variant="body2"
            color="grey.400"
            fontWeight={500}
            textAlign={{ xs: 'center', sm: 'left' }}
            sx={{ fontSize: { xs: '0.5rem', sm: '0.875rem' } }}
          >
            Copyright &#169; 2024 - Spectrumlive
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Typography
              variant="body2"
              color="grey.400"
              fontWeight={500}
              sx={{ fontSize: { xs: '0.5rem', sm: '0.875rem' } }}
            >
              Terms of Service
            </Typography>
            <Box
              sx={{
                height: '16px',
                width: '1px',
                backgroundColor: 'grey.400',
              }}
            />
            <Typography
              variant="body2"
              color="grey.400"
              fontWeight={500}
              sx={{ fontSize: { xs: '0.5rem', sm: '0.875rem' } }}
            >
              Privacy Policy
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default TheMainFooter
