const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async ()=>{
    const server= Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    })

    //route
    server.route(routes.routes)
    await server.start()
    console.log(`Running Server ${server.info.uri}`)
}
init()