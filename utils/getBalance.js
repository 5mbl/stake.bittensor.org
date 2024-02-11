// NOT USED Right now
import { ApiPromise, WsProvider } from "@polkadot/api";

export const getBalance = async (address) => {
  const provider = new WsProvider("wss://entrypoint-finney.opentensor.ai:443");
  const api = await ApiPromise.create({ provider });

  // Fetch the account's free balance (assuming TAO is the native token)
  const {
    data: { free },
  } = await api.query.system.account(address);

  // Assuming TAO uses 9 decimal places, adjust as needed
  const decimals = 9;
  const balanceInTAO = free.toBigInt() / BigInt(Math.pow(10, decimals));

  console.log(balanceInTAO.toFixed(4));

  // Format the balance to a fixed number of decimal places for display
  return balanceInTAO.toFixed(4); // Displays the balance with 4 decimal places
};
