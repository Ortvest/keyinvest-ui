import { useEffect, useState } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

import '@shared/config/style-config.css';

import { useGetMeQuery } from '@global/api/auth/auth.api';

function App(): JSX.Element {
  const [authed, setAuthed] = useState(false);
  const { data, error } = useGetMeQuery();

  useEffect(() => {
    if (data) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, [data, error]);

  const currentRouter = router(authed);

  return <RouterProvider router={currentRouter} />;
}

export default App;
