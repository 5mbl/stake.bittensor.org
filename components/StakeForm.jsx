// components/StakeForm.js
import React, { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

const StakeForm = ({ api, selectedValidator, accountAddress, goBack }) => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakingStatus, setStakingStatus] = useState("");

  const handleStake = async () => {
    if (!selectedValidator || !stakeAmount) {
      setStakingStatus("Please select a validator and enter an amount.");
      return;
    }

    try {
      const stakeAmountInRAO = (
        parseFloat(stakeAmount) * 1000000000
      ).toString();

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

  const handleStakeAmountChange = (event) => {
    let input = parseFloat(event.target.value);
    if (!isNaN(input)) {
      input = Math.floor(input * 1000) / 1000; // Truncate to three decimal places
      setStakeAmount(input.toString()); // Convert back to string to maintain consistent state type
    } else {
      setStakeAmount(""); // Reset or handle invalid input
    }
  };

  return (
    <div className="text-gray-900">
      <input
        type="number"
        value={stakeAmount}
        onChange={handleStakeAmountChange}
        placeholder="Amount to Stake"
        className="mb-4 p-2 border border-gray-300 rounded shadow-sm focus:border-black"
      />
      <button
        onClick={handleStake}
        className="bg-gray-800 ml-2 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
      >
        Submit Stake
      </button>
      {stakingStatus && <p className="text-sm mt-2">{stakingStatus}</p>}
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

export default StakeForm;
