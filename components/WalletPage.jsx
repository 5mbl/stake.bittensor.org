// pages/wallet.js
import React, { useState, useEffect } from "react";
import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { checkStakingAmount } from "@/utils/getStakingAmout";

const WalletPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const [stakingAmount, setStakingAmount] = useState(null);
  //const validatorHotkey = "5CsvRJXuR955WojnGMdok1hbhffZyB4N5ocrv82f3p5A2zVp"; // Set this to the validator's hotkey you're interested in
  const [selectedValidator, setSelectedValidator] = useState("");
  const [validators, setValidators] = useState([]);

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
    };

    fetchValidators();
  }, []);

  const disconnectWallet = () => {
    setAccounts(null);
    setIsConnected(false);
    setBalance("");
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Polkadot Wallet Connection</h1>
      {!isConnected ? (
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <div>
            <select
              value={selectedAccount}
              onChange={handleAccountChange}
              className="mb-4 p-2 border rounded"
            >
              {accounts.map((account, index) => (
                <option key={index} value={account.address}>
                  {account.address} {/* Or any other identifier */}
                </option>
              ))}
            </select>
            <p>
              <strong>Address:</strong> {selectedAccount}
            </p>

            <select
              value={selectedValidator}
              onChange={handleValidatorChange}
              className="mb-4 p-2 border rounded"
            >
              {validators.map((validator) => (
                <option key={validator.hotkey} value={validator.hotkey}>
                  {validator.name}
                </option>
              ))}
            </select>
            <p>
              <strong>Staking Amount:</strong> {stakingAmount} TAO
            </p>

            <p>
              <strong>Balance:</strong> {balance}
            </p>
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Disconnect Wallet
          </button>
        </>
      )}
    </div>
  );
};

export default WalletPage;
