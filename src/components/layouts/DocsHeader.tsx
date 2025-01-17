'use client';

import React, { useState, ChangeEvent } from 'react';
import { Avatar, Box, Container, Stack, TextField, InputAdornment, Typography, Paper, List, ListItem, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NextLink from 'next/link';
import contentData from '@/services/contentData.json';

interface Section {
  content?: string | string[];
  image?: string;
  list?: string[];
  link?: string;
}

const DocsHeader = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<{ label: string; href: string; snippet?: string }[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);
  
    if (searchQuery.trim()) {
      const matchedResults: { label: string; href: string; snippet?: string }[] = [];
  
      // Search through contentData
      Object.entries(contentData).forEach(([key, value]) => {
        const { title, subtitle, sections } = value as {
          title: string;
          subtitle?: string;
          sections?: Section[];
        };
  
        let snippet = '';
  
        // Check if the title matches
        if (title.toLowerCase().includes(searchQuery)) {
          snippet = title;
        }
  
        // Check if the subtitle matches
        if (subtitle && subtitle.toLowerCase().includes(searchQuery)) {
          snippet = subtitle;
        }
  
        // Check the content in sections
        if (sections) {
          sections.forEach((section) => {
            // Check `section.content`
            if (section.content) {
              const contentArray = Array.isArray(section.content)
                ? section.content
                : [section.content];
  
              contentArray.forEach((content) => {
                if (content.toLowerCase().includes(searchQuery)) {
                  snippet = content; // Capture the matching content
                }
              });
            }
  
            // Check `section.list`
            if (section.list) {
              section.list.forEach((listItem) => {
                if (listItem.toLowerCase().includes(searchQuery)) {
                  snippet = listItem; // Capture the matching list item
                }
              });
            }
  
            // Check `section.link`
            if (section.link && section.link.toLowerCase().includes(searchQuery)) {
              snippet = section.link; // Capture the matching link
            }
          });
        }
  
        // Add result if any match is found
        if (snippet) {
          matchedResults.push({
            label: title,
            href: `/docs/${key}`,
            snippet, // Include the matching snippet
          });
        }
      });
  
      setResults(matchedResults);
    } else {
      setResults([]);
    }
  };

  return (
    <Box>
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
            <NextLink href="/">
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

            {/* Search Input */}
            <Box sx={{ position: 'relative', width: '253px' }}>
              <TextField
                placeholder="Search"
                variant="outlined"
                size="small"
                value={query}
                onChange={handleSearch}
                sx={{
                  width: '100%',
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Dropdown for search results */}
              {query && (
                <Paper
                  elevation={3}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: '300px',
                    overflowY: 'auto',
                    mt: 1,
                    zIndex: 10,
                    backgroundColor: '#06060A',
                  }}
                >
                  {results.length > 0 ? (
                    <List>
                      {results.map((result, index) => (
                        <ListItem key={index} sx={{ padding: '8px 16px', display: 'block' }}>
                          <Link href={result.href} underline="hover" sx={{ color: 'inherit', fontWeight: 'bold' }}>
                            {result.label}
                          </Link>
                          {result.snippet && (
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', }}>
                              {result.snippet}
                            </Typography>
                          )}
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography sx={{ padding: '8px 16px' }}>
                      No results found for &quot;{query}&quot;.
                    </Typography>
                  )}
                </Paper>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default DocsHeader;
