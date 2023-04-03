import {
  AppShell,
  Button,
  Header,
  Image,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import SchoolBG from '../../assets/school_bg.png';
import LibraryHeader from '../LibraryHeader';
import LibraryNavbar from '../LibraryNavbar';

import * as S from './styles';

type Props = {
  children: JSX.Element;
  shouldShowNavbar: boolean;
};

function PageContainer(props: Props) {
  const { children, shouldShowNavbar } = props;

  const isLargerThanSm = useMediaQuery('(min-width: 48em)');

  const renderNavbar = shouldShowNavbar && isLargerThanSm ? <LibraryNavbar /> : undefined;
  const renderHeader = shouldShowNavbar && !isLargerThanSm ? <LibraryHeader /> : undefined;

  return (
    <AppShell
      header={renderHeader}
      navbar={renderNavbar}
      padding={0}
    >
      <S.BackgroundImageWrapper>
        <Image alt="school background" fit="cover" height="100vh" src={SchoolBG} />
      </S.BackgroundImageWrapper>
      <S.CustomContainer>
        {children}
      </S.CustomContainer>
    </AppShell>
  );
}

export default PageContainer;
