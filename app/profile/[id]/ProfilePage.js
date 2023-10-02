import React from "react";
import Image from "next/image";
import PageSection from "./PageSection";

export default function ProfilePage({ account }) {
  return (
    <div className="p-4 text-white flex gap-6 flex-col justify-center md:w-1/2 md:m-auto">
      <div className="flex gap-3">
        
      </div>
      <PageSection>
        <div className="flex flex-col w-full items-start">
          {account.profilePicLink ? (
            <>
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
          <h2 className="font-bold text-2xl my-2">{account.name}</h2>
        </div>
      </PageSection>
      <PageSection>
        <p className="font-semibold text-lg mt-2">Trained Expertise</p>
        <ul className="list-disc list-inside">
          {account?.trained_expertise?.map((trained_expertise, index) => (
            <li key={index} className="text-gray-300">
              {trained_expertise.label}
            </li>
          ))}
        </ul>
      </PageSection>
      <PageSection>
        <p className="font-semibold text-lg mt-2">Niche Expertise</p>
        <ul className="list-disc list-inside">
          {account?.niche_expertise?.map((niche_expertise, index) => (
            <li key={index} className="text-gray-300">
              {niche_expertise.label}
            </li>
          ))}
        </ul>
      </PageSection>
      <PageSection>
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
      </PageSection>
      <PageSection>
        <p className="font-semibold text-lg mt-2">Connect</p>
        <p>{account.rate}</p>
        <a
          href={account.contact}
          className="text-blue-200 underline break-words whitespace-pre-wrap text-xs"
        >
          {account.contact}
        </a>
      </PageSection>
    </div>
  );
}
