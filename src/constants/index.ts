export const PROVIDERS: {
  type: "bank" | "e-wallet";
  name:
    | "BCA"
    | "BNI"
    | "BRI"
    | "Mandiri"
    | "BTN"
    | "BSI"
    | "BRK Syariah"
    | "GoPay"
    | "ShopeePay"
    | "Dana";
  logo: {
    regular: string;
    white: string;
  };
}[] = [
  {
    type: "bank",
    name: "BCA",
    logo: {
      regular: "assets/images/providers/bca.webp",
      white: "assets/images/providers/bca-white.webp",
    },
  },
  {
    type: "bank",
    name: "BNI",
    logo: {
      regular: "assets/images/providers/bni.webp",
      white: "assets/images/providers/bni-white.webp",
    },
  },
  {
    type: "bank",
    name: "BRI",
    logo: {
      regular: "assets/images/providers/bri.webp",
      white: "assets/images/providers/bri-white.webp",
    },
  },
  {
    type: "bank",
    name: "Mandiri",
    logo: {
      regular: "assets/images/providers/mandiri.webp",
      white: "assets/images/providers/mandiri-white.webp",
    },
  },
  {
    type: "bank",
    name: "BTN",
    logo: {
      regular: "assets/images/providers/btn.webp",
      white: "assets/images/providers/btn-white.webp",
    },
  },
  {
    type: "bank",
    name: "BSI",
    logo: {
      regular: "assets/images/providers/bsi.webp",
      white: "assets/images/providers/bsi-white.webp",
    },
  },
  {
    type: "bank",
    name: "BRK Syariah",
    logo: {
      regular: "assets/images/providers/brk-syariah.webp",
      white: "assets/images/providers/brk-syariah-white.webp",
    },
  },
  {
    type: "e-wallet",
    name: "GoPay",
    logo: {
      regular: "assets/images/providers/gopay.webp",
      white: "assets/images/providers/gopay-white.webp",
    },
  },
  {
    type: "e-wallet",
    name: "ShopeePay",
    logo: {
      regular: "assets/images/providers/shopeepay.webp",
      white: "assets/images/providers/shopeepay-white.webp",
    },
  },
  {
    type: "e-wallet",
    name: "Dana",
    logo: {
      regular: "assets/images/providers/dana.webp",
      white: "assets/images/providers/dana-white.webp",
    },
  },
];
