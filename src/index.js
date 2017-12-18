import express from "express";
import https from "https";
import fs from "fs";
import {mergeDeepRight} from "ramda";
import chalk from "chalk";

import middlewares from "./middlewares";
import printBanner from "./banner";

const defaultConfig = {
  https: {
    keyPath: "server.key",
    certPath: "server.crt",
    port: 8080
  },
  rateLimit: {
    windowMs: 5 * 60 * 1000,
    max: 50,
    delayAfter: 30,
    delayMs: 1000
  },
  requestLoggingMode: "common",
  enableTrustProxy: false,
  bodyParserLimit: "200kb",
  banner: "t3h-server"
};

export default function t3hServer(userConfig, setup) {
  const config = mergeDeepRight(defaultConfig, userConfig);

  const httpsOpts = {
    key: fs.readFileSync(config.https.keyPath).toString(),
    cert: fs.readFileSync(config.https.certPath).toString(),
    secureProtocol: "TLSv1_2_method",
    honorCipherOrder: true,
    //ciphers: uses node's strong default cipher suites
  };

  const app = express();
  middlewares(app, config);
  setup(app, config);

  if (config.banner) {
    printBanner(config.banner);
  }

  const server = https.createServer(httpsOpts, app);
  server.listen(config.https.port);
  console.log(`Listening @ ${chalk.cyan(config.https.port)}`);
};