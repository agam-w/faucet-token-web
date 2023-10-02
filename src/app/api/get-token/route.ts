import { faucetContract } from '@/ethereum/faucet'
import { ethers } from 'ethers'

export async function POST(req: Request) {
  const data = await req.json()
  console.log(data)
  const { address } = data

  // env
  const privateKey = process.env.WALLET_PRIVATE_KEY ?? ''
  const apiKey = process.env.ALCHEMY_API_KEY ?? ''
  // console.log({ privateKey, apiKey })

  try {
    // init provider
    let provider = new ethers.AlchemyProvider('arbitrum-goerli', apiKey)
    // signer using wallet private key
    const signer = new ethers.Wallet(privateKey, provider)
    const fcContract = faucetContract(provider)

    const fcContractWithSigner = fcContract.connect(signer)
    const resp = await fcContractWithSigner.requestTokens(address)
    console.log('get tokens success')
    console.log(resp)
    return Response.json({ success: true, message: 'Success get token' })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return Response.json({ success: false, message: 'Error get token. ' })
    }
  }
  return Response.json({ success: false, message: 'Error get token.' })
}
