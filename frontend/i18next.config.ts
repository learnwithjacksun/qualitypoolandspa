export default {
  locales: [
    "en",
    "ru",
    "fr",
    "sv",
    "de",
    "es"
  ],
  extract: {
    input: "src/**/*.{js,jsx,ts,tsx}",
    output: "public/locales/{{language}}/{{namespace}}.json"
  },

};