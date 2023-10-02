'use client'
import { useEffect, useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useStore } from '@nanostores/react'
import { $fcContract, $signer, $walletAddress } from '@/stores/wallet'
import { ethers } from 'ethers'
import { faucetContract } from '@/ethereum/faucet'

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // const walletAddress = useStore($walletAddress)

  // using connect wallet
  // useEffect(() => {
  //   getCurrentWalletConnected()
  //   addWalletListener()
  // }, [walletAddress])

  const connectWallet = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_requestAccounts', [])
        $signer.set(await provider.getSigner())
        $fcContract.set(faucetContract(provider))

        /* MetaMask is installed */
        // const accounts = await window.ethereum.request({
        //   method: 'eth_requestAccounts',
        // })
        $walletAddress.set(accounts[0])
        console.log(accounts[0])
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask')
    }
  }

  const getCurrentWalletConnected = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const accounts = await provider.send('eth_accounts', [])

        // const accounts = await window.ethereum.request({
        //   method: 'eth_accounts',
        // })
        if (accounts.length > 0) {
          $signer.set(await provider.getSigner())
          $fcContract.set(faucetContract(provider))

          $walletAddress.set(accounts[0])
          console.log(accounts[0])
        } else {
          console.log('Connect to MetaMask using the Connect button')
        }
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message)
        }
      }
    } else {
      /* MetaMask is not installed */
      console.log('Please install MetaMask')
    }
  }

  const addWalletListener = async () => {
    if (typeof window != 'undefined' && typeof window.ethereum != 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: any) => {
        $walletAddress.set(accounts[0])
        console.log(accounts[0])
      })
    } else {
      /* MetaMask is not installed */
      $walletAddress.set('')
      console.log('Please install MetaMask')
    }
  }

  return (
    <header className="">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/*
          <a href="#" className="text-sm font-semibold leading-6 " onClick={connectWallet}>
            {walletAddress && walletAddress.length > 0
              ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
              : 'Connect Wallet'}
          </a>
          */}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 shadow-lg sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button type="button" className="-m-2.5 rounded-md p-2.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6"></div>
              <div className="py-6">
                {/*
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                  onClick={connectWallet}
                >
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                    : 'Connect Wallet'}
                </a>
                */}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
