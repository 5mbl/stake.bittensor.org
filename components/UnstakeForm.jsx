import React, { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

const UnstakeForm = ({ api, selectedValidator, accountAddress, goBack }) => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [unstakingStatus, setUnstakingStatus] = useState("");

  const handleUnstake = async () => {
    if (!selectedValidator || !unstakeAmount) {
      setUnstakingStatus("Please select a validator and enter an amount.");
      return;
    }

    try {
      const unstakeAmountInRAO = (
        parseFloat(unstakeAmount) * 1000000000
      ).toString(); // Convert TAO to RAO

      // Connect to the selected account
      const injector = await web3FromSource(accountAddress.meta.source);
      const tx = api.tx.subtensorModule.removeStake(
        selectedValidator,
        unstakeAmountInRAO
      );

      await tx.signAndSend(
        accountAddress.address,
        { signer: injector.signer },
        ({ status }) => {
          if (status.isInBlock) {
            setUnstakingStatus(
              `Unstaking transaction is in block ${status.asInBlock.toString()}`
            );
          } else {
            setUnstakingStatus(`Current transaction status: ${status.type}`);
          }
        }
      );
    } catch (error) {
      setUnstakingStatus(`Error submitting transaction: ${error.message}`);
    }
  };

  return (
    <div className="text-gray-900">
      <input
        type="number"
        value={unstakeAmount}
        onChange={(e) => setUnstakeAmount(e.target.value)}
        placeholder="Amount to Unstake"
        className="mb-4 p-2 border border-gray-300 rounded shadow-sm focus:border-black"
      />
      <button
        onClick={handleUnstake}
        className="bg-gray-800 ml-2 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
      >
        Submit Unstake
      </button>
      {unstakingStatus && <p className="text-sm mt-2">{unstakingStatus}</p>}

      {/* ... form inputs and submit button */}
      <button
        onClick={goBack}
        className="bg-gray-300 text-black px-4 py-2 rounded-md text-md mt-2"
      >
        Go Back
      </button>
    </div>
  );
};

export default UnstakeForm;
