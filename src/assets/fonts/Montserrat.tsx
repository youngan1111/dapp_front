import localFont from "next/font/local";

const bold = localFont({
  src: "./MontserratVariable.ttf",
  weight: "700",
  style: "normal",
  fallback: ["system-ui"],
});

const semibold = localFont({
  src: "./MontserratVariable.ttf",
  weight: "600",
  style: "normal",
  fallback: ["system-ui"],
});

const medium = localFont({
  src: "./MontserratVariable.ttf",
  weight: "500",
  style: "normal",
  fallback: ["system-ui"],
});

const regular = localFont({
  src: "./MontserratVariable.ttf",
  weight: "400",
  style: "normal",
  fallback: ["system-ui"],
});

export {
  bold as montserratBold,
  semibold as montserratSemibold,
  medium as montserratMedium,
  regular as montserratRegular,
};
