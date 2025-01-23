'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import TheMainSidebar from '@/components/layouts/TheMainSidebar';
import useGetMe from '@/hooks/user/useGetMe';
import useGetBalance from '@/hooks/user/useGetBalance';

import axios from 'axios';
import { ethers } from 'ethers';

interface Token {
  address: string;
  symbol: string;
  value: string;
}

interface APIResponseItem {
  token: {
    address: string;
    symbol: string;
    decimals: string;
  };
  value: string;
}

const DashboardPage: React.FC = () => {
  const { data: user } = useGetMe();
  const balance1 = useGetBalance({
    options: {
      enabled: true,
    },
  });

  const [tokens, setTokens] = useState<Token[]>([]);

  const url = process.env.NEXT_PUBLIC_EXP_BLOCKSCOUNT_URL;

  const fetchTokens = useCallback(async () => {
    if (!user?.walletAddress) return;

    try {
      const response = await axios.get(
        `${url}/api/v2/addresses/${user.walletAddress}/tokens?type=ERC-20`
      );

      if (response.data.items) {
        const extractedData: Token[] = response.data.items.map((item: APIResponseItem) => ({
          address: item.token.address,
          symbol: item.token.symbol,
          value: ethers.utils.formatUnits(item.value, item.token.decimals),
        }));
        setTokens(extractedData);
      } else {
        console.error('Failed to fetch tokens');
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [user?.walletAddress, url]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  return (
    <TheMainSidebar title="Welcome back!">
      <Box padding={2}>
        <Typography variant="h6" gutterBottom>
          Wallet Information
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <>
          <Typography>
            <strong>Wallet Address:</strong> {user?.walletAddress || 'Not available'}
          </Typography>
          <Typography>
            <strong>Balance:</strong> {balance1.data?.displayValue || 'Not available'} XL3
          </Typography>
        <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h6" gutterBottom>
            Token Balances
          </Typography>
        <Divider sx={{ marginBottom: 2 }} />
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: 'none' }}><strong>Symbol</strong></TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}><strong>Address</strong></TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: 'none' }}>{token.symbol}</TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}>{token.address}</TableCell>
                    <TableCell sx={{ borderBottom: 'none' }}>{token.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Box>
    </TheMainSidebar>
  );
};

export default DashboardPage;