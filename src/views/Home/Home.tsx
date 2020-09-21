import React from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/icons/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import { useWallet } from 'use-wallet'


import Nav from '../../components/TopBar/components/Nav'
import AccountButton from '../../components/TopBar/components/AccountButton'

const Home: React.FC = () => {
  
  const { account } = useWallet()

  return (
    <Page>
      <br/>
      <PageHeader
        icon={<img alt="all seeing eye" src={chef} width={120} height={120} />}
        // title="BankManager is Ready"
        subtitle=" Stable coins should be stable, just like the foundation of a country!"
      />

        <Nav />
          {/* <StyledAccountButtonWrapper>
            <AccountButton />
          </StyledAccountButtonWrapper> */}

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      { !!account && <span style={{WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "#5c6f52", color: "#d3d2bd", fontSize: "20px"}}>{`https://0xdollar.finance/?ref=${account}`}</span> }

    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 156px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default Home
