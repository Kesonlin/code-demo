// import * as https from "https";
// import * as http from "http";
const https = require("https");
const http = require("http");

const plugin = {
  name: "cdn-plugin",
  setup(build) {
    console.log("11111");

    build.onResolve({ filter: /^https?:\/\// }, (args) => {
      console.log("resolve args", args);
      return {
        // ...args, // 不能使用扩展运算符，不然会报错
        path: args.path,
        // a: "1",
        namespace: "https-url",
      };
    });

    // 由于模块还需要引入其他的模块
    build.onResolve({ filter: /.*/, namespace: "https-url" }, (args) => {
      console.log("path", args);

      return {
        // 重写路径
        path: new URL(args.path, args.importer).toString(),
        namespace: "https-url",
      };
    });

    // filter 和 https-url条件缺一不可
    build.onLoad({ filter: /.*/, namespace: "https-url" }, async (args) => {
      console.log("build args", args);
      const contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log(`downloading ${url}`);
          // 这里不管 http 还是 https 都是以http 开头，所以会导致lib永远是http
          //   const lib = url.startsWith("http") ? http : https;
          const lib = url.startsWith("https") ? https : http;

          lib
            .get(url, (res) => {
              //   console.log("status", res.statusCode);
              const chunks = [];
              res.on("data", (chunk) => {
                // console.log(chunk);
                chunks.push(chunk);
              });

              res.on("end", () => {
                resolve(Buffer.concat(chunks));
              });
            })
            .on("error", (err) => {
              console.log("error", err);
            });
        }

        fetch(args.path);
      });

      //   console.log("contents", contents);
      return {
        // contents: JSON.stringify({
        //   render: "111",
        // }),
        contents,
      };
    });
  },
};

module.exports = { plugin };
