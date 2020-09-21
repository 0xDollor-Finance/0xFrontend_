import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: #8f9c89;
  border: 1px solid #99ac8e;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px #4a5f43;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`

export default Card
