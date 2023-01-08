import { Comment, User } from "@prisma/client";
import { useLayoutEffect } from "react";
import create, { UseBoundStore } from "zustand";
import createContext from "zustand/context";
import { combine } from "zustand/middleware";

let store: any;

export type InitialState = ReturnType<typeof getDefaultInitialState>;
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseBoundStore<infer T>
  ? T
  : never;

const blankConversation = {
  count: 0,
  messages: [] as Comment[],
  activeConversation: {} as User,
}

export const getDefaultInitialState = () => ({
  users: [] as User[],
  activeUser: {
    id: '1',
    email: 'biosam@gmail.com',
    name: 'Sam',
    password: '123456'
  } as User,
  count: blankConversation.count,
  messages: blankConversation.messages,
  activeConversation: blankConversation.activeConversation,
  blankConversation: {...blankConversation}
});


export const initializeStore = (preloadedState = {}) => {
  return create(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
      resetConversation: (convesation = '') => {
        if(!convesation) {
          set({...blankConversation});
        } else {
          set({
            blankConversation: {...blankConversation},
          });
        }
      },
      setUsers: (users: User[]) => {
        set({
          users,
        });
      },
      setCount: (count: number) => {
        set({
          count,
        });
      },
      setActiveConversation: (convWith: User) => {
        set({
          activeConversation: convWith,
        });
      },
      setMessages: (messages: Comment[]) => {
        set(() => {
          messages.forEach(msg => {
            msg.from_email = msg.from_email || msg.email;
            msg.date = new Date(msg.date);
          });
          messages = messages.sort((a, b) => a.date.getTime() - b.date.getTime());
          return { messages };
        });
      },
      setMessage: (message: Comment, conversation = '') => {
        set(
          (store) => {
            message.date = new Date(message.date);
            if(conversation) {
              return {blankConversation: {...store.blankConversation, messages: [...store.blankConversation.messages, message]}, }
            }
            return {messages: [...store.messages, message]};
          }
        )
      }
    }))
  );
};

const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;
export const useCreateStore = (serverInitialState: InitialState) => {
  // For SSR & SSG, always use a new store.
  if (typeof window === "undefined") {
    return () => initializeStore(serverInitialState);
  }

  const isReusingStore = Boolean(store);
  // For CSR, always re-use same store.
  store = store ?? initializeStore(serverInitialState);
  // And if initialState changes, then merge states in the next render cycle.
  //
  // eslint complaining "React Hooks must be called in the exact same order in every component render"
  // is ignorable as this code runs in same order in a given environment
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    // serverInitialState is undefined for CSR pages. It is up to you if you want to reset
    // states on CSR page navigation or not. I have chosen not to, but if you choose to,
    // then add `serverInitialState = getDefaultInitialState()` here.
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          // re-use functions from existing store
          ...store.getState(),
          // but reset all other properties.
          ...serverInitialState,
        },
        true // replace states, rather than shallow merging
      );
    }
  });

  return () => store;
};
