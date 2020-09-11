module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // plugins: [
    //   [
    //     "module-resolver",
    //     {
    //       alias: {
    //         "@components": "./components",
    //         "@redux": "./redux/actions.tsx",
    //         "@screens": "./screens",
    //         "@assets": "./assets",
    //         "@lib": "./lib",
    //         "@constants": "./constants/index.tsx",
    //         "@navigator": "./navigator",
    //       },
    //     },
    //   ],
    // ],
  };
};
