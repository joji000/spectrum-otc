import { Box, Container, Stack, Typography } from '@mui/material'
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
          <Stack spacing={1.5}>
            <Image
              src="/spectrum-footer.svg"
              alt="logo"
              width={100}
              height={24}
            />
            <Typography
              fontSize={'12px'}
              fontWeight={'light'}
              maxWidth={372}
            >
            Drop3 is the first automated OTC trading platform. Easily place a buy or sell order. Trade WLs, Tokens, Airdrops, Points, NFTs, Accounts & etc in a safe and integrated environment.
            </Typography>
          </Stack>
          
          <Typography
            variant="body2"
            color="grey.400"
            fontWeight={500}
            textAlign={{ xs: 'center', sm: 'left' }}
            sx={{ fontSize: { xs: '0.5rem', sm: '0.875rem' } }}
          >
            Copyright &#169; 2024 - Spectrumlive
          </Typography>

          <Stack>
            <Typography fontSize={'12px'}
              fontWeight={'bold'}>
              Link
            </Typography>
            <Typography fontSize={'12px'}
              fontWeight={'light'}>
              Home
            </Typography>
            <Typography fontSize={'12px'}
              fontWeight={'light'}>
              About
            </Typography>
            <Typography fontSize={'12px'}
              fontWeight={'light'}>
              FAQ
            </Typography>

          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default TheMainFooter
