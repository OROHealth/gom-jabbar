use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use warp::{http::Method, Filter};

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8030;

#[tokio::main]
async fn main() {
    // routes for the  service
    let health_route = warp::path!("health").map(|| warp::reply());

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route.with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}
