import { createThirdwebClient } from "thirdweb";
 
export const client = createThirdwebClient({
  // ref.https://portal.thirdweb.com/connect#with-connect-you-can 
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});