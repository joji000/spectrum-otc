'use client'

import { Dashboard } from '@mui/icons-material'
import {
  Box,
  Container,
  Drawer,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'

import { Route } from '@/enums/route.enum'

const menuItems = [
  { label: 'Dashboard', route: Route.DASHBOARD },
  { label: 'Account', route: Route.ACCOUNT },

]

interface TheMainSidebarProps {
  children: React.ReactNode
  title: string
}

const TheMainSidebar = ({ title, children }: TheMainSidebarProps) => {
  const pathname = usePathname()
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen)
  }

  const sideMenuContent = React.useMemo(
    () => (
      <List sx={{ py: 0 }}>
        {menuItems.map((item) => (
          <ListItem disablePadding key={item.label}>
            {item.route ? (
              <ListItemButton
                LinkComponent={Link}
                href={item.route}
                sx={{ px: 4 }}
                selected={pathname === item.route}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemText
                sx={{
                  height: '48px',
                  m: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      color: 'grey.400',
                      textAlign: 'center',
                      fontWeight: 700,
                    },
                  },
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
    ),
    [pathname]
  )

  return (
    <Container
      sx={{
        pt: { xs: 9, md: 10, lg: 11 },
        pb: 3,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/BG-main.png)',
          width: '100%',
          height: { xs: '300px', md: '300px' },
          zIndex: -1,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            height: '200px',
            pointerEvents: 'none',
            background:
              'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)',
            filter: 'blur(10px)',
          },
        }}
      />
      <Grid2 container spacing={2}>
        <Grid2
          size={12}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
            alignItems: 'center',
            position: 'sticky',
            top: 60,
          }}
        >
          <IconButton color="primary" onClick={handleSidebarToggle}>
            <Dashboard sx={{ fontSize: 20 }} />
          </IconButton>
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
                width: 262,
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                gap: 2,
              },
            }}
          >
            {sideMenuContent}
          </Drawer>
        </Grid2>
        <Grid2
          sx={{
            minHeight: { xs: '100px', md: '150px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size={12}
        >
          <Typography variant="h3" color="gradient" textAlign="center">
            {title}
          </Typography>
        </Grid2>
        <Grid2 container size={12}>
          <Grid2
            size={{ xs: 12, md: 3 }}
            sx={{
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          >
            <Box
              sx={{
                bgcolor: 'grey.600',
                borderRadius: 2,
                overflow: 'hidden',
                position: 'sticky',
                top: 88,
              }}
            >
              {sideMenuContent}
            </Box>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 9 }}>{children}</Grid2>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default TheMainSidebar