import { ethers } from 'ethers'
import { atom } from 'nanostores'

export const $walletAddress = atom('')

export const $signer = atom<ethers.Signer | undefined>()
export const $fcContract = atom<ethers.Contract | undefined>()
