module.exports = (Server) => {
  Server.registerRoute({
    method: "POST",
    authenticationMethod: "OAuth",
    path: "/api/caribous",
    handler: (CaribouLogic, Body) => {
      return CaribouLogic.register(Body);
    }
  });

  Server.registerRoute({
    method: "GET",
    authenticationMethod: "OAuth",
    path: "/api/caribous",
    handler: (CaribouLogic, Body) => {
      return CaribouLogic.getAll(Body);
    }
  });
};
