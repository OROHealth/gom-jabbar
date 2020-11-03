use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize)]
pub struct CutPotatoRequest {
    pub potatoes: Vec<shared::Potato>,
    pub size: usize,
}

#[derive(Debug, Clone, Deserialize)]
pub struct MSDipPotatoRequest {
    pub potatoes: Vec<shared::Potato>,
}

#[derive(Debug, Clone, Serialize)]
pub struct PotatoResponse {
    pub potatoes: Vec<shared::Potato>,
}
