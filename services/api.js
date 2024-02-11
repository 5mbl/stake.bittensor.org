import { ApiPromise, WsProvider } from "@polkadot/api";

async function createApiConnection() {
  const provider = new WsProvider("wss://your-node-url");
  const api = await ApiPromise.create({ provider });
  return api;
}
