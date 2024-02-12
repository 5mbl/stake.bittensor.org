import Link from "next/link";
import TagSEO from "@/components/TagSEO";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data

// 1. Go to https://app.chatgpt.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)

// You are an excellent layer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

const TOS = () => {
  return (
    <div className="max-w-xl mx-auto">
      <TagSEO
        title={`Terms and Conditions | ${config.appName}`}
        canonicalSlug="tos"
      />

      <div className="p-5">
        <Link href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </Link>
        <h1 className="text-3xl font-bold pb-6">
          Terms of services for Bittensor Staking App
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Legal Disclaimer

This software is not affiliated with the Opentensor Foundation and is accepted “as is” with no representation or warranty of any kind. By using this software and all the services it provides, the consumer acknowledges that the “authors” of this software, shall NOT be held liable for any loss of funds. 

The authors have no obligation to indemnify, defend, or hold harmess consumer, including without limitation against claims related to liability or infringement of intellectual property rights. 

This software is NOT audited and the consumer accepts wholly the responsibilities associated with any risks incurred`}
        </pre>
      </div>
    </div>
  );
};

export default TOS;
