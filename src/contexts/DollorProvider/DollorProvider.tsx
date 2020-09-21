import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Dollor } from '../../dollor'

export interface DollorContext {
  dollor?: typeof Dollor
}

export const Context = createContext<DollorContext>({
  dollor: undefined,
})

declare global {
  interface Window {
    dollordippings: any
  }
}

const DollorProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [dollor, setDollor] = useState<any>()

  // @ts-ignore
  window.dollor = dollor
  // @ts-ignore
  window.eth = ethereum

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const dollorLib = new Dollor(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setDollor(dollorLib)
      window.dollordippings = dollorLib
    }
  }, [ethereum])

  return <Context.Provider value={{ dollor }}>{children}</Context.Provider>
}

export default DollorProvider
