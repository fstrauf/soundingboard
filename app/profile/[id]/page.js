"use client";
import { createClient } from "@supabase/supabase-js";
import { convertUrlString } from "../../../utils/helper";
import ProfilePage from "./ProfilePage";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Page({ params }) {
  console.log("🚀 ~ file: page.js:13 ~ Page ~ params:", params);

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const { data: account, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", params?.id?.split("-")[0])
        .single();

      if (error) console.error(error);
      else setAccount(account);
    };

    fetchAccount();
  }, []);

  if (!account) return <div className="bg-third text-white">Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-third">
      <ProfilePage account={account} />
    </div>
  );
}

export async function generateStaticParams() {
  const { data: accounts, error } = await supabase.from("accounts").select("*");

  if (error) throw error;

  return accounts.map((account) => ({
    params: {
      id: `${account.id.toString()}-${convertUrlString(account?.name)}`,
    },
  }));
}
