import { toast } from "react-hot-toast";
import AccountContext from "./AccountContext";
import React from "react";
import { convertUrlString } from "../../utils/helper";

export default function EditProfile() {
  const {
    userHasProfile,
    setAccount,
    accounts,
    setShowForm,
    user,
    showForm,
    account,
  } = React.useContext(AccountContext);

  console.log("🚀 ~ file: EditProfile.js:8 ~ EditProfile ~ account:", account);
  return (
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
              toast.error(
                "You must be logged in to create or update a profiel.",
                { position: "bottom-right" }
              );
              return;
            }
            setShowForm(!showForm);
          }}
        >
          Add Your Profile
        </button>
      )}
      <button
        className="bg-second py-2 px-4 rounded text-white"
        onClick={async () => {
          const url = `${
            window.location.origin
          }/profile/${account?.id?.toString()}-${convertUrlString(
            account?.name
          )}`;
          await navigator.clipboard.writeText(url);
          toast.success("Link copied to clipboard",{position:"bottom-right"});
        }}
      >
        Copy Profile Link
      </button>
    </div>
  );
}
