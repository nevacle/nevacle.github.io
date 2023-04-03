import {
  Button, Paper, Table, Flex, Text,
} from '@mantine/core';
import {
  doc, getDocs, query, updateDoc, where,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import { LibraryLoader, PageContainer } from '../../components';
import { db } from '../../configs/firebaseConfig';
import { requestRef } from '../../constants/firebaseRefs';
import routes from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';
import BookStatus from '../../enums/BookStatus.enum';
import RequestStatus from '../../enums/RequestStatus.enum';
import SweetAlertEnum from '../../enums/SweetAlert.enum';
import { BookRequest } from '../../types/Book.type';

enum ConfirmButtonEnum {
  APPROVE = 'Approve',
  REJECT = 'Reject',
}

type ChangeRequest = {
  bookId: string;
  requestId: string;
};

function RequestPage() {
  const { userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.ADMIN;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);
  const [bookRequests, setBookRequests] = useState<BookRequest[]>();
  const navigate = useNavigate();

  if (!isUserAdmin) {
    navigate(routes.HOME);
  }

  useEffect(() => {
    async function fetchRequests() {
      setIsLoading(true);

      const q = query(requestRef, where('status', '==', RequestStatus.PENDING));

      const data = await getDocs(q);

      setBookRequests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as BookRequest));

      setIsLoading(false);
    }

    fetchRequests();
  }, [isStatusUpdated]);

  async function changeBookDetails(request: ChangeRequest) {
    const newBookDetails = {
      status: BookStatus.UNAVAILABLE,
    };

    await updateDoc(doc(db, 'book', request.bookId), newBookDetails);

    setIsStatusUpdated(!isStatusUpdated);
  }

  async function handleApprove(request: ChangeRequest) {
    try {
      const newRequestDetails = {
        status: RequestStatus.GRANTED,
      };

      await updateDoc(doc(db, 'request', request.requestId), newRequestDetails);
      await changeBookDetails(request);

      swal('Update', 'Successfully approved request', SweetAlertEnum.SUCCESS);
    } catch (e) {
      swal('Update', 'Failed to approve request', SweetAlertEnum.ERROR);
    }
  }

  async function handleReject(request: ChangeRequest) {
    try {
      const newRequestDetails = {
        status: RequestStatus.REJECTED,
      };

      await updateDoc(doc(db, 'request', request.requestId), newRequestDetails);

      setIsStatusUpdated(!isStatusUpdated);

      swal('Update', 'Successfully rejected request', SweetAlertEnum.SUCCESS);
    } catch (e) {
      swal('Update', 'Failed to reject request', SweetAlertEnum.ERROR);
    }
  }

  async function handleConfirm(confirm: string, request: ChangeRequest) {
    await swal(`Would you like to ${confirm.toLowerCase()} this request?`, {
      buttons: {
        cancel: true,
        confirm: true,
      },
    });

    if (confirm === ConfirmButtonEnum.APPROVE) {
      handleApprove(request);
    } else {
      handleReject(request);
    }
  }

  const renderLoader = isLoading && <LibraryLoader />;

  const rows = bookRequests && bookRequests.length > 0 ? bookRequests.map((row) => {
    const requestedBook = {
      bookId: row.bookId,
      requestId: row.id ?? '',
    };

    return (
      <tr key={row.id}>
        <td>{row.bookTitle}</td>
        <td>{row.email}</td>
        <td>
          <Flex align="center" justify="center">
            <Button color="green" mr="sm" onClick={() => handleConfirm(ConfirmButtonEnum.APPROVE, requestedBook)}>
              {ConfirmButtonEnum.APPROVE}
            </Button>
            <Button color="red" onClick={() => handleConfirm(ConfirmButtonEnum.REJECT, requestedBook)}>
              {ConfirmButtonEnum.REJECT}
            </Button>
          </Flex>
        </td>
      </tr>
    );
  }) : (
    <tr>
      <Text color="gray" m="md" size="lg">There are no pending request/s at the moment. Please check again at a later time.</Text>
    </tr>
  );

  return (
    <PageContainer shouldShowNavbar={isUserAdmin}>
      <Paper h="90vh" m="xl" p="lg" sx={{ overflow: 'auto' }} w="85vw">
        {renderLoader}
        <Table miw={800} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Book title</th>
              <th>Borrower</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </PageContainer>
  );
}

export default RequestPage;
