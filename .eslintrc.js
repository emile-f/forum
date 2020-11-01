module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "react-app"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
