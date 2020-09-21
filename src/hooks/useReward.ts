import { useCallback } from 'react'

import useDollor from './useDollor'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../dollor/utils'

const useReward = (pid: number, referance: string) => {
  const { account } = useWallet()
  const dollor = useDollor()
  const masterChefContract = getMasterChefContract(dollor)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account, referance)
    console.log(txHash)
    return txHash
  }, [account, pid, dollor])

  return { onReward: handleReward }
}

export default useReward
