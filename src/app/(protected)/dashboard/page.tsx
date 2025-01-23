'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Avatar, 
  Card,
  Link
 } from '@mui/material';

import TheMainSidebar from '@/components/layouts/TheMainSidebar';
import useGetMe from '@/hooks/user/useGetMe';
import useGetBalance from '@/hooks/user/useGetBalance';

import { fetchTokens } from '@/services/token.services';
import { Token } from '@/interfaces/token.interface';

const DashboardPage: React.FC = () => {
  const { data: user } = useGetMe();
  const balance1 = useGetBalance({
    options: {
      enabled: true,
    },
  });

  const [tokens, setTokens] = useState<Token[]>([]);


  const fetchTokensCallback = useCallback(async () => {
    if (!user?.walletAddress) return;

    const tokensData = await fetchTokens(user.walletAddress);
    setTokens(tokensData);
  }, [user?.walletAddress]);

  useEffect(() => {
    fetchTokensCallback();
  }, [fetchTokensCallback]);

  return (
    <TheMainSidebar title="Welcome back!">
      <Card variant="primaryGradient">
      <Box padding={2}>
        <Typography variant="h6" gutterBottom>
          Wallet Information
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <>
          <Typography>
            <strong>Wallet Address : </strong> 
            <Link
                  href={`${process.env.NEXT_PUBLIC_EXP_BLOCKSCOUNT_URL}/address/${user?.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
            {user?.walletAddress}
            </Link>
          </Typography>
          <Typography>
            <strong>Balance : </strong> {balance1.data?.displayValue} XL3
          </Typography>
          <Typography variant="h6" gutterBottom>
            Token Balances
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
          <TableContainer component={Paper} sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <Table sx={{ borderCollapse: 'collapse' }}>
              <TableHead>
                <TableRow>
                  <TableCell ><strong>Logo</strong></TableCell>
                  <TableCell ><strong>Symbol</strong></TableCell>
                  <TableCell ><strong>Address</strong></TableCell>
                  <TableCell ><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tokens.map((token, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: 'none' }}>
                      {token.logoURI ? <Avatar src={token.logoURI} alt={token.symbol} /> : 'N/A'}
                    </TableCell>
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
      </Card>
    </TheMainSidebar>
  );
};

export default DashboardPage;