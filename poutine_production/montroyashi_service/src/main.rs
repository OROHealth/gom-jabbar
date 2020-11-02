use std::convert::Infallible;
use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use warp::{http::Method, Filter};

use std::sync::Arc;
use std::time::SystemTime;
use tokio::sync::RwLock;

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8010;

mod montroyashi_handlers;
mod montroyashi_models;
use montroyashi_handlers::MontroyashiHandlers;
use montroyashi_models::{DrunkPeopleAround, DrunkPeopleAroundStatus};
/// The Montroyashi service: listen to other robots' environment sounds
/// and display Leonard Cohen lyrics, detect drunk people
#[tokio::main]
async fn main() {
    let drunk_people_state = Arc::new(RwLock::new(DrunkPeopleAroundStatus {
        status: false,
        time_logged: SystemTime::now(),
    }));
    // routes for the montroyashi service
    let health_route = warp::path!("health").map(|| warp::reply());
    let lyrics_route = warp::path!("leonard-cohen-lyrics")
        .and_then(MontroyashiHandlers::display_leonard_cohen_lyrics);
    let noise_heard_route = warp::path!("noise-heard")
        .and(with_status(drunk_people_state.clone()))
        .and_then(MontroyashiHandlers::noise_heard);

    let drunks_around_route = warp::path!("drunks-around")
        .and(with_status(drunk_people_state.clone()))
        .and_then(MontroyashiHandlers::check_for_drunk_people);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route
        .with(cors)
        .or(lyrics_route)
        .or(noise_heard_route)
        .or(drunks_around_route);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}

fn with_status(
    status: DrunkPeopleAround,
) -> impl Filter<Extract = (DrunkPeopleAround,), Error = Infallible> + Clone {
    warp::any().map(move || status.clone())
}
