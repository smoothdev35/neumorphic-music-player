module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command(
      "autoprefixer public/_includes/css/main.scss"
    );
  },
};
