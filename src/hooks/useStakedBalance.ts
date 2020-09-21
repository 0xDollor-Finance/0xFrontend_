import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../dollor/utils'
import useDollor from './useDollor'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const dollor = useDollor()
  const masterChefContract = getMasterChefContract(dollor)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, dollor])

  useEffect(() => {
    if (account && dollor) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, dollor])

  return balance
}

export default useStakedBalance
