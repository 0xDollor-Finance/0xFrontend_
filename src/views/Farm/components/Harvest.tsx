import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings from '../../../hooks/useEarnings'
import useReward from '../../../hooks/useReward'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useWallet } from 'use-wallet'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const { account } = useWallet()
  const [referance, setreferance] = useState(account)
  const earnings = useEarnings(pid)
  const [pendingTx, setPendingTx] = useState(false)
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

  const { onReward } = useReward(pid, referance)



  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>{'money'}</CardIcon>
            <Value value={getBalanceNumber(earnings)} />
            <Label text="0xDOLLAR Earned" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting 0xDOLLAR' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
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

const StyledSpacer = styled.div`
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

export default Harvest
