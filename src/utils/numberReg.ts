/**
 * input 정규식 통과 -> 좌측 0 제외한 숫자 리턴
 */
export const inputNumberReg = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const reg = /^[\d]*\.?[\d]{0,6}$/;
  if (reg.test(value)) {
    if (Number(value) < 1) return value;
    else return value.replace(/(^0+)/, "");
  } else return value.slice(0, -1);
};
