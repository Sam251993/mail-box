import type { GetServerSideProps, InferGetStaticPropsType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import MainGrid from "../layouts/grid/grid";
import { useStore } from "../store/store";
import { api } from "../utils/api";

export default function Layout() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  // if(router.query?.slug?.[0] === 'inbox') {
    const { data } = api.example.getUsers.useQuery(
      undefined, // no input
      { enabled: sessionData?.user !== undefined && router.query?.slug?.[0] === 'inbox' },
    );
    console.log(data, 'data trpc');
    
    const { users, setUsers } = useStore(
      (store) => {
        return {
          users: store.users,
          setUsers: store.setUsers
        }
      },
      shallow
    );
    if(data) {
      setUsers(data);
    }
  // }

  return (
    <MainGrid />
  )
}
// export async function getStaticPaths() {

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths: [
//     { params: { slug: []}}
//   ], fallback: true }
// }

// This also gets called at build time
// export const getServerSideProps: GetServerSideProps<{ [key: string]: Partial<InitialState> }> = async ({ params, req }) => {
//   let users: User[] = [];
//   if(params?.slug?.[0] === 'inbox') {
//     users = await getUsers(`${req.headers.referer}/api/users`) || [];
//   }
//   // const zustandStore = initializeStore();
//   // zustandStore.getState().setUsers(users);
//   return {
//     props: {
//       initState: {
//         users,
//         messages: [],
//         activeConversation: {} as User
//       }
//     }
//   }
// }