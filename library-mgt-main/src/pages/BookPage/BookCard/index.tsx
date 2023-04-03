import {
  createStyles,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Flex,
} from '@mantine/core';
import { IconFileDescription } from '@tabler/icons-react';

import BookStatus from '../../../enums/BookStatus.enum';

import { Book } from '../../../types/Book.type';

const useStyles = createStyles((theme) => ({
  bottomSection: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
  },

  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    display: 'flex',
    flexDirection: 'column',
  },

  details: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    height: '15vh',
    justifyContent: 'start',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    height: '3rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  topSection: {
    background: theme.colors.blue[0],
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
  },

}));

type Props = {
  book: Book;
  onOpen: (book?: Book | null, isEdit?: boolean) => void;
};

function BookCard(props: Props) {
  const { book, onOpen } = props;
  const { classes } = useStyles();

  return (
    <Card withBorder className={classes.card} padding="lg" radius="md">
      <Card.Section className={classes.topSection} mb="sm">
        <Image alt={book.title} fit="contain" height={180} src={book.imageUrl} />
      </Card.Section>
      <Card.Section className={classes.bottomSection}>
        <div className={classes.details}>
          <Flex gap="sm" wrap="wrap">
            <Badge>{book.bookType}</Badge>
            <Badge color={book.status === BookStatus.AVAILABLE ? 'green' : 'red'}>{book.status}</Badge>
          </Flex>
          <Text className={classes.title} fw={700} mt="xs">
            {book.title}
          </Text>
        </div>
        <Button
          color="blue"
          leftIcon={<IconFileDescription color="black" />}
          my="sm"
          variant="light"
          onClick={() => onOpen(book)}
        >
          View Details
        </Button>
      </Card.Section>
    </Card>
  );
}

export default BookCard;
