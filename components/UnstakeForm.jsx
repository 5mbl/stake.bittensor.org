import React, { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

const UnstakeForm = ({ api, selectedValidator, accountAddress }) => {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [unstakingStatus, setUnstakingStatus] = useState("");

  const handleUnstake = async () => {
    if (!selectedValidator || !unstakeAmount) {
      setUnstakingStatus("Please select a validator and enter an amount.");
      return;
    }

    try {
      // Corrected variable name from stakeAmount to unstakeAmount
      const unstakeAmountInRAO = (
        parseFloat(unstakeAmount) * 1000000000
      ).toString(); // Convert TAO to RAO
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
    <div>
      <input
        type="number"
        value={unstakeAmount}
        onChange={(e) => setUnstakeAmount(e.target.value)}
        placeholder="Amount to Unstake"
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleUnstake}
        className="bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Submit Unstake
      </button>
      {unstakingStatus && <p>{unstakingStatus}</p>}
    </div>
  );
};

export default UnstakeForm;
