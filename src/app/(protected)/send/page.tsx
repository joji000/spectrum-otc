'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Avatar,
} from '@mui/material';

import TheMainSidebar from '@/components/layouts/TheMainSidebar';
import useGetMe from '@/hooks/user/useGetMe';

import { fetchTokens } from '@/services/token.services';
import { Token } from '@/interfaces/token.interface';

const SendTokenPage: React.FC = () => {
  const { data: user } = useGetMe();

  const [tokens, setTokens] = useState<Token[]>([]);
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);

  const fetchTokensCallback = useCallback(async () => {
    if (!user?.walletAddress) return;

    const tokensData = await fetchTokens(user.walletAddress);
    setTokens(tokensData);
    setFromAccount(user.walletAddress); // Set the fromAccount to the user's wallet address
  }, [user?.walletAddress]);

  useEffect(() => {
    fetchTokensCallback();
  }, [fetchTokensCallback]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedToken = e.target.value;
    setToken(selectedToken);
    const selectedTokenData = tokens.find((t) => t.symbol === selectedToken);
    setTokenBalance(selectedTokenData ? selectedTokenData.value : '0');
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) {
      setAmount(e.target.value);
    }
  };

  const handleSetMaxAmount = () => {
    setAmount(tokenBalance);
  };

  const handleContinue = () => {
    if (parseFloat(amount) <= 0 || parseFloat(amount) > parseFloat(tokenBalance)) {
      setAlertType('error');
      setAlertMessage('Invalid amount. Check your balance and try again.');
      return;
    }

    // Validate address
    const walletRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!walletRegex.test(toAccount)) {
      setAlertType('error');
      setAlertMessage('Invalid recipient address.');
      return;
    }

    setDialogOpen(true); // Open the dialog for confirmation
  };

  const handleConfirmTransaction = () => {
    setDialogOpen(false); // Close the dialog

    // Simulate a transaction process
    if (!fromAccount || !toAccount || !amount) {
      setAlertType('error');
      setAlertMessage('Please fill in all fields before proceeding.');
    } else {
      setAlertType('success');
      setAlertMessage(
        `Transaction sent: ${amount} ${token} from ${fromAccount} to ${toAccount}.`
      );
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAlertClose = () => {
    setAlertMessage('');
    setAlertType(null);
  };

  return (
    <TheMainSidebar title="Send Token">
      <Box display="flex" flexDirection="column" gap={2}>
        <Card
          variant="primaryGradient"
          sx={{
            p: 3,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Send Token
          </Typography>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* From Account */}
            <TextField
              label="From"
              variant="outlined"
              fullWidth
              value={fromAccount}
              InputProps={{
                readOnly: true,
              }}
            />

            {/* To Account */}
            <TextField
              label="Recipient Address"
              placeholder="0x... (Recipient address)"
              variant="outlined"
              fullWidth
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
            />

            {/* Token Selector */}
            <TextField
              select
              label="Token"
              value={token}
              onChange={handleTokenChange}
              variant="outlined"
              fullWidth
            >
              {tokens.map((token) => (
                <MenuItem key={token.address} value={token.symbol}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {token.logoURI && (
                      <Avatar src={token.logoURI} alt={token.symbol} sx={{ width: 24, height: 24 }} />
                    )}
                    {token.symbol}
                  </Box>
                </MenuItem>
              ))}
            </TextField>

            {/* Token Balance */}
            <Typography variant="body2">
              Balance: {tokenBalance} {token}
            </Typography>

            {/* Amount */}
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                label="Amount"
                type="number"
                placeholder="0.0"
                variant="outlined"
                fullWidth
                value={amount}
                onChange={handleAmountChange}
              />
              <Button variant="outlined" onClick={handleSetMaxAmount}>
                Max
              </Button>
            </Box>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" gap={2}>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => {
                  setFromAccount(user?.walletAddress || '');
                  setToAccount('');
                  setAmount('');
                  setToken('');
                  setTokenBalance('');
                }}
              >
                Reset
              </Button>
              <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
                Continue
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Transaction</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Amount:</strong> {amount} {token} <br />
            <strong>To:</strong> {toAccount} <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmTransaction} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Alert */}
      {alertMessage && (
        <Alert
          severity={alertType || 'info'}
          sx={{
            position: 'fixed',
            zIndex: 3,
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          onClose={handleAlertClose}
        >
          {alertMessage}
        </Alert>
      )}
    </TheMainSidebar>
  );
};

export default SendTokenPage;
