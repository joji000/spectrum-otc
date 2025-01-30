'use client'
import React, { useState } from 'react';
import {
  Tabs,
  Tab,
} from '@mui/material';

import TheMainSidebar from '@/components/layouts/TheMainSidebar';
import useGetMe from '@/hooks/user/useGetMe';
import SendToken from '@/components/SendToken'; // Adjust the import path as necessary
import ReceiveToken from '@/components/ReceiveToken'; // Adjust the import path as necessary

const TransferPage: React.FC = () => {
  const { data: user } = useGetMe();
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <TheMainSidebar title="Transfer Token">
      <Tabs value={tabIndex} onChange={handleTabChange} aria-label="send and receive tabs">
        <Tab label="Send" />
        <Tab label="Receive" />
      </Tabs>
      {tabIndex === 0 && <SendToken user={user} />}
      {tabIndex === 1 && <ReceiveToken user={user} />}
    </TheMainSidebar>
  );
};

export default TransferPage;