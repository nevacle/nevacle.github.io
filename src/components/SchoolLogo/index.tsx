import SchoolLogoImg from '../../assets/school_logo.png';

import LogoContainer from './styles';

function SchoolLogo() {
  return (
    <LogoContainer>
      <img alt="school logo" className="logo" src={SchoolLogoImg} />
    </LogoContainer>
  );
}

export default SchoolLogo;
