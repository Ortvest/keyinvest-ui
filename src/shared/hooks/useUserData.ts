// export interface UserData {
//   uid: string;
//   name: string | null;
//   email: string | null;
//   avatar: string | null;
//   token: string;
// }

// import { useEffect, useState } from 'react';

// export const useUserData = (): UserData | null => {
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const savedUserData = localStorage.getItem('userData');
//     if (savedUserData) {
//       setUserData(JSON.parse(savedUserData));
//     }
//   }, []);

//   return userData;
// };
