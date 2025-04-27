import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { RootState } from '@global/store';
import { setAuthStatus, setUserData } from '@global/store/slices/user.slice';

import { router } from '@global/router/router';

import '@shared/config/style-config.css';

import { useGetAuthenticatedUserQuery } from '@global/api/auth/auth.api';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.userReducer.isAuth);
  const authToken = localStorage.getItem('authToken');
  const skip = !authToken;

  const { data, isSuccess } = useGetAuthenticatedUserQuery(undefined, { skip });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUserData(data.user));
      dispatch(setAuthStatus(true));
    }
  }, [isSuccess, data, dispatch]);

  const currentRouter = router(isAuth);

  return <RouterProvider router={currentRouter} />;
}

export default App;
