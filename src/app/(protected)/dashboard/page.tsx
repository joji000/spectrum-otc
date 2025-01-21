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
  contractAddress: string;
  symbol: string;
  balance: string;
  decimals: number;
}

const DashboardPage: React.FC = () => {
  const { data: user } = useGetMe();
  const balance1 = useGetBalance({
    options: {
      enabled: true,
    },
  });

  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const url = process.env.NEXT_PUBLIC_EXP_BLOCKSCOUNT_URL;

  const fetchTokens = useCallback(async () => {
    if (!user?.walletAddress) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${url}/api?module=account&action=tokenlist&address=${user.walletAddress}`
      );

      if (response.data.status === '1') {
        const extracData: Token[] = response.data.result.map((item: APIResponseItem) => ({
          address: item.contractAddress,
          symbol: item.symbol,
          value: ethers.utils.formatUnits(item.balance, item.decimals),
        }));
        setTokens(extracData);
      } else {
        setError(response.data.message || 'Failed to fetch tokens');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
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

        <Typography>
          <strong>Wallet Address:</strong> {user?.walletAddress || 'Not available'}
        </Typography>
        <Typography>
          <strong>Balance:</strong> {balance1.data?.displayValue || 'Not available'}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Typography variant="h6" gutterBottom>
          Token Balances
        </Typography>

        {loading && <Typography>Loading tokens...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && tokens.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Symbol</strong></TableCell>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell>{token.symbol}</TableCell>
                    <TableCell>{token.address}</TableCell>
                    <TableCell>{token.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          !loading && <Typography>No tokens found.</Typography>
        )}
      </Box>
    </TheMainSidebar>
  );
};

export default DashboardPage;
