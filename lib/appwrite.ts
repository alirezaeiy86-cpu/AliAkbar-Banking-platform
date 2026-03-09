"use server";
// src/server/appwrite.js

import { Client, Account,Databases,Users } from "node-appwrite";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { get } from "http";
import { User } from "lucide-react";

// The name of your cookie that will store the session
 const SESSION_COOKIE = "appwrite-session";

// Admin client, used to create new accounts
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!); // Set the API key here!

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
    get Database(){
        return new Databases(client);
    },
    get user(){
        return new Users(client);
    }
  };
}

// Session client, used to make requests on behalf of the logged in user
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  // Get the session cookie from the request and set the session
//   const cookies = parseCookies(request.headers.get("cookie")
//  ?? "");
    const cookiesStore =await cookies();
  const session = cookiesStore.get(SESSION_COOKIE);
  if (!session) {
    throw new Error("Session cookie not found");
  }

  client.setSession(session.value);

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}

// Helper function to parse cookies
function parseCookies(cookies:string | null | undefined) {
  const map = new Map<string, string | null>();
  if(!cookies) return map;
  for (const cookie of cookies.split(";")) {
    const [name, value] = cookie.split("=");
    map.set(name.trim(), value ?? null);
  }
  return map;
}
