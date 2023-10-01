import { createClient } from "@supabase/supabase-js";
import { convertUrlString } from "../../../utils/helper";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Page({ params }) {
  return <div>My Post: {params.id}</div>;
}

export async function generateStaticParams() {
  const { data: accounts, error } = await supabase.from("accounts").select("*");

  if (error) throw error;

  return accounts.map((account) => ({
    params: { id: `${account.id.toString()}-${convertUrlString(account?.name)}` },
  }));
}
