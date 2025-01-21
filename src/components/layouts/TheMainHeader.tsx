'use client'

import { Menu, ExpandMore } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Stack,
  Menu as MuiMenu,
  Typography,
  Skeleton,
  CircularProgress,
} from '@mui/material'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Route } from '@/enums/route.enum'
import useAuth from '@/hooks/auth/useAuth'
import useGetBalance from '@/hooks/user/useGetBalance'
import { createClient } from '@/utils/supabase/client.util'
import OpenIcon from '../icons/OpenIcon'

const menuItems = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/#About',
      label: 'About',
    },
    {
      href: '/#FAQ',
      label: 'FAQ',
    },
  ]

const drawerWidth = 262

const TheMainHeader = () => {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const pathname = usePathname()
  const { user, isLoading, isAuthenticated } = useAuth()
  const getBalanceHook = useGetBalance({
    options: {
      enabled: isAuthenticated,
    },
  })

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
  }

  const handleSignOut = async () => {
    setIsSidebarOpen(false)
    const supabase = createClient()

    await supabase.auth.signOut()
    window.location.reload()
  }

  const handleGotoAccount = useCallback(() => {
    router.push(Route.DASHBOARD)
    handleCloseSidebar()
  }, [router])

  const accountMenuContent = useCallback(
    (isHeader: boolean) => {
      if (isLoading || !user) {
        return
      }

      return (
        <>
          <Box
            onClick={isHeader ? handleOpenMenu : handleGotoAccount}
            sx={{
              borderColor: 'primary.main',
              borderWidth: 2,
              borderStyle: 'solid',
              backgroundColor: 'grey.600',
              borderRadius: '100px',
              height: '58px',
              px: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              cursor: 'pointer',
            }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                minWidth: '36px',
              }}
            >
              <Avatar
                src="/icons/user-01.png"
                sx={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                }}
              />
            </Button>
            <Stack sx={{ overflow: 'hidden' }}>
              <Typography
                sx={{ color: 'common.white' }}
                fontWeight={600}
                fontSize={16}
                noWrap
              >
                {user?.email}
              </Typography>
              <Typography sx={{ color: 'common.white' }} variant="caption">
                {getBalanceHook.isLoading && (
                  <CircularProgress sx={{ mr: 0.5 }} size="10px" />
                )}
                {getBalanceHook.data?.displayValue} Credit
              </Typography>
            </Stack>

            {isHeader && <ExpandMore />}
          </Box>
          <MuiMenu
            anchorEl={anchorEl}
            onClose={handleClose}
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            sx={{
              '& .MuiPaper-root': {
                minWidth: '200px',
              },
            }}
          >
            <MenuItem
              disableRipple
              onClick={() => {
                handleGotoAccount()
                handleClose()
              }}
            >
              Dashboard
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem disableRipple onClick={handleSignOut}>
              Sign out
            </MenuItem>
          </MuiMenu>
        </>
      )
    },
    [anchorEl, handleGotoAccount, user, isLoading, getBalanceHook.data]
  )

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
    <NextLink href="/" onClick={handleCloseSidebar}>
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
                open={isSidebarOpen}
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
                <Stack gap={1} flex={1}>
                  {menuContent}
                  <Button variant="contained" startIcon={<OpenIcon/>} href={'https://app.drop3.io/auth/login'}>APP</Button>
                  {isAuthenticated && !isLoading && (
                    <Button variant="outlined" onClick={handleSignOut}>
                      Sign out
                    </Button>
                  )}
                  {!isAuthenticated && !isLoading && (
                    <Button
                      LinkComponent={NextLink}
                      href={Route.SIGN_IN}
                      variant="outlined"
                      onClick={handleSidebarToggle}
                    >
                      Sign in
                    </Button>
                  )}
                  <Box mt="auto">{accountMenuContent(false)}</Box>
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
          <Stack
            alignItems="center"
            direction="row"
            gap={2}
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            {menuItems.map((menuItem) => (
              <Link
                sx={{ color: 'common.white', fontWeight: '500' }}
                key={menuItem.href}
                component={NextLink}
                href={menuItem.href}
              >
                {menuItem.label}
              </Link>
            ))}
            <Button variant="contained" startIcon={<OpenIcon/>} href={'https://app.drop3.io/auth/login'}>APP</Button>
            {!user && !isLoading && (
              <Button
                LinkComponent={NextLink}
                href={Route.SIGN_IN}
                variant="outlined"
              >
                Sign in
              </Button>
            )}
            
            {isLoading && (
              <Skeleton width={80}>
                <Box sx={{ pt: 6 }} />
              </Skeleton>
            )}
            {accountMenuContent(true)}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default TheMainHeader