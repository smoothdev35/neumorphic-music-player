module.exports = {
  onPreBuild: async ({ utils: { run } }) => {
    await run.command(
      "node-sass public/_includes/css/main.scss public/css/main.css"
    );
  },
};