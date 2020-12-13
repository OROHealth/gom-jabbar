module.exports = (Server) => {
  Server.registerRoute({
    method: "POST",
    authenticationMethod: "OAuth",
    path: "/api/caribous",
    handler: (CaribouLogic, Body) => {
      return CaribouLogic.register(Body);
    }
  });
};
