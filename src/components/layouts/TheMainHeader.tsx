'use client'

import { Menu } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material'
import { useState } from 'react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import OpenIcon from '../icons/OpenIcon'

const menuItems = [
  {
    href: '/',
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

const drawerWidth = 262

const TheMainHeader = () => {
  const [isSidebar, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebar)
  }

  const menuContent = (
    <List
      sx={{
        '& a': {
          textDecoration: 'unset',
        },
      }}
    >
      {menuItems.map((item, index) => {
        const isActive = pathname === item.href

        return (
          <Link key={index} component={NextLink} href={item.href} passHref>
            <ListItem
              sx={
                isActive
                  ? {
                      color: 'common.white',
                      backgroundColor: 'primary.main',

                      '&:hover': {
                        color: 'common.white',
                        backgroundColor: 'primary.dark',
                      },
                    }
                  : {}
              }
              onClick={handleSidebarToggle}
            >
              <ListItemText
                slotProps={{
                  primary: {
                    sx: { color: 'common.white', fontWeight: '500' },
                  },
                }}
                primary={item.label}
              />
            </ListItem>
          </Link>
        )
      })}
    </List>
  )

  const logo = (
    <NextLink href="/">
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Stack
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
                alignItems: 'center',
              }}
            >
              <Menu
                sx={{ color: 'common.white' }}
                onClick={handleSidebarToggle}
              />
              <Drawer
                variant="temporary"
                open={isSidebar}
                onClose={handleSidebarToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    p: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    gap: 2,
                  },
                }}
              >
                {logo}
                <Stack gap={1}>
                  {menuContent}
                  <Button variant="contained" startIcon={<OpenIcon/>}>APP</Button>
                  <Button variant="outlined" href={'/sign-in'}>Login</Button>
                </Stack>
              </Drawer>
            </Stack>
            <Stack
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
                alignItems: 'center',
              }}
            >
              {logo}
            </Stack>
          </Box>
          <Stack alignItems="center" direction="row" gap={1} 
          sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
                alignItems: 'center',
              }}>
            {menuItems.map((menuItem) => {
              return (
                <Link
                  sx={{ color: 'common.white', fontWeight: '500' }}
                  key={menuItem.href}
                  component={NextLink}
                  href={menuItem.href}
                >
                  {menuItem.label}
                </Link>
              )
            })}
            <Button variant="contained" startIcon={<OpenIcon/>}>APP</Button>
            <Button variant="outlined" href={'/sign-in'}>Login</Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default TheMainHeader
