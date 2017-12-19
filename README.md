# t3h-server
A small Express-based service framework, intended to reduce time needed to build a secure deployable service to a minimum. As such, it's pretty opinionated about its use case.

* HTTPS only, over TLS 1.2
* JSON body parsing
* Rate limited
* Request logging
* Response compression
* Same-origin referrer policy
* [Helmet headers](https://helmetjs.github.io/)

Out of the box, the framework is suitable for building an API. If a UI is required, use [t3h-ui](https://github.com/csauve/t3h-ui).

## Usage

```js
import t3hServer from "t3h-server";

const config = {
  https: {
    //defaults:
    keyPath: "./server.key",
    certPath: "./server.crt",
    port: 8080
  },
  banner: "t3h-example"
};

t3hServer(config, app => {
  app.get("/", (req, res) => {
    res.send("hello, world!");
  });
});

```

## Building
Before publishing or linking, the project must be built:

```sh
rm -rf dist && npx babel src --out-dir dist
```

## Future work

* CSRF protection (or make part of t3h-ui)
* Authentication, authorization
* HTTP/2 support
* Secrets management
