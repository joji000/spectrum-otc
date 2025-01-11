'use client';

import { Avatar, Box, Container, Stack, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NextLink from 'next/link';

const DocsHeader = () => {
  const logo = (
    <NextLink href="/home">
      <Stack direction="row" alignItems="center" gap={1}>
        <Avatar sx={{ width: 78, height: 60 }} src="/icons/logo.svg" alt="Logo Icon" />
        <Avatar
          variant="square"
          sx={{ width: 100, height: 24 }}
          src="/icons/logo-text.svg"
          alt="Logo Text"
        />
      </Stack>
    </NextLink>
  );

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
          {/* Logo */}
          {logo}

          {/* Search Input */}
          <TextField
            placeholder="Search"
            variant="outlined"
            size="small"
            sx={{
              maxWidth: 253,
              borderRadius: '4px',
              input: {
                color: '#fff',
                padding: '8px',
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.3)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff',
              },
            }}
            slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default DocsHeader;
