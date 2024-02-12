// components/StakeForm.js
import React, { useState } from "react";
import { web3FromSource } from "@polkadot/extension-dapp";

const StakeForm = ({ api, selectedValidator, accountAddress }) => {
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

  return (
    <div>
      <input
        type="number"
        value={stakeAmount}
        onChange={(e) => setStakeAmount(e.target.value)}
        placeholder="Amount to Stake"
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleStake}
        className="bg-green-500 text-white px-4 py-2 rounded-md"
      >
        Submit Stake
      </button>
      {stakingStatus && <p>{stakingStatus}</p>}
    </div>
  );
};

export default StakeForm;
