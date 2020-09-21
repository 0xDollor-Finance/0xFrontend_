import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import { useWallet } from 'use-wallet'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName }) => {
  const { account } = useWallet()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [referance, setreferance] = useState(account)

  const allowance = useAllowance(lpContract)
  const { onApprove } = useApprove(lpContract)

  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance(pid)

  const RefferalSetter = useCallback(async () =>  {
    if(account){
    var completed = false
    var url_string = window.location.href
    var url = new URL(url_string)
    if (url.searchParams.get("ref") !== null) {
      //check the url
      document.cookie = `ref=${url.searchParams.get("ref")}`
      setreferance(url.searchParams.get("ref"))
    } else if (!completed && referance === account) {
      //check for cookies if nothing in url
      var cook = document.cookie.split(' ')
      for (let i = 0; i < cook.length; i++) {
        let identifier = cook[i].split('=');
        if (identifier[0] === 'ref') {
          let full_addr = [identifier[1]]
          document.cookie = `ref=${full_addr[0].slice(0, 42)}`
          setreferance(full_addr[0].slice(0, 42))
        }
      }
      completed = true;
    }
    document.cookie = `ref=${referance}`
  }
  }, [setreferance, referance, account])
  
  useEffect(() => {
    RefferalSetter()
  })

  const { onStake } = useStake(pid, referance)
  const { onUnstake } = useUnstake(pid)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>{'chef'}</CardIcon>
            <Value value={getBalanceNumber(stakedBalance)} />
            <Label text={`${tokenName} Tokens Staked`} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={`Approve ${tokenName}`}
              />
            ) : (
                <>
                  <Button
                    disabled={stakedBalance.eq(new BigNumber(0))}
                    text="Unstake"
                    onClick={onPresentWithdraw}
                  />
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                </>
              )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
