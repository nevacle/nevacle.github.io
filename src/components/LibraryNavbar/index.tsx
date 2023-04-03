import {
  Navbar, Tooltip, UnstyledButton, createStyles, Stack, rem,
} from '@mantine/core';
import {
  IconDeviceDesktopAnalytics,
  IconUser,
  IconLogout,
  IconBookUpload,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';

import swal from 'sweetalert';

import routes from '../../constants/routes';

import { useAuth } from '../../contexts/AuthContext';

import SweetAlertEnum from '../../enums/SweetAlert.enum';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon, label, active, onClick,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton className={cx(classes.link, { [classes.active]: active })} onClick={onClick}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

function LibraryNavbar() {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navRoute = [routes.BOOKS, routes.REQUESTS, routes.ROLES];

  const navLinks = [
    { icon: IconDeviceDesktopAnalytics, label: 'Dashboard' },
    { icon: IconBookUpload, label: 'Book Requests' },
    { icon: IconUser, label: 'User Roles' },
  ];

  const handleNavigate = (index: number) => {
    navigate(navRoute[index]);
  };

  const links = navLinks.map((link, index) => {
    const { icon, label } = link;

    return (
      <NavbarLink
        key={label}
        active={location.pathname === navRoute[index]}
        icon={icon}
        label={label}
        onClick={() => handleNavigate(index)}
      />
    );
  });

  const handleLogout = () => {
    logout();
    swal('LOGOUT', 'You have logged out.', SweetAlertEnum.SUCCESS);
  };

  return (
    <Navbar p="md" width={{ base: 80 }}>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}

export default LibraryNavbar;
