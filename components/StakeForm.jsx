// components/StakeForm.js
import React, { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

const StakeForm = ({
  api,
  selectedValidator,
  accountAddress,
  goBack,
  refreshBalances,
}) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakingStatus, setStakingStatus] = useState("");

  const handleStake = async () => {
    if (!selectedValidator || !stakeAmount) {
      setStakingStatus("Please select a validator and enter an amount.");
      return;
    }

    try {
      const stakeAmountInRAO = (parseFloat(stakeAmount) * 1000000000) // converting tao in rao
        .toString();

      // Connect to the selected account
      const injector = await web3FromSource(accountAddress.meta.source);
      // Prepare the transaction
      const tx = api.tx.subtensorModule.addStake(
        selectedValidator,
        stakeAmountInRAO
      ); // Pass as string to avoid JS number limitations

      // Sign and send the transaction
      await tx.signAndSend(
        accountAddress.address,
        { signer: injector.signer },
        ({ status }) => {
          if (status.isInBlock) {
            setStakingStatus(
              `Staking transaction is in block ${status.asInBlock.toString()}`
            );
          } else {
            setStakingStatus(`Current transaction status: ${status.type}`);
          }
        }
      );
    } catch (error) {
      setStakingStatus(`Error submitting transaction: ${error.message}`);
    }
  };

  /*   const handleStakeAmountChange = (event) => {
    let input = parseFloat(event.target.value);
    if (!isNaN(input)) {
      input = Math.floor(input * 1000) / 1000; // Truncate to three decimal places
      setStakeAmount(input.toString()); // Convert back to string to maintain consistent state type
    } else {
      setStakeAmount(""); // Reset or handle invalid input
    }
  }; */

  return (
    <div className="text-gray-900">
      <div className="flex items-center space-x-2 mb-4">
        {" "}
        {/* Flex container for input and submit button */}
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Amount to Stake"
          className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:border-black" // flex-1 to take up remaining space
        />
        <button
          onClick={handleStake}
          className="px-4 py-2 text-sm font-medium text-white transition duration-150 ease-in-out border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 bg-black hover:bg-gray-900 focus:ring-gray-700"
        >
          Submit Stake
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
      {stakingStatus && <p className="text-sm mt-2">{stakingStatus}</p>}
    </div>
  );
};

export default StakeForm;
