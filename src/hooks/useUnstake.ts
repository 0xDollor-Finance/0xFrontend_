import { useCallback } from 'react'

import useDollor from './useDollor'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../dollor/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const dollor = useDollor()
  const masterChefContract = getMasterChefContract(dollor)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, dollor],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
