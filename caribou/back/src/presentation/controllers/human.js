module.exports = (Server) => {
  Server.registerRoute({
    method: "POST",
    authenticationMethod: "OAuth",
    path: "/api/humans",
    handler: (HumanLogic, Body) => {
      return HumanLogic.register(Body);
    }
  });

  Server.registerRoute({
    method: "POST",
    authenticationMethod: "OAuth",
    path: "/api/humans/check",
    handler: (HumanLogic, Body) => {
      return HumanLogic.checkSafety(Body);
    }
  });
};
