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
} from '@mui/material';
import { ExpandLess, ExpandMore, Menu } from '@mui/icons-material';
import { docsTabs } from '../../types';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(() => {
    const savedState = sessionStorage.getItem('openSections');
    return savedState ? JSON.parse(savedState) : {};
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleToggle = (label: string) => {
    setOpenSections((prev) => {
      const newState = { ...prev, [label]: !prev[label] };
      sessionStorage.setItem('openSections', JSON.stringify(newState));
      return newState;
    });
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    setDrawerOpen(false);
  };

  useEffect(() => {
    docsTabs.forEach((tab) => {
      if (tab.subItems?.some((subTab) => subTab.href === pathname)) {
        setOpenSections((prev) => {
          const newState = { ...prev, [tab.label]: true };
          sessionStorage.setItem('openSections', JSON.stringify(newState));
          return newState;
        });
      }
    });
  }, [pathname]);

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
              {tab.subItems && (
                <Box
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(tab.label);
                  }}
                  sx={{ cursor: 'pointer' }}
                >
                  {openSections[tab.label] ? <ExpandLess /> : <ExpandMore />}
                </Box>
              )}
            </ListItemButton>
          </ListItem>
          {tab.subItems && (
            <Collapse in={openSections[tab.label]} timeout="auto" unmountOnExit>
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
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#06060A',
            width: '100%',
            borderBottom: '1px solid #fff',
            height: '30px',
          }}
          onClick={() => setDrawerOpen(true)}
        >
          <Menu />
        </Box>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            '& .MuiDrawer-paper': {
              width: 250,
              backgroundColor: '#06060A',
              color: '#fff',
              mt: 15.5,
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
          mt: {
            xs: 2,
            md: 0,
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