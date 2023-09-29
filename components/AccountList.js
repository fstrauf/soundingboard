"use client";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSpring, animated } from "react-spring";
import Creatable from "react-select/creatable";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function AccountList() {
  const { user } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userHasProfile, setUserHasProfile] = useState(false);
  const [account, setAccount] = useState({
    name: "",
    contact: "",
    trained_expertise: [],
    niche_expertise: [],
    userId: user?.sub,
    rate: "",
    past_work: [],
  });

  const formAnimation = useSpring({
    transform: showForm ? "translateX(0)" : "translateX(100%)",
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    const { data, error } = await supabase.from("accounts").select("*");
    if (error) console.log("Error: ", error);
    else {
      setAccounts(data);
      setUserHasProfile(data.some((account) => account.userId === user?.sub));
    }
  }

  async function createOrUpdateAccount() {
    // if (!user) {
    //   alert("You must be logged in to create or update an account.");
    //   return;
    // }

    const { data, error } = await supabase
      .from("accounts")
      .upsert([account])
      .select();

    if (error) console.log("Error: ", error);
    else {
      const updatedAccounts = accounts.map((account) =>
        account.userId === user.sub ? data[0] : account
      );
      setAccounts(updatedAccounts);
      //   setAccount({ name: "", contact: "", trained_expertise: [] });
      setShowForm(false);
    }
  }

  const handleExpertiseChange = (newValue, actionMeta) => {
    setAccount({ ...account, trained_expertise: newValue });
  };

  const handleNicheExpertiseChange = (newValue, actionMeta) => {
    setAccount({ ...account, niche_expertise: newValue });
  };

  const handlePastWorkChange = (newValue, actionMeta) => {
    setAccount({ ...account, past_work: newValue });
  };

  return (
    <div className="p-6">
      <div className="flex gap-3">
        {" "}
        {userHasProfile ? (
          <button
            className="bg-second py-2 px-4 rounded text-white"
            onClick={() => {
              const currentUserAccount = accounts.find(
                (account) => account.userId === user?.sub
              );
              setAccount(currentUserAccount);
              setShowForm(true);
            }}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className="bg-second py-2 px-4 rounded text-white"
            onClick={() => {
              if (!user) {
                alert("You must be logged in to create or update an account.");
                return;
              }
              setShowForm(!showForm);
            }}
          >
            Add Your Profile
          </button>
        )}
      </div>

      {showForm && (
        <animated.div
          style={formAnimation}
          className="flex flex-col gap-3 w-1/3 mt-4 absolute mr-1 -right-2 bg-third border-second border-2 rounded-lg p-4 shadow-lg"
        >
          <input
            className="border p-2 rounded"
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
            placeholder="Name"
          />
          <input
            className="border p-2 rounded"
            value={account.contact}
            onChange={(e) =>
              setAccount({ ...account, contact: e.target.value })
            }
            placeholder="Contact"
          />
          <Creatable
            isMulti
            onChange={handleExpertiseChange}
            placeholder="Trained Expertise"
            value={account.trained_expertise}
          />
          <Creatable
            isMulti
            onChange={handleNicheExpertiseChange}
            placeholder="Niche Expertise"
            value={account.niche_expertise}
          />
          <Creatable
            isMulti
            onChange={handlePastWorkChange}
            placeholder="Past Work"
            value={account.post_work}
          />
          <input
            className="border p-2 rounded"
            value={account.rate}
            onChange={(e) => setAccount({ ...account, rate: e.target.value })}
            placeholder="Rate"
          />
          <button
            className="bg-first py-2 px-4 rounded text-third"
            onClick={createOrUpdateAccount}
          >
            Submit
          </button>
        </animated.div>
      )}
      <div className="grid grid-cols-3 gap-4 mt-4 mb-2">
        {accounts.map((account, index) => (
          <div key={index} className="border p-4 rounded text-white shadow-lg">
            <h2 className="font-bold text-2xl mb-2">{account.name}</h2>
            <a
              href={account.contact}
              className="text-blue-200 underline break-words whitespace-pre-wrap text-xs"
            >
              {account.contact}
            </a>
            <p className="font-semibold text-lg mt-2">Trained Expertise</p>
            <ul className="list-disc list-inside">
              {account?.trained_expertise?.map((trained_expertise, index) => (
                <li key={index} className="text-gray-300">
                  {trained_expertise.label}
                </li>
              ))}
            </ul>
            <p className="font-semibold text-lg mt-2">Niche Expertise</p>
            <ul className="list-disc list-inside">
              {account?.niche_expertise?.map((niche_expertise, index) => (
                <li key={index} className="text-gray-300">
                  {niche_expertise.label}
                </li>
              ))}
            </ul>
            <p className="font-semibold text-lg mt-2">Past Work</p>
            <ul className="list-inside">
              {account?.past_work?.map((past_work, index) => (
                <li key={index} className="text-gray-300">
                  <a
                    href={past_work.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-200 underline break-words whitespace-pre-wrap text-xs"
                  >
                    {past_work.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="font-semibold text-lg mt-2">Rate</p>
            <p>{account.rate}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
