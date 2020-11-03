use std::convert::Infallible;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use std::sync::Arc;
use tokio::sync::RwLock;
use warp::{http::Method, Filter};

mod nordo_handlers;
mod nordo_models;

use nordo_handlers::NordoHandlers;
use nordo_models::{Boiling, BoilingState};

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8030;

/// Nordo Service: boil potatoes and give their current softness level
#[tokio::main]
async fn main() {
    let boiling_status = Arc::new(RwLock::new(Boiling {
        potatoes: None,
        time: None,
    }));

    // routes for the Nordo service
    let health_route = warp::path!("health").map(|| warp::reply());

    let start_boiling_route = warp::path!("start-boiling")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_boiling_status(boiling_status.clone()))
        .and_then(NordoHandlers::start_boiling_potatoes);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route.with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}

/// Copies the read write locked status of drunk people around
fn with_boiling_status(
    status: BoilingState,
) -> impl Filter<Extract = (BoilingState,), Error = Infallible> + Clone {
    warp::any().map(move || status.clone())
}
