import styled from 'styled-components';

const LogoContainer = styled.div`
  .logo {
    height: 6rem;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #61dafbaa);
  }

  @media screen and (min-width: 600px) {
    .logo {
      height: 8rem;
    }
  }
`;

export default LogoContainer;
