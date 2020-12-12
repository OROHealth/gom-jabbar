module.exports = (Server) => {
  Server.registerRoute({
    method: "POST",
    path: "/api/oauth/:strategy",
    handler: (AuthLogic, Body, Params, SetCookie) => {
    return AuthLogic.processOAuth(Body, Params.strategy)
      .then((credentials) => {
        if (process.env.CARIB__SECURE_COOKIE_DOMAIN) {
          SetCookie("access_token", credentials.access_token, {httpOnly: true, secure: false, path: "/", domain: process.env.CARIB__SECURE_COOKIE_DOMAIN});
        } else {
          SetCookie("access_token", credentials.access_token, {httpOnly: true, secure: false, path: "/"});
        }
        if (credentials) {
          return {
            access_token: "ok"
          };
        }
      });
    }
  });
};

