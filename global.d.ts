import { ethers } from 'ethers'
import { BrowserProvider, Eip1193Provider } from 'ethers/types/providers'

export {}

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider
  }
}
