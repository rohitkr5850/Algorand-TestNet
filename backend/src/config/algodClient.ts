import algosdk, { Algodv2 } from "algosdk";

let client: Algodv2 | null = null;

export const getAlgodClient = () => {
  if (client) return client;

  const server = process.env.ALGOD_SERVER || "https://testnet-api.algonode.cloud";
  const port = process.env.ALGOD_PORT || "";
  const token = process.env.ALGOD_TOKEN || "";

  client = new algosdk.Algodv2(token, server, port);
  return client;
};
