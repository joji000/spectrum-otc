import { defineChain } from "thirdweb";

// You can find. https://chainlist.org/
// ref.https://portal.thirdweb.com/references/typescript/v5/defineChain
export const holesky = defineChain({
    id: 17000, // edit
    rpc: "https://holesky.drpc.org", // edit
    nativeCurrency: {
        name: "Ether", // 
        symbol: "ETH", // 
        decimals: 18,
    },
});

// Or +add ...