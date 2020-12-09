module.exports = (Server) => {
  Server.registerRoute({
    method: "POST",
    path: "/api/accessProfile",
    handler: (AuthLogic, Body) => {
      return AuthLogic.createAccessProfile(Body);
    }
  });
};
