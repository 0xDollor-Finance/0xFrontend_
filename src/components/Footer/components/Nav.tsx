import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href="https://etherscan.io/address/0x62e63084f2f796ca40b35e958dd0c0ed6020a281"
      >
        BankManager Contract
      </StyledLink>
      <StyledLink
        target="_blank"
        href="https://uniswap.info/pair/0x29777da560f6d4D2Da7f20B0190275BCf06ceA93"
      >
        Uniswap 0xDOLLAR-ETH
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/x0dollor">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/0xDollor-Finance">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/0xDollar">
        Twitter
      </StyledLink>
    </StyledNav>
  )
}
// 
const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
-webkit-text-stroke: 1px rgb(92, 111, 82);
  color: rgb(211, 210, 189);
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
