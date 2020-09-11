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
            //         "@components": "./components",
            //         "@redux": "./redux/actions.tsx",
            //         "@screens": "./screens",
            //         "@assets": "./assets",
            //         "@lib": "./lib",
            //         "@navigator": "./navigator",
          },
        },
      ],
    ],
  };
};
