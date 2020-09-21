import React from 'react'
import styled from 'styled-components'

import img1 from "../../assets/img/icons/1.png"
import img2 from "../../assets/img/icons/2.png"
import img3 from "../../assets/img/icons/3.png"
import img4 from "../../assets/img/icons/4.png"
import img5 from "../../assets/img/icons/5.png"

import metamaskLogo from '../../assets/img/icons/metamask-fox.svg'
import walletConnectLogo from '../../assets/img/icons/wallet-connect.svg'

interface CardIconProps {
  children?: React.ReactNode,
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>
    {children == 11 && <img src={img1}/>}
    {children == 22 && <img src={img2}/>}
    {children == 33 && <img src={img3}/>}
    {children == 44 && <img src={img4}/>}
    {children == 55 && <img src={img5}/>}
    {children == 'mm' && <img src={metamaskLogo}/>}
    {children == 'wc' && <img width="40" src={walletConnectLogo}/>}
    {children == 'money' && <span>💸</span>}
    {children == 'chef' && <span>👨🏻‍🍳</span>}
    {children == 'caution' && <span>⚠️</span>}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.color.grey[200]};
  font-size: 36px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-items: center;
  display: flex;
  justify-content: center;
  box-shadow: inset 4px 4px 8px ${props => props.theme.color.grey[300]},
    inset -6px -6px 12px ${props => props.theme.color.grey[100]};
  margin: 0 auto ${props => props.theme.spacing[3]}px;
`

export default CardIcon