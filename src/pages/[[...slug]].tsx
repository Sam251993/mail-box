import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import shallow from "zustand/shallow";
import MainGrid from "../layouts/grid/grid";
import { useStore } from "../store/store";
import { api } from "../utils/api";

export default function Layout() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { setUsers } = useStore((store) => {
    return {
      setUsers: store.setUsers,
    };
  }, shallow);

  api.user.getUsers.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined && router.query?.slug?.[0] === "inbox",
      onSuccess: (data) => {
        setUsers(data);
      }
    }
  );

  return (
    <>
      {sessionData ? (
        <MainGrid />
      ) : (
        <div>
          <button
            className="rounded-full bg-black px-10 py-3 font-semibold text-white no-underline transition hover:bg-black/30"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      )}
    </>
  );
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
