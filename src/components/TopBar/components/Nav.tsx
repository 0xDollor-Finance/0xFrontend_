import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import useModal from '../../../hooks/useModal'
import { useWallet } from 'use-wallet'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'

const Nav: React.FC = () => {
  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account } = useWallet()
  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">
        Home
      </StyledLink>
      <StyledLink exact activeClassName="active" to="/farms">
        Banks
      </StyledLink>

      {/* <StyledLink exact activeClassName="active" to="/farms">
        Unlock Account
      </StyledLink> */}
      {/* <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink> */}
      <StyledAbsoluteLink
        href="https://0xdollar.finance/paper_of_Independence.pdf"
        target="_blank"
      >
        About
      </StyledAbsoluteLink>

      {!account ? (
        <StyledLink exact  to="" onClick={handleUnlockClick}  >
          Unlock Wallet
        </StyledLink>
      ) : (
          <StyledLink exact to="" onClick={onPresentAccountModal} >
            My Wallet
          </StyledLink>
        )
      }
    </StyledNav >
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-bottom: 24px;
`

const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    text-decoration: underline;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  &.active {
    color: ${(props) => props.theme.color.primary.main};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
