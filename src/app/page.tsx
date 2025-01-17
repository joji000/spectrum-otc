'use client'
import CheckoutDocsIcon from '@/components/icons/CheckoutDocsIcon'
import OpenIcon from '@/components/icons/OpenIcon'
import { 
  Box,
  Stack,
  Typography,
  Container, 
  Button,
  Grid2 } from '@mui/material'
import QuestionAnswer from '@/components/QuestionAnswer'
import FeatureCardsContainer from '@/components/FeatureCardContainer'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/BG-main.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box id="About"
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2))',
            zIndex: 1,
          }}
        />
          <Container  
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 2,
            }}
          >
            <Stack>
              <Typography
                variant="h2"
                gutterBottom
                maxWidth={650}
                fontWeight= 'bold'
                sx={{
                  background: 'linear-gradient(to bottom,#FFFFFF, #999999 85%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 'bold',
                  }}
                >
                  The Biggest OTC Market In The World
              </Typography>
              <Typography
                variant="subtitle2"
                fontWeight={500}
                gutterBottom
                maxWidth={650}
                color="grey.400"
              >
                Drop3 is the first automated OTC trading platform. Easily place a buy or sell order. Trade WLs,
                Tokens, Airdrops, Points, NFTs, Accounts & etc in a safe and integrated environment. 
              </Typography>
            </Stack>

            <Stack sx={{
              flexDirection:'row',
              gap: 1,
              mt: 2
            }}>
              <Link href="https://app.drop3.io/public-market" passHref>
                <Button variant="contained" startIcon={<OpenIcon/>}>Launch App</Button>
              </Link>
              <Link href="/docs/what-is-drop3" passHref>
                <Button 
                  variant="contained" 
                  startIcon={<CheckoutDocsIcon/>}
                  sx={{
                    background: 'linear-gradient(to right,#400ED3, #5562FC)',
                  }}
                >Check out docs</Button>
              </Link>
            </Stack> 
          </Container>
      </Box>
      <Container sx={{ py: 8 }}>
        <FeatureCardsContainer />
      </Container>

      <Container sx={{ pt: 2, pb: 8}}>
        <Stack gap={3}>
          <Typography id="FAQ" variant="h3" color="gradient" >
            FAQ
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack gap={2}>
                <QuestionAnswer
                  question="What is Drop3?"
                  answer="We are the first automated OTC trading platform. Token/Point Market & NFT/WL Market and all other assets."
                />
                <QuestionAnswer
                  question="Why Drop3?"
                  answer="All orders on our platform are done automatically and by the system, and you don't need a middleman. Therefore, this process makes the transaction more efficient and faster. Also, with our bots on X and Discord, your order will be more visible. Make your transactions easily in a secure environment and as quickly as possible."
                />
                <QuestionAnswer
                  question="What if we encounter a problem during the agreement?"
                  answer="If the seller and buyer do not reach an agreement, they can send a middleman request so that our admins can join their chat and solve the problem."
                />
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Stack gap={2}>
                <QuestionAnswer
                  question="What should we do to place an order?"
                  answer="To place an order, you only need to login with your Discord account. After login, you can easily create your order as a buyer or seller from the Create Order section."
                />
                <QuestionAnswer
                  question="How to make a purchase?"
                  answer="You can see the open orders on the orders page and after selecting the order, buy immediately or send an offer to the creator."
                />
              </Stack>
            </Grid2>
          </Grid2>
        </Stack>
      </Container>
    </>
  )
}