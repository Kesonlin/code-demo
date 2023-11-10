const { createScript, createLink, generateHTML } = require("../utils");
const path = require("path");
const fs = require("fs/promises");

module.exports = () => {
  return {
    name: "html-plugin",
    setup(build) {
      build.onEnd(async (args) => {
        console.log(args);

        const { errors, metafile } = args;

        if (errors.length || !metafile) {
          return;
        }

        const scripts = [];
        const links = [];
        const { outputs } = metafile;
        Object.keys(outputs).forEach((asset) => {
          if (asset.endsWith(".js")) {
            scripts.push(createScript(asset));
          } else if (asset.endsWith(".css")) {
            links.push(createLink(asset));
          }
        });

        const templateContent = generateHTML(scripts, links);
        const templatePath = path.join(process.cwd(), "index.html");

        await fs.writeFile(templatePath, templateContent);
      });
    },
  };
};
