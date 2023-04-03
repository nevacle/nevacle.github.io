/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUserDetails,
  UserCredential,
} from 'firebase/auth';
import {
  addDoc, getDocs, query, where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import swal from 'sweetalert';

import { LibraryLoader } from '../components';

import { auth } from '../configs/firebaseConfig';
import { userRef } from '../constants/firebaseRefs';
import AccountType from '../enums/AccountType.enum';
import SweetAlertEnum from '../enums/SweetAlert.enum';
import { LibraryUser } from '../types/User.type';
import createGenericContext from '../utils/Context';

type UserContextType = {
  login: (email: string, password: string) => Promise<UserCredential | undefined>,
  logout: () => void,
  register: (email: string, password: string, accountType: AccountType) => Promise<UserCredential | undefined>,
  reset: (email: string) => void,
  verify: (user: FirebaseUserDetails) => void,
  firebaseUserDetails?: FirebaseUserDetails | null;
  loadingFirebaseUserDetails: boolean;
  loadingUserDetails: boolean;
  userDetails: LibraryUser | null;
  setUserDetails: (params: LibraryUser) => void;
};

interface Props {
  children: React.ReactNode;
}

const [useAuth, AuthContextProvider] = createGenericContext<UserContextType>();

function AuthProvider(props: Props) {
  const { children } = props;
  const [firebaseUserDetails, loadingFirebaseUserDetails] = useAuthState(auth);
  const [userDetails, setUserDetails] = useState<LibraryUser | null>(null);
  const [loadingUserDetails, setLoadingUserDetails] = useState<boolean>(true);

  useEffect(() => {
    async function getUserProfileDetails() {
      setLoadingUserDetails(true);

      if (firebaseUserDetails) {
        const q = query(userRef, where('uid', '==', firebaseUserDetails.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const { accountType, email, uid } = doc.data();

          setUserDetails({
            accountType,
            email,
            uid,
          });
        });
      } else {
        setUserDetails(null);
      }

      setLoadingUserDetails(false);
    }

    getUserProfileDetails();
  }, [firebaseUserDetails, loadingFirebaseUserDetails]);

  async function saveUserToDB(
    email: string,
    uid: string,
    accountType: AccountType,
  ) {
    try {
      const docRef = await addDoc(userRef, {
        accountType,
        email,
        uid,
      });

      if (docRef) {
        console.log('Successfully saved to DB');
      }
    } catch (e) {
      console.log('Failed to save to DB');
    }
  }

  const register = async (
    email: string,
    password: string,
    accountType: AccountType,
  ): Promise<UserCredential | undefined> => {
    try {
      const createUserWithEmailResponse = await createUserWithEmailAndPassword(auth, email, password);

      if (createUserWithEmailResponse.user) {
        swal('SIGN UP', 'Successfully created an account!', SweetAlertEnum.SUCCESS);

        await saveUserToDB(email, createUserWithEmailResponse.user.uid, accountType);

        return createUserWithEmailResponse;
      }
    } catch (e) {
      swal('SIGN UP', 'Failed to register account.', SweetAlertEnum.ERROR);
    }
  };

  const verify = async (user: FirebaseUserDetails) => {
    try {
      await sendEmailVerification(user);
      swal('Verification', 'We have sent a verification link to your email! Please open it to verify your account.', SweetAlertEnum.SUCCESS);
    } catch (e) {
      swal('Verification', 'Failed to send email verification.', SweetAlertEnum.ERROR);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const login = async (email: string, password: string): Promise<UserCredential | undefined> => {
    try {
      const signInWithEmailResponse = await signInWithEmailAndPassword(auth, email, password);

      if (signInWithEmailResponse && signInWithEmailResponse.user.emailVerified) {
        swal('LOG IN', 'Successfully signed in.', SweetAlertEnum.SUCCESS);

        return signInWithEmailResponse;
      } if (signInWithEmailResponse && !signInWithEmailResponse.user.emailVerified) {
        swal('LOG IN', 'Your account has not been verified yet. Please check your email.', SweetAlertEnum.WARNING);
        logout();
      }
    } catch (e) {
      swal('LOG IN', 'Invalid user credentials.', SweetAlertEnum.ERROR);
    }
  };

  const reset = async (email: string) => {
    try {
      const resetResponse = await sendPasswordResetEmail(auth, email);
      swal('Reset Password', 'Successfully sent reset password to email.', SweetAlertEnum.SUCCESS);

      return resetResponse;
    } catch (e) {
      swal('Reset Password', 'Failed to send reset password to email.', SweetAlertEnum.ERROR);
    }
  };

  function getValues(): UserContextType {
    return {
      firebaseUserDetails,
      loadingFirebaseUserDetails,
      loadingUserDetails,
      login,
      logout,
      register,
      reset,
      setUserDetails,
      userDetails,
      verify,
    };
  }

  return (
    <AuthContextProvider value={getValues()}>
      {loadingUserDetails ? <LibraryLoader /> : children}
    </AuthContextProvider>
  );
}

export { AuthProvider, useAuth };
