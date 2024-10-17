const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["bootstrap-vue"],
});

module.exports = {
  publicPath: "/",
};
