'use client';
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

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

  const [openSections, setOpenSections] = React.useState<{ [key: string]: boolean }>({});

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
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
                sx={{justifyContent: 'space-between' ,minWidth: 277}}
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
                                ? 'linear-gradient(to right, #D40075, #4340FF 40%)'
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#06060A',
          color: '#fff',
          ml: 5,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
