import AccountContext from "./AccountContext";
import React from "react";
import Image from "next/image";
import { convertUrlString } from "../../utils/helper";
import Link from "next/link";

export default function AccountList() {
  const { accounts } = React.useContext(AccountContext);
  return (
    <div className="grid grid-cols-3 gap-4 mt-4 mb-2">
      {accounts.map((account, index) => (
        <div key={index} className="border p-4 rounded text-white shadow-lg">
          <Link
            href={`/profile/${account.id.toString()}-${convertUrlString(
              account?.name
            )}`}
          >
            <div className="flex justify-between">
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
          </Link>

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
          <p className="font-semibold text-lg mt-2">Contact</p>
          <a
            href={account.contact}
            className="text-blue-200 underline break-words whitespace-pre-wrap text-xs"
          >
            {account.contact}
          </a>
        </div>
      ))}
    </div>
  );
}
