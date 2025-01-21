'use client'
import { Box, Stack } from '@mui/material'
import { PropsWithChildren } from 'react'
import TheMainFooter from './TheMainFooter'
import { usePathname } from "next/navigation";
import TheMainHeader from './TheMainHeader';
import DocsHeader from "@/components/layouts/DocsHeader";
import LoginHeader from './LoginHeader';

const TheMainLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  let Header;
  if (pathname.startsWith("/docs")) {
    Header = DocsHeader;
  } else if (pathname.startsWith("/sign-in")) {
    Header = LoginHeader;
  } else {
    Header = TheMainHeader;
  }

  return (
    <Stack minHeight="100vh">
      {Header && <Header />}
      <Box flex={1}>{children}</Box>
      <TheMainFooter />
    </Stack>
  )
}

export default TheMainLayout
