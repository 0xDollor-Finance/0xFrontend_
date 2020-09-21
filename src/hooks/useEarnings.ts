import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../dollor/utils'
import useDollor from './useDollor'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const dollor = useDollor()
  const masterChefContract = getMasterChefContract(dollor)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, dollor])

  useEffect(() => {
    if (account && masterChefContract && dollor) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, dollor])

  return balance
}

export default useEarnings
