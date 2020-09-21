import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import axios from 'axios'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import DollorIcon from '../../../components/DollorIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useDollor from '../../../hooks/useDollor'
import { getDollorAddress, getDollorSupply } from '../../../dollor/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
//coin images
import usdcImg from '../../../assets/img/icons/usdc.png'
import usdtImg from '../../../assets/img/icons/usdt.png'
import daiImg from '../../../assets/img/icons/dai.png'
import susdImg from '../../../assets/img/icons/susd.png'


const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [usdcPrice, setusdcPrice] = useState(0)
  const [daiPrice, setdaiPrice] = useState(0)
  const [usdtPrice, setusdtPrice] = useState(0)
  const [susdPrice, setsusdPrice] = useState(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const dollor = useDollor()
  const dollorBalance = useTokenBalance(getDollorAddress(dollor))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/simple/price?ids=weth%2Cdai%2Cusd-coin%2C%2Ctether%2Cnusd%2C0xdollar&vs_currencies=usd').then((res) => {
      if (res.status === 200) {
        setusdcPrice(Number(res.data['usd-coin'].usd))
        setsusdPrice(Number(res.data['nusd'].usd))
        setdaiPrice(Number(res.data['dai'].usd))
        setusdtPrice(Number(res.data['tether'].usd))
        // console.log(Number(res.data['0xdollar'].usd))
        console.log(res.data)

      }
    })
    async function fetchTotalSupply() {
      const supply = await getDollorSupply(dollor)
      setTotalSupply(supply)
    }
    if (dollor) {
      fetchTotalSupply()
    }
  }, [dollor, setTotalSupply, setdaiPrice])

  return (
    <StyledRows>
    {/* collumn one */}
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <DollorIcon />
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Your 0xDOLLAR Balance" />
                <Value
                  value={!!account ? getBalanceNumber(dollorBalance) : 'Locked'}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> 0xDOLLAR
          </FootnoteValue>
        </Footnote>
      </Card>
      {/* Dollor */}
      <StyledPad />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="0xDOLLAR Price from (Coingecko)" />
                <Value
                  value={(25).toFixed(2)}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      {/* dai */}
      <StyledPad />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
            <img src={daiImg} width="36" alt="dai icon"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="DAI Price" />
                <Value
                  value={(daiPrice).toFixed(2)}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      {/* usdt */}
      <StyledPad />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
            <img src={usdtImg} width="36" alt="usdt icon"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="USDT Price" />
                <Value
                  value={(usdtPrice).toFixed(2)}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      <Spacer />
      </StyledWrapper>
      {/* column two */}
<StyledWrapper>
      <Card>
        <CardContent>
          <Label text="Total 0xDOLLAR Supply" />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
          />
        </CardContent>
        <Footnote>
          New rewards per block
          <FootnoteValue>10 0xDOLLAR</FootnoteValue>
        </Footnote>
      </Card>
      {/* TVL */}
      <StyledPad />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="Total Value Locked" />
                <Value
                  // value={(susdPrice).toFixed(2)}
                  value={'-.--'}
                  />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      {/* susd */}
      <StyledPad />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <img src={susdImg} width="36" alt="susd icon"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text="sUSD Price" />
                <Value
                  value={(susdPrice).toFixed(2)}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      {/* usdc */}
      <StyledPad />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
            <img src={usdcImg} width="36" alt="usdc icon"/>
              <Spacer />
              <div style={{ flex: 1 }}>
                <Label text=" USDC Price" />
                <Value
                  value={(usdcPrice).toFixed(2)}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
      </Card>
      <Spacer />
    </StyledWrapper>
    </StyledRows>
  )
}
const StyledPad = styled.div`
width:24px;
height:12px;
`
const StyledRows = styled.div`
align-items: center;
width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
display:flex;
flex-flow:column;
align-items:center;
align-content: center;
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`


export default Balances
