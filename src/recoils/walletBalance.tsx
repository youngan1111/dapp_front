import { atom } from "recoil";

interface Token {
  available: number;
}

const defaultBalance: Map<string, Token> = new Map<string, Token>();

export const walletBalance = atom({
  key: "walletBalance",
  default: defaultBalance,
});
