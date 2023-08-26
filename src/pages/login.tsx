import { useRouter } from "next/router";

import { signIn, useSession, getProviders } from "next-auth/react";
import { useEffect } from "react";

const Login = () => {
  const router = useRouter();
  const { status } = useSession();
  


  useEffect(() => {
    if (status !== "loading" && status === "authenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    (async () => {
      //* Lista los proveedores de autenticación que estemos usando 
      const providers = await getProviders();
      // console.log(providers);
    })();
  }, []);
  

  return (
    <div>
      <button
        onClick={() => signIn("github")}
        className="bg-black text-white px-5 py-2 m-5 rounded-lg"
      >
        Signin with github
      </button>
    </div>
  );
};


export default Login;
