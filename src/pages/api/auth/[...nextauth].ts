import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "@/lib/mongodb";

//? Opciones de NextAuth para agregar uno o más proveedores de autenticación 
const authOptions: AuthOptions = {
  //* Adapter que guarda el usuario de la sesion de github iniciada en mongo, agregando
  //* las colecciones accounts, sessions y users.
  adapter: MongoDBAdapter(clientPromise),
  //* Agregando proveedor de github para autenticacion y añadir el id de cliente e id secreto
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    //* Proveedor de google usado como prueba para leerlo con getProviders()
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
};


//? Exportando configuracion de modulo de NextAuth 
export default NextAuth(authOptions);