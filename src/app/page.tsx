'use client'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import Button from '@/components/Button'
import Container from '@/components/Container'
import Header from '@/components/Header'
import Input from '@/components/Input'
// import { $fcContract, $signer, $walletAddress } from '@/stores/wallet'
// import { useStore } from '@nanostores/react'
import { useState } from 'react'

export default function Home() {
  // const walletAddress = useStore($walletAddress)
  // const signer = useStore($signer)
  // const fcContract = useStore($fcContract)

  const [toAddress, setToAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState<string | undefined>()
  const [error, setError] = useState<string | undefined>()

  const getTokenHandler = async () => {
    setSuccess(undefined)
    setError(undefined)

    if (toAddress.length <= 0) {
      setError('Please input a wallet address')
      return
    }

    setIsLoading(true)
    await fetch('/api/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address: toAddress }),
    })
      .then(async (res) => await res.json())
      .then((data) => {
        setIsLoading(false)
        console.log(data)
        if (data.success) {
          setSuccess(data.message)
        } else {
          setError(data.message)
        }
      })
      .catch((err) => console.error(err))
    setIsLoading(false)
  }

  return (
    <>
      <Header />

      <Container>
        <div className="space-y-10">
          <div className="space-y-4 py-8 text-center">
            <p className="text-3xl font-bold text-white">Faucet Token Web</p>
            <p className="text-lg font-semibold">Fast and reliable. 0.02 ETH/day.</p>
          </div>

          <div className="space-y-4 rounded-xl border-2 border-gray-500/30 p-6 lg:p-8">
            <div className="flex flex-col space-y-4 text-lg lg:flex-row lg:space-x-4 lg:space-y-0">
              <div className="flex-1">
                <Input
                  name="address"
                  placeholder="Enter your wallet address (0x..)"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                />
              </div>
              <Button disabled={toAddress.length <= 0 || isLoading} onClick={getTokenHandler}>
                {isLoading ? (
                  <div className="animate-spin">
                    <ArrowPathIcon width={16} height={16} />
                  </div>
                ) : null}
                <p>Send Me ETH</p>
              </Button>
            </div>

            <div>
              {success ? <p className="text-green-500">{success}</p> : null}
              {error ? <p className="text-red-500">{error}</p> : null}
            </div>

            {/*

            <div className="pb-8">
              <p>
                <a href="" className="text-indigo-500">
                  Please signup or login
                </a>{' '}
                with request ETH. It's free!
              </p>
            </div>

            <hr className="border-gray-500/30" />

            <div className="overflow-clip rounded-lg border border-gray-500/30">
              <div className="flex bg-gradient-to-r from-indigo-700 from-60% to-pink-600 px-3 py-2 font-medium text-white">
                <div className="basis-3/4">Your Transactions</div>
                <div className="basis-1/4">Time</div>
              </div>
              <div className="">
                <div className="flex px-3 py-2">
                  <div className="basis-3/4">-</div>
                  <div className="basis-1/4">-</div>
                </div>
              </div>
            </div>
            */}
          </div>

          <div className="prose prose-slate prose-invert max-w-none space-y-4 rounded-xl border-2 border-gray-500/30 p-6 prose-p:text-gray-400 lg:p-8">
            <h1>FAQs</h1>
            <h3>How do I use this?</h3>
            <p>
              To request funds, simply enter your wallet address and hit “Send Me ETH”. We support wallets as received
              addresses but not smart contracts.
            </p>
            <br />

            <h3>How does it work?</h3>
            <p>
              You can request 0.02 Goerli ETH every 24h without any authentication. Then create a free Alchemy account
              to start building!
            </p>
            <br />

            <h3>What happens if I login with Alchemy?</h3>
            <p>
              You will get 0.02 Goerli ETH instead. Signing in with Alchemy accounts allows us to prevent abuse and
              therefore raise our faucet’s drip.
            </p>
            <br />

            <h3>What is a testnet Ethereum faucet?</h3>
            <p>
              An Ethereum faucet is a developer tool to get testnet Ether (ETH) in order to test and troubleshoot your
              decentralized application or protocol before going live on Ethereum mainnet, where one must use real
              Ether. Most faucets require social authentication (e.g. Twitter post or login confirming you are a real
              human) or place you in a queue to wait for a testnet token through the faucet. The Alchemy Goerli faucet
              is free, fast, and does not require authentication, though you can optionally login to Alchemy to get an
              increased drip.
            </p>
            <br />
          </div>
        </div>
      </Container>

      <div className="flex items-center justify-center py-4">
        <p className="text-sm">Faucet Token Web. 2023</p>
      </div>
    </>
  )
}
