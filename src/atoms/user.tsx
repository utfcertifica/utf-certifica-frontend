import type { User } from '@models/user';
import { atom } from 'jotai';

const usersAtom = atom<User[]>([]);

export default usersAtom;
