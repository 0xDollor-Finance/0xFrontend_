import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useDollor from '../../hooks/useDollor'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../dollor/utils'
import { getFarms } from '../../dollor/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const dollor = useDollor()
  const { account } = useWallet()

  const farms = getFarms(dollor)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
