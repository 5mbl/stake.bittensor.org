import React, { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

const UnstakeForm = ({
  api,
  selectedValidator,
  accountAddress,
  goBack,
  refreshBalances,
}) => {
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
      <div className="flex items-center space-x-2 mb-4">
        {" "}
        {/* Flex container for input and submit button */}
        <input
          type="number"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
          placeholder="Amount to Unstake"
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:border-black" // flex-1 to take up remaining space
        />
        <button
          onClick={handleUnstake}
          className="px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-black hover:bg-gray-900 focus:ring-gray-700"
        >
          Submit Unstake
        </button>
      </div>
      <div className="flex items-center space-x-2">
        {" "}
        {/* Flex container for grouped buttons */}
        <button
          onClick={refreshBalances}
          className="px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-black hover:bg-gray-900 focus:ring-gray-700"
        >
          Refresh Balances
        </button>
        <button
          onClick={goBack}
          className="px-4 py-2 text-sm font-medium text-black transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-300 hover:bg-gray-400 focus:ring-gray-500"
        >
          Go Back
        </button>
      </div>
      {unstakingStatus && <p className="text-sm mt-2">{unstakingStatus}</p>}
    </div>
  );
};

export default UnstakeForm;
