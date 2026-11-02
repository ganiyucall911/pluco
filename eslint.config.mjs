import next from "eslint-config-next";

const config = [
  ...next,
  { ignores: ["contracts/**", "out/**", ".next/**"] },
  {
    // Existing client-only hydration/restore patterns; flagged by new React rules.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
    },
  },
];

export default config;
