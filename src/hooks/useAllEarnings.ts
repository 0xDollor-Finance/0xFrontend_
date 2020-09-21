import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../dollor/utils'
import useDollor from './useDollor'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const dollor = useDollor()
  const farms = getFarms(dollor)
  const masterChefContract = getMasterChefContract(dollor)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, dollor])

  useEffect(() => {
    if (account && masterChefContract && dollor) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, dollor])

  return balances
}

export default useAllEarnings
