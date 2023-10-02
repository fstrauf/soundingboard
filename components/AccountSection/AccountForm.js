import AccountContext from "./AccountContext";
import React from "react";
import { animated } from "react-spring";
import FormField from "../FormField";
import Creatable from "react-select/creatable";
import Image from "next/image";

export default function AccountForm() {
  const {
    transitions,
    setAccount,
    formRef,
    account,
    handleExpertiseChange,
    handleNicheExpertiseChange,
    handlePastWorkChange,
    handleFileChange,
    createOrUpdateAccount,
    showForm
  } = React.useContext(AccountContext);
  return (
    <>
      <div className="p-6">
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm"></div>
        )}
        {transitions((style, item) =>
          item ? (
            <animated.div
              style={style}
              ref={formRef}
              className="flex flex-col gap-3 w-full md:w-2/5 mt-4 absolute right-0 bg-third border-second border-2 md:border-r-0 rounded-md md:rounded-l-md p-2 sm:p-4 shadow-lg"
            >
              <FormField label="Name" text="Enter your full name">
                {" "}
                <input
                  className="border p-2 rounded w-full h-12 items-center text-sm"
                  value={account.name}
                  onChange={(e) =>
                    setAccount({ ...account, name: e.target.value })
                  }
                  placeholder="Name"
                />
              </FormField>

              <FormField label="Contact" text="How can people get in touch?">
                <input
                  className="border p-2 rounded w-full h-12 items-center text-sm"
                  value={account.contact}
                  onChange={(e) =>
                    setAccount({ ...account, contact: e.target.value })
                  }
                  placeholder="Contact"
                />
              </FormField>
              <FormField
                label="Trained Expertise"
                text="What are the main things you are good at?"
              >
                <Creatable
                  isMulti
                  onChange={handleExpertiseChange}
                  placeholder="Trained Expertise"
                  value={account.trained_expertise}
                />
              </FormField>
              <FormField
                label="Niche Expertise"
                text="What else do you know really well?"
              >
                <Creatable
                  isMulti
                  onChange={handleNicheExpertiseChange}
                  placeholder="Niche Expertise"
                  value={account.niche_expertise}
                />
              </FormField>
              <FormField label="Past Work" text="Link some past projects">
                <Creatable
                  isMulti
                  onChange={handlePastWorkChange}
                  placeholder="Past Work"
                  value={account.past_work}
                />
              </FormField>
              <FormField label="Rate" text="How much do you charge?">
                {" "}
                <input
                  className="border p-2 rounded w-3/4 h-12 items-center text-sm"
                  value={account.rate}
                  onChange={(e) =>
                    setAccount({ ...account, rate: e.target.value })
                  }
                  placeholder="Rate"
                />
              </FormField>

              <div className="flex md:flex-row flex-col gap-3">
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
                Save
              </button>
            </animated.div>
          ) : null
        )}
      </div>
    </>
  );
}
