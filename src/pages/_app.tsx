import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider, useCreateStore } from "../store/store";
import { api } from "../utils/api";
import "../styles/globals.css";
import { NextComponentType } from "next";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}: { Component: NextComponentType, pageProps?: any }) => {
  const createStore = useCreateStore(pageProps.initState);
  return (
    <Provider createStore={createStore}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
