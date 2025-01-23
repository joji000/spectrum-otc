import engine from '../libs/engine.lib'

const engineChainId = process.env.ENGINE_CHAIN_ID ?? ''



export const getBalance = async (walletAddress: string) => {
  try {
    const response = await engine.backendWallet.getBalance(
      engineChainId,
      walletAddress,
      
    )
    return response
  } catch (error) {
    console.error('Balance error:', error)
    throw error // Rethrow to handle it in the calling function
  }
}
