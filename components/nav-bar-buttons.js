"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { LoginButton } from "../components/buttons/login-button";
import { LogoutButton } from "../components/buttons/logout-button";
import { SignupButton } from "../components/buttons/signup-button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { convertUrlString } from "../utils/helper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const NavBarButtons = () => {
  const { user } = useUser();
  const [profileLink, setProfileLink] = useState("");

  useEffect(() => {
    if (user) {
      supabase
        .from("accounts")
        .select("*")
        .eq("userId", user?.sub)
        .single()
        .then((response) => {
          return response.data;
        })
        .then((data) =>
          setProfileLink(
            `${data.id.toString()}-${convertUrlString(data?.name)}`
          )
        );
    }
  }, [user]);

  return (
    <div className=" p-4 sm:p-1 flex flex-col justify-end sm:flex-row gap-2">
      {!user && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {user && (
        <div className="flex gap-2 ">
          <LogoutButton />
          <Link href={`/profile/${profileLink}`} className="inline-block">
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full h-10 w-10 object-cover"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
