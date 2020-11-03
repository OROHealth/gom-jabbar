use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use warp::{http::Method, Filter};

mod outremona_handlers;
use outremona_handlers::OutremonaHandlers;

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8000;

/// The Outremona service: take cheese from a box an squeeze it
#[tokio::main]
async fn main() {
    // routes for the outremona service
    let health_route = warp::path!("health").map(|| warp::reply());
    let take_cheese_route = warp::path!("take-cheese")
        .and(warp::post())
        .and_then(OutremonaHandlers::get_cheese);
    let squeeze_cheese_route = warp::path!("squeeze-cheese")
        .and(warp::post())
        .and_then(OutremonaHandlers::squeeze_cheese);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route
        .or(take_cheese_route)
        .or(squeeze_cheese_route)
        .with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}
