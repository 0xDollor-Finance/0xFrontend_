import { useCallback, useState } from 'react'

import useDollor from './useDollor'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../dollor/utils'

const useStake = (pid: number, refferal: string) => {
  const { account } = useWallet()
  const dollor = useDollor()
  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(dollor),
        pid,
        amount,
        account,
        refferal
      )
      console.log(txHash)
    },
    [account, pid, dollor],
  )

  return { onStake: handleStake }
}

export default useStake
