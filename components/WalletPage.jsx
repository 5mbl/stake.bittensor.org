// pages/wallet.js
import React, { useState, useEffect } from "react";
import Head from "next/head"; // Import Head for custom font

import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { checkStakingAmount } from "@/utils/getStakingAmout";
import StakeForm from "./StakeForm";
import UnstakeForm from "./UnstakeForm";

const WalletPage = () => {
  const [api, setApi] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const [stakingAmount, setStakingAmount] = useState(null);
  //const validatorHotkey = "5CsvRJXuR955WojnGMdok1hbhffZyB4N5ocrv82f3p5A2zVp"; // Set this to the validator's hotkey you're interested in
  const [selectedValidator, setSelectedValidator] = useState("");
  const [validators, setValidators] = useState([]);

  const [showForm, setShowForm] = useState(null); // 'stake', 'unstake', or null

  useEffect(() => {
    const connectWallet = async () => {
      await web3Enable("my-nextjs-app");
      const fetchedAccounts = await web3Accounts();

      if (fetchedAccounts.length > 0) {
        setAccounts(fetchedAccounts); // Store all accounts
        setSelectedAccount(fetchedAccounts[0].address); // Set the first account as selected by default
        setIsConnected(true);
        fetchBalance(fetchedAccounts[0].address);
      } else {
        console.log("No accounts found.");
      }
    };

    const initApi = async () => {
      const provider = new WsProvider(
        "wss://entrypoint-finney.opentensor.ai:443"
      );
      const api = await ApiPromise.create({ provider });
      setApi(api);
    };

    initApi();
    connectWallet();
  }, []);

  useEffect(() => {
    if (selectedAccount && selectedValidator) {
      const fetchStakingAmount = async () => {
        const amount = await checkStakingAmount(
          selectedValidator,
          selectedAccount
        );
        setStakingAmount(amount.toFixed(4).toString()); // Convert to string for display
      };

      fetchStakingAmount();
    }
  }, [selectedAccount, selectedValidator]); // Depend on selectedAccount and selectedValidator

  useEffect(() => {
    const fetchValidators = async () => {
      const response = await fetch("/api/validators");
      const data = await response.json();
      setValidators(data);

      // Automatically select the first validator as default if the list is not empty
      if (data.length > 0) {
        setSelectedValidator(data[0].hotkey);
      }
    };

    fetchValidators();
  }, []);

  const disconnectWallet = () => {
    setAccounts(null);
    setIsConnected(false);
    setBalance("");
    setSelectedValidator("");
  };

  const fetchBalance = async (address) => {
    const provider = new WsProvider(
      "wss://entrypoint-finney.opentensor.ai:443"
    );
    const api = await ApiPromise.create({ provider });

    const {
      data: { free },
    } = await api.query.system.account(address);

    // Assuming TAO uses 9 decimal places, adjust as needed
    const decimals = 9;
    // Convert the BigInt to a Number for division - be cautious about precision loss
    // for very large numbers.
    const balanceInTAO = Number(free) / Math.pow(10, decimals);

    // Now balanceInTAO is a Number and supports toFixed
    const formattedBalance = balanceInTAO.toFixed(4); // Displays the balance with 4 decimal places
    setBalance(formattedBalance);
  };
  useEffect(() => {
    if (selectedAccount) {
      fetchBalance(selectedAccount).catch(console.error);
    }
  }, [selectedAccount]); // Watch for changes in selectedAccount, not accounts

  const handleValidatorChange = (e) => {
    setSelectedValidator(e.target.value);
  };

  const handleAccountChange = (event) => {
    setSelectedAccount(event.target.value);
  };

  // Function to show stake form
  const showStakeForm = () => {
    setShowForm("stake");
  };

  // Function to show unstake form
  const showUnstakeForm = () => {
    setShowForm("unstake");
  };

  // Function to go back to the main options from either form
  const goBack = () => {
    setShowForm(null);
  };

  const refreshBalances = async () => {
    console.log("refreshing balance");
    if (selectedAccount) {
      await fetchBalance(selectedAccount);
    }
    if (selectedAccount && selectedValidator) {
      const amount = await checkStakingAmount(
        selectedValidator,
        selectedAccount
      );
      setStakingAmount(amount.toFixed(4).toString()); // Adjust the precision as needed
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <div className="bg-white text-black p-4 font-space-grotesk max-w-md">
          <h1 className="text-3xl font-bold mb-4">Bittensor Staking App</h1>
          {!isConnected ? (
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-800 text-white px-4 py-2 rounded-md text-md"
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="account-select" className="text-md block">
                  Select Address:
                </label>
                <select
                  id="account-select"
                  value={selectedAccount}
                  onChange={handleAccountChange}
                  className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-1 focus:ring-black text-md"
                >
                  {accounts.map((account, index) => (
                    <option key={index} value={account.address}>
                      {account.meta.name} - {account.address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5 mb-4">
                <h2 className="text-base">Staked Amount:</h2>
                <p className="text-3xl font-semibold">{stakingAmount} tao</p>
              </div>

              <div className="mt-5 mb-4">
                <h2 className="text-base">Available Balance:</h2>
                <p className="text-3xl font-semibold">{balance} tao</p>
              </div>

              <div className="mt-5 mb-4">
                <label htmlFor="validator-select" className="text-md block">
                  Select Delegate:
                </label>
                <select
                  id="validator-select"
                  value={selectedValidator}
                  onChange={handleValidatorChange}
                  className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-black focus:ring-1 focus:ring-black text-md"
                >
                  {validators.map((validator) => (
                    <option key={validator.hotkey} value={validator.hotkey}>
                      {validator.name}
                    </option>
                  ))}
                </select>
              </div>

              {isConnected && !showForm && (
                <div className="mt-10 flex justify-center">
                  {/* Buttons */}
                  <button
                    onClick={showStakeForm}
                    className="bg-gray-900 ml-2 text-white px-10 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                  >
                    Stake
                  </button>
                  <button
                    onClick={showUnstakeForm}
                    className="bg-gray-900 ml-2 text-white px-10 py-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                  >
                    Unstake
                  </button>
                </div>
              )}

              {showForm === "stake" && (
                <>
                  <StakeForm
                    api={api}
                    selectedValidator={selectedValidator}
                    accountAddress={accounts.find(
                      (acc) => acc.address === selectedAccount
                    )}
                    goBack={goBack}
                    refreshBalances={refreshBalances}
                  />
                </>
              )}
              {showForm === "unstake" && (
                <>
                  <UnstakeForm
                    api={api}
                    selectedValidator={selectedValidator}
                    accountAddress={accounts.find(
                      (acc) => acc.address === selectedAccount
                    )}
                    goBack={goBack}
                    refreshBalances={refreshBalances}
                  />
                </>
              )}

              {!showForm && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={disconnectWallet}
                    className="px-2 py-1 text-xs font-medium text-black transition duration-150 ease-in-out border border-black rounded focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white hover:bg-gray-100 focus:ring-gray-400"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletPage;
