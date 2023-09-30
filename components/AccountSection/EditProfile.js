import AccountContext from './AccountContext';
import React from 'react';

export default function EditProfile() {
    const { userHasProfile, setAccount, accounts, setShowForm, user, showForm } = React.useContext(AccountContext);
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
  );
}
