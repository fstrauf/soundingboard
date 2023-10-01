"use client";
import { useState, useEffect, useRef } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useTransition } from "react-spring";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Toaster, toast } from "react-hot-toast";
import AccountContext from "./AccountContext";
import EditProfile from "./EditProfile";
import AccountForm from "./AccountForm";
import AccountList from "./AccoutList";

export default function AccountSection() {
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
    from: { transform: "translateX(100%)", opacity: 0 },
    enter: { transform: "translateX(0)", opacity: 1 },
    leave: { transform: "translateX(100%)", opacity: 0 },
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
  }, [user]);

  async function fetchAccounts() {
    const { data, error } = await supabase.from("accounts").select("*");

    if (error) console.log("Error: ", error);
    else {
      setAccounts(data);
      if (user) {
        setUserHasProfile(data.some((account) => account.userId === user?.sub));
      }
    }
  }

  async function createOrUpdateAccount() {
    const { data, error } = await supabase
      .from("accounts")
      .upsert([account])
      .select();

    if (error) toast.error(error, { position: "bottom-right" });
    else {
      const updatedAccounts = accounts.map((account) =>
        account.userId === user.sub ? data[0] : account
      );
      setAccounts(updatedAccounts);
      //   setAccount({ name: "", contact: "", trained_expertise: [] });
      setShowForm(false);
      toast.success("Changes saved", { position: "bottom-right" });
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

    setAccount({ ...account, profilePicLink: publicURL?.data?.publicUrl });
  }

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        userHasProfile,
        accounts,
        setAccounts,
        setShowForm,
        user,
        showForm,
        transitions,
        formRef,
        handleExpertiseChange,
        handleNicheExpertiseChange,
        handlePastWorkChange,
        handleFileChange,
        createOrUpdateAccount,
      }}
    >
      <div className="p-6">
        <Toaster />
        <EditProfile />
        <AccountForm />
        <AccountList />
      </div>
    </AccountContext.Provider>
  );
}
