import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import hpp from "hpp";
import RateLimit from "express-rate-limit";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import csurf from "csurf";

export default function setup(app, config) {

  //throttle clients to mitigate DoS attacks
  app.use(new RateLimit(config.rateLimit));

  //compress response bodies
  app.use(compression());

  //request logging. can also use "dev"
  app.use(morgan(config.requestLoggingMode));

  //if enabled, trust X-Forwarded-* headers from a reverse proxy
  if (config.enableTrustProxy) {
    app.enable("trust proxy");
  }

  //sane default headers https://helmetjs.github.io/docs/
  app.use(helmet());

  //tell browsers not to share this domain with others in the Referer header
  //https://www.w3.org/TR/referrer-policy/#referrer-policy-same-origin
  app.use(helmet.referrerPolicy({policy: "same-origin"}));

  //protect against HTTP param pollution attack
  app.use(hpp());

  app.use(bodyParser.json({
    //only accept correct content type header -- helps prevent CSRF
    type: "application/json",
    //only accept arrays and objects
    strict: true,
    //maximum request body size, checked on decompressed stream (bomb-safe)
    limit: config.bodyParserLimit
  }));

  // TODO
  // implement csrf protection recommendations:
  // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)

  // app.use(cookieParser());
  // app.use(csurf({cookie: {secure: true, maxAge: 5000, sameSite: "strict"}}));
  // app.use((req, res, next) => {
  //   const token = req.csrfToken();
  //   res.cookie("XSRF-TOKEN", token);
  //   res.locals.csrfToken = token;
  //   next();
  // });
};
