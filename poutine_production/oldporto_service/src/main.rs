use shared::NotifyMontroyashi;
use std::collections::HashMap;
use std::convert::Infallible;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use std::sync::Arc;
use tokio::sync::RwLock;
use warp::{http::Method, Filter};

mod oldporto_handlers;
mod oldporto_models;

use crate::oldporto_models::Robots;

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8050;

/// The Old Porto Service: keep things at a specific temperature in a pot
/// Contains routes for verification of temperature, making temperature higher, making temperature lower
/// and Start monitoring and stop monitoring routes as well
#[tokio::main]
async fn main() {
    let monitored_robots: Robots = Arc::new(RwLock::new(HashMap::new()));

    // routes for the oldporto service
    let health_route = warp::path!("health").map(|| warp::reply());

    let registration_route = warp::path!("register-robot")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_connected_robots(monitored_robots.clone()))
        .and_then(oldporto_handlers::OldPortoHandlers::register_robots);

    let start_monitoring_route = warp::path!("monitor-robot")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_connected_robots(monitored_robots.clone()))
        .and_then(oldporto_handlers::OldPortoHandlers::start_monitoring);

    let stop_monitoring_route = warp::path!("stop-monitoring-robot")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_connected_robots(monitored_robots.clone()))
        .and_then(oldporto_handlers::OldPortoHandlers::stop_monitoring);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route
        .or(registration_route)
        .or(start_monitoring_route)
        .or(stop_monitoring_route)
        .with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}

fn with_connected_robots(
    status: Robots,
) -> impl Filter<Extract = (Robots,), Error = Infallible> + Clone {
    warp::any().map(move || status.clone())
}
