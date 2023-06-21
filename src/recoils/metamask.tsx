import { atom } from "recoil";

interface Meta {
  connected: boolean;
  net: string;
}

const defaultMeta: Meta = {
  connected: false,
  net: "",
};

/**
 * 메타마스크 연동 여부 및 네트워크
 */
export const metaState = atom<Meta>({
  key: "metaState",
  default: defaultMeta,
});
