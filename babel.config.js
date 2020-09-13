module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@constants": "./constants/index.tsx",
            "@components": "./components/index.tsx",
            "@lib": "./lib/index.tsx",
            "@screens": "./screens",
            "@assets": "./assets",

            //         "@redux": "./redux/actions.tsx",
            //
            //         "@navigator": "./navigator",
          },
        },
      ],
    ],
  };
};
