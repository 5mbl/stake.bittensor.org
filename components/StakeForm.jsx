// components/StakeForm.jsx
import React, { useState } from "react";

const StakeForm = ({ onStake }) => {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onStake(amount); // You'll need to define this function to handle the staking logic.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-black"
        >
          Amount to Stake
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
        />
      </div>
      <button type="submit" className="bg-black text-white p-2 rounded-md">
        Stake
      </button>
    </form>
  );
};

export default StakeForm;
