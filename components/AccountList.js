"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseClient";
import { useSpring, animated, useTransition } from "react-spring";
import Creatable from "react-select/creatable";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Toaster, toast } from "react-hot-toast";
import Image from "next/image";

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
    profilePicLink: "",
  });

  const formRef = useRef();

  const transitions = useTransition(showForm, {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0)', opacity: 1 },
    leave: { transform: 'translateX(100%)', opacity: 0 },
  });

  useEffect(() => {
    fetchAccounts();

    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  async function handleFileChange(event) {
    const file = event.target.files[0];
    const filePath = `${account.id}.${file.name.split(".").pop()}`;

    let { error, data } = await supabase.storage
      .from("profile-pics")
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      console.error("Error uploading file:", error);
      toast("Image upload failed, please try again", {
        position: "bottom-right",
      });
      return;
    }

    console.log("Upload data:", data);

    // Get the URL of the uploaded file
    let publicURL = supabase.storage
      .from("profile-pics")
      .getPublicUrl(filePath);

    console.log(
      "🚀 ~ file: AccountList.js:94 ~ handleFileChange ~ publicURL:",
      publicURL
    );

    setAccount({ ...account, profilePicLink: publicURL?.data?.publicUrl });
  }

  return (
    <div className="p-6">
      <Toaster />
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

      {transitions((style, item) =>
        item ? (
          <animated.div
            style={style}
            ref={formRef}
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
            <div className="flex">
              {" "}
              <div className="flex flex-col">
                <p className="text-white">Profile Pic</p>
                <input type="file" onChange={handleFileChange} />
              </div>
              {account.profilePicLink && (
                <Image
                  src={account?.profilePicLink}
                  alt="Profile"
                  width={64}
                  height={64}
                  className="rounded-full h-16 w-16 object-cover"
                />
              )}
            </div>
            <button
              className="bg-first py-2 px-4 rounded text-third"
              onClick={createOrUpdateAccount}
            >
              Submit
            </button>
          </animated.div>
        ) : null
      )}
      <div className="grid grid-cols-3 gap-4 mt-4 mb-2">
        {accounts.map((account, index) => (
          <div key={index} className="border p-4 rounded text-white shadow-lg">
            <div className="flex">
              <h2 className="font-bold text-2xl mb-2">{account.name}</h2>
              {account.profilePicLink ? (
                <>
                  {" "}
                  <Image
                    src={account?.profilePicLink}
                    alt="Profile"
                    width={64}
                    height={64}
                    className="rounded-full h-16 w-16 object-cover"
                  />
                </>
              ) : (
                <div className="rounded-full h-16 w-16 object-cover bg-slate-300"></div>
              )}
            </div>

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
