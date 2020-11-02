use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use warp::{http::Method, Filter};

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8010;

mod montroyashi_handlers;
use montroyashi_handlers::MontroyashiHandlers;
/// The Montroyashi service: listen to other robots' environment sounds
/// and display Leonard Cohen lyrics, detect drunk people
#[tokio::main]
async fn main() {
    // routes for the montroyashi service
    let health_route = warp::path!("health").map(|| warp::reply());
    let lyrics_route = warp::path!("leonard-cohen-lyrics")
        .and_then(MontroyashiHandlers::display_leonard_cohen_lyrics);
    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route.with(cors).or(lyrics_route);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}
