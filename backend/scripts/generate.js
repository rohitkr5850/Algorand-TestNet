import algosdk from "algosdk";

const account = algosdk.generateAccount();
const mnemonic = algosdk.secretKeyToMnemonic(account.sk);

console.log("🚀 NEW ALGOD ACCOUNT (TestNet)");
console.log("Address:", account.addr);
console.log("Mnemonic:", mnemonic);
