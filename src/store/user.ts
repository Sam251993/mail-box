import create from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../utils/interfaces';

export interface UserStore {
  users: User[],
  addUser: (user: User) => void
  addUsers: (usersList: User[]) => void
  
}

const useUser = create(
  persist<UserStore>(
    (set, get) => ({
      users: [],
      addUser: (user: User) => {
        set((state) => {
          state.users.push(user);
          return state;
        });
      },
      addUsers: (usersList: User[]) => {
        set((state) => {
          state.users = usersList;
          return state;
        });
      }
    }),
    { name: 'user' }
  )
);
export default useUser;