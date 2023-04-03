import {
  Paper, Table, Text, Select,
} from '@mantine/core';
import { IconUserEdit } from '@tabler/icons-react';
import {
  doc, getDocs, query, updateDoc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import { LibraryLoader, PageContainer } from '../../components';
import { db } from '../../configs/firebaseConfig';
import { userRef } from '../../constants/firebaseRefs';
import routes from '../../constants/routes';
import { useAuth } from '../../contexts/AuthContext';
import AccountType from '../../enums/AccountType.enum';
import SweetAlertEnum from '../../enums/SweetAlert.enum';
import { LibraryUser } from '../../types/User.type';

function RolesPage() {
  const { userDetails } = useAuth();
  const isUserAdmin = userDetails?.accountType === AccountType.ADMIN;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStatusUpdated, setIsStatusUpdated] = useState<boolean>(false);
  const [libraryUsers, setLibraryUsers] = useState<LibraryUser[]>();
  const navigate = useNavigate();

  if (!isUserAdmin) {
    navigate(routes.HOME);
  }

  useEffect(() => {
    async function fetchRequests() {
      setIsLoading(true);

      const q = query(userRef);

      const data = await getDocs(q);

      setLibraryUsers(data.docs.map((doc) => ({ ...doc.data(), documentID: doc.id }) as LibraryUser));

      setIsLoading(false);
    }

    fetchRequests();
  }, [isStatusUpdated]);

  async function saveRole(id: string, accountType: AccountType) {
    try {
      await updateDoc(doc(db, 'user', id), { accountType });

      swal('Update', 'Successfully changed role', SweetAlertEnum.SUCCESS);

      setIsStatusUpdated(!isStatusUpdated);
    } catch (e) {
      swal('Update', 'Failed to change role', SweetAlertEnum.ERROR);
    }
  }

  async function handleConfirm(id: string, accountType: AccountType) {
    const isConfirmed = await swal('Are you sure?', {
      buttons: {
        cancel: true,
        confirm: true,
      },
    });

    if (isConfirmed) {
      saveRole(id, accountType);
    }
  }

  const renderLoader = isLoading && <LibraryLoader />;

  const rows = libraryUsers && libraryUsers.length > 0 ? libraryUsers.map((row) => (
    <tr key={row.documentID}>
      <td>{row.email}</td>
      <td>{row.uid}</td>
      <td>
        <Select
          data={[AccountType.STUDENT, AccountType.ADMIN]}
          icon={<IconUserEdit color="#2148C0" />}
          placeholder="Your account type"
          value={row.accountType}
          onChange={(value: AccountType) => handleConfirm(row.documentID ?? '', value)}
        />
      </td>
    </tr>
  )) : (
    <tr>
      <Text color="gray" m="md" size="lg">There are no users at the moment. Please check again at a later time.</Text>
    </tr>
  );

  return (
    <PageContainer shouldShowNavbar={isUserAdmin}>
      <Paper h="90vh" m="xl" p="lg" sx={{ overflow: 'auto' }} w="85vw">
        {renderLoader}
        <Table miw={800} verticalSpacing="xs">
          <thead>
            <tr>
              <th>User</th>
              <th>Account ID</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </PageContainer>
  );
}

export default RolesPage;
