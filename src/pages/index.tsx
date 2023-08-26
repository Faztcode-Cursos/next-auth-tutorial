import {  useRouter } from "next/router";
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { Raleway } from 'next/font/google'

import { Session } from 'next-auth';
import { getSession, GetSessionParams, signOut } from "next-auth/react";

interface PageProps {
  session: Session;
}

const raleway = Raleway({ subsets: ["latin"] });

export default function Home({ session }: PageProps) {
  // const { data: session, status } = useSession();

  console.log(session);

  return (
    <div className={raleway.className}>
      {session ? (
        <>
          <h1>{session?.user?.name}</h1>
          <p>{session?.user?.email}</p>
          <Image
            src={session?.user?.image as string}
            width="200"
            height="200"
            alt={session?.user?.name as string}
          />
        </>
      ) : (
        <p>Skeleton</p>
      )}

      <button
        onClick={() => signOut()}
        className="bg-black text-white px-5 py-2 m-5 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSideProps<PageProps>) => {
  //* Para obtener la info del usuario desde el servidor se pasa el contexto 
  const session = await getSession(context as GetSessionParams);

  //* Si no hay una sesion o no está autenticado redireccionamos a la página /login 
  if (!session) return {
    redirect: {
      destination: "/login",
      permament: false,
    }
  }

  return {
    props: {
      session,
    },
  };
};
