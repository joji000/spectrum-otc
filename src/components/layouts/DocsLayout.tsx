'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
  Drawer,
  IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore, Menu } from '@mui/icons-material';

interface DocsTab {
  label: string;
  href?: string;
  subItems?: { label: string; href: string }[];
}

const docsTabs: DocsTab[] = [
  { label: 'What is Drop3?', href: '/docs-page/what-is-drop3' },
  { label: 'How to start', href: '/docs-page/how-to-start' },
  {
    label: 'Create Orders',
    href: '/docs-page/create-orders',
    subItems: [
      { label: 'WL Market', href: '/docs-page/wl-market' },
      { label: 'Public Market', href: '/docs-page/public-market' },
    ],
  },
  { label: 'Manage Balance', href: '/docs-page/manage-balance' },
  { label: 'Manage Orders', href: '/docs-page/manage-orders' },
  { label: 'Manage Offers', href: '/docs-page/manage-offers' },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const activeSections: { [key: string]: boolean } = {};
    docsTabs.forEach((tab) => {
      if (tab.subItems?.some((subTab) => subTab.href === pathname)) {
        activeSections[tab.label] = true;
      }
    });
    setOpenSections(activeSections);
  }, [pathname]);

  const handleToggle = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };

  const sidebarContent = (
    <List>
      {docsTabs.map((tab) => (
        <React.Fragment key={tab.label}>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                if (tab.href) {
                  handleNavigation(tab.href);
                }
                if (tab.subItems) {
                  handleToggle(tab.label);
                }
              }}
              selected={pathname === tab.href}
              sx={{
                justifyContent: 'space-between',
                width: '277px',
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: pathname === tab.href ? 'bold' : 'normal',
                      background: pathname === tab.href
                        ? 'linear-gradient(to right, #D40075, #4340FF 40%)'
                        : 'none',
                      WebkitBackgroundClip: pathname === tab.href ? 'text' : 'none',
                      WebkitTextFillColor: pathname === tab.href ? 'transparent' : 'inherit',
                    }}
                  >
                    {tab.label}
                  </Typography>
                }
              />
              {tab.subItems && (openSections[tab.label] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </ListItem>
          {tab.subItems && (
            <Collapse in={openSections[tab.label]} >
              <List component="div" disablePadding>
                {tab.subItems.map((subTab) => (
                  <ListItemButton
                    key={subTab.label}
                    sx={{ pl: 4 }}
                    onClick={() => handleNavigation(subTab.href)}
                    selected={pathname === subTab.href}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontWeight: pathname === subTab.href ? 'bold' : 'normal',
                            background: pathname === subTab.href
                              ? 'linear-gradient(to right, #D40075, #4340FF 30%)'
                              : 'none',
                            WebkitBackgroundClip: pathname === subTab.href ? 'text' : 'none',
                            WebkitTextFillColor: pathname === subTab.href ? 'transparent' : 'inherit',
                          }}
                        >
                          {subTab.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar for Desktop */}
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'flex',
          },
          backgroundColor: '#06060A',
          color: '#fff',
          position: 'fixed',
        }}
      >
        {sidebarContent}
      </Box>

      {/* Drawer for Mobile */}
      <Box
        sx={{
          display: {
            xs: 'flex',
            md: 'none',
          },
        }}
      >
        <IconButton
          sx={{ position: 'absolute'}}
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </IconButton>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              backgroundColor: '#06060A',
              color: '#fff',
              mt:12
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: {
            xs: 0,
            md: '280px',
          },
          backgroundColor: '#06060A',
          color: '#fff',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
