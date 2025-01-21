import engine from '../libs/engine.lib'

const engineChainId = process.env.ENGINE_CHAIN_ID ?? ''
const engineL3USDContractAddress =
  process.env.ENGINE_L3USD_CONTRACT_ADDRESS ?? ''


export const getL3USDBalance = async (walletAddress: string) => {
  try {
    const response = await engine.erc20.balanceOf(
      walletAddress,
      engineChainId,
      engineL3USDContractAddress
    )
    return response
  } catch (error) {
    console.error('Balance error:', error)
    throw error
  }
}