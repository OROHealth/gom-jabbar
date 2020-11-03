use std::net::{IpAddr, Ipv4Addr, SocketAddr};
use warp::{http::Method, Filter};

pub const HOST: IpAddr = IpAddr::V4(Ipv4Addr::new(127, 0, 0, 1));
pub const PORT: u16 = 8020;

mod verduny_handlers;
mod verduny_models;

//The Verduny service: cut potatoes in dynamicaly-sized cube and dip them in maple sirup
#[tokio::main]
async fn main() {
    // routes for the verduny service
    let health_route = warp::path!("health").map(|| warp::reply());

    let cut_potatoes_route = warp::path!("cut-potatoes")
        .and(warp::post())
        .and(warp::body::json())
        .and_then(verduny_handlers::VerdunyHandlers::cut_potatoes);

    let cors = warp::cors()
        .allow_any_origin()
        .allow_header("content-type")
        .allow_methods(&[Method::GET, Method::POST, Method::DELETE]);

    let routes = health_route.or(cut_potatoes_route).with(cors);

    warp::serve(routes).run(SocketAddr::new(HOST, PORT)).await;
}