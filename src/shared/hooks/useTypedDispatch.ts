
import type { AppDispatch } from '@global/store';

import { useDispatch } from 'react-redux';

export const useTypedDispatch: () => AppDispatch = useDispatch;
