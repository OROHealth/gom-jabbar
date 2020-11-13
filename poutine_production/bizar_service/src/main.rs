use shared::NotifyMontroyashi;
use std::convert::Infallible;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use std::sync::Arc;
use tokio::sync::RwLock;
use warp::{http::Method, Filter};

mod bizar_handlers;
mod bizar_models;

use bizar_handlers::BizarHandlers;
use bizar_models::{Frying, FryingState};

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8040;

/// The Bizar Service: fry potatoes with mutiple oil choices
#[tokio::main]
async fn main() {
    let frying_status = Arc::new(RwLock::new(Frying {
        potatoes: None,
        time: None,
        oil: None,
    }));

    // routes for the bizar service
    let health_route = warp::path!("health").map(|| warp::reply());

    let start_frying_route = warp::path!("start-frying")
        .and(warp::post())
        .and(warp::body::json())
        .and(with_frying_status(frying_status.clone()))
        .and_then(BizarHandlers::start_frying_potatoes);

    let get_fries_route = warp::path!("get-fries")
        .and(warp::post())
        .and(with_frying_status(frying_status.clone()))
        .and_then(BizarHandlers::get_fries);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route
        .or(start_frying_route)
        .or(get_fries_route)
        .or(BizarHandlers::add_sound_heard_route())
        .with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}

/// Copies the read write locked status of frying status
fn with_frying_status(
    status: FryingState,
) -> impl Filter<Extract = (FryingState,), Error = Infallible> + Clone {
    warp::any().map(move || status.clone())
}
