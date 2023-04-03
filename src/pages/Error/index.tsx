import {
  Title, Text, Button, Container, Group, createStyles,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import routes from '../../constants/routes';

const useStyles = createStyles((theme) => ({
  description: {
    color: theme.colors.blue,
    margin: 'auto',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.xl,
    maxWidth: 540,
  },

  label: {
    color: theme.colors.blue,
    fontSize: 220,
    fontWeight: 900,
    lineHeight: 1,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  root: {
    paddingBottom: 120,
    paddingTop: 80,
  },

  title: {
    color: theme.colors.blue,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 38,
    fontWeight: 900,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

}));

export default function ErrorPage() {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(routes.HOME);
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text align="center" className={classes.description} size="lg">
          The page you are looking for may have been moved, deleted, or possibly never existed.
        </Text>
        <Group position="center">
          <Button size="md" variant="white" onClick={handleRefresh}>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
