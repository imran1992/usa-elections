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
            "@screens": "./screens",
            //         "@components": "./components",
            //         "@redux": "./redux/actions.tsx",
            //         "@assets": "./assets",
            //         "@lib": "./lib",
            //         "@navigator": "./navigator",
          },
        },
      ],
    ],
  };
};
