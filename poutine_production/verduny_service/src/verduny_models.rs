use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize)]
pub struct CutPotatoRequest {
    pub potatoes: Vec<shared_models::Potato>,
    pub size: usize,
}

#[derive(Debug, Clone, Serialize)]
pub struct CutPotatoResponse {
    pub potatoes: Vec<shared_models::Potato>,
}
