module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command(
    "node-sass --include-path node_modules/normalize-scss/sass public/_includes/css/main.scss public/css/main.css"
    );
  },
};
