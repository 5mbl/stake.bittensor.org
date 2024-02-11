import { ApiPromise, WsProvider } from "@polkadot/api";

export async function checkStakingAmount(validatorHotkey, delegatorAddress) {
  // Connect to the node
  const provider = new WsProvider("wss://entrypoint-finney.opentensor.ai:443");
  const api = await ApiPromise.create({ provider });

  // Query the staking amount
  const stakedAmount = await api.query.subtensorModule.stake(
    validatorHotkey,
    delegatorAddress
  );

  // Convert the staked amount from its smallest unit (Rao) to TAO
  // Assuming 1 TAO = 1,000,000,000 Rao
  const stakedAmountInTAO = Number(stakedAmount) / 1000000000;

  console.log(`Staked amount in TAO: ${stakedAmountInTAO}`);
  return stakedAmountInTAO;
}
/*
// Example usage
const validatorHotkey = "VALIDATOR_ACCOUNT_ID"; // Validator's hotkey (public key)
const delegatorAddress = "DELEGATOR_WALLET_ADDRESS"; // Your wallet address
checkStakingAmount(validatorHotkey, delegatorAddress);*/
