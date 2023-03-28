const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!, oh yeaahhh";
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
