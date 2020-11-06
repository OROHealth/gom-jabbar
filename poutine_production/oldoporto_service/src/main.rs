use shared::NotifyMontroyashi;
use std::convert::Infallible;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use std::sync::Arc;
use tokio::sync::RwLock;
use warp::{http::Method, Filter};

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8050;

/// The Old Porto Service: keep things at a specific temperature in a pot
#[tokio::main]
async fn main() {
    // routes for the oldporto service
    let health_route = warp::path!("health").map(|| warp::reply());

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route.with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}
