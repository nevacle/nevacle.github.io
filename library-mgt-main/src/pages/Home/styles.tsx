import { Text } from '@mantine/core';
import styled from 'styled-components';

export const Title = styled(Text)`
  z-index: 1;
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  line-height: 50px;
  text-align: center;

  color: #FFFFFF;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const HomeButtonContainer = styled.div`
  margin-top: 1rem;
  padding: 2rem 2rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 1;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 16px;

  
  @media screen and (min-width: 1200px) {
    margin-top: 2rem;

    .homeButtonContainerStack {
      width: 300px;
    }
  }
`;

export const FlexRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const SignUpButton = styled.a`
  margin: 0;
  margin-left: 5px;
  color: white;
  cursor: pointer;
  font-weight: 600;

  :hover {
    color: #2148C0;
  }
`;
