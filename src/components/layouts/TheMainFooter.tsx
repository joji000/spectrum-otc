import { Box, Container, Stack, Typography, Link} from '@mui/material'
import NextLink from 'next/link'
import Image from "next/image"

const menuItems = [
  {
    href: '/Home',
    label: 'Home',
  },
  {
    href: '/About',
    label: 'About',
  },
  {
    href: '/FAQ',
    label: 'FAQ',
  },
]


const TheMainFooter = () => {
  return (
    (<Box
      sx={{
        height: '108px',
        backgroundColor: '#06060A',
        display: 'flex',
        alignItems: 'center',
        py: 8
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
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
            <Typography
              fontSize={{ xs: '0.5rem', sm: '0.775rem' }}
              fontWeight={'light'}
              maxWidth={'30em'}
            >
            Drop3 is the first automated OTC trading platform. Easily place a buy or sell order. Trade WLs, Tokens, Airdrops, Points, NFTs, Accounts & etc in a safe and integrated environment.
            </Typography>
          </Stack>
          
          <Typography
            variant="body2"
            color="grey.400"
            fontWeight={500}
            textAlign={{ xs: 'center', sm: 'left' }}
            sx={{ fontSize: { xs: '0.5rem', sm: '0.875rem' }, mr: '5rem' }}
          >
            Copyright &#169; 2024 - Spectrumlive
          </Typography>
          
          <Stack alignItems="center" direction="column">
            <Typography fontSize={{ xs: '0.5rem', sm: '0.875rem' }}
              fontWeight={'bold'}>
              Link
            </Typography>
            {menuItems.map((menuItem) => {
              return (
                <Link
                  fontWeight={'light'}
                  fontSize={{ xs: '0.4rem', sm: '0.775rem' }}
                  sx={{ color: 'common.white' }}
                  key={menuItem.href}
                  component={NextLink}
                  href={menuItem.href}
                >
                  {menuItem.label}
                </Link>
              )
            })}
          </Stack>
        </Box>
      </Container>
    </Box>)
  );
}

export default TheMainFooter
