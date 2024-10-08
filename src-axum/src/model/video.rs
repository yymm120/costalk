
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(Deserialize, Serialize, FromRow)]
pub struct Video {
    pub id: i64,
    pub url: String,
    pub name: Option<String>,
    pub description: Option<String>,
}

// #[derive(Deserialize, Serialize)]
// pub struct UserInfo {
//     pub username: String,
//     pub occupation: Option<String>,
//     pub email: Option<String>,
//     pub phone: Option<String>,
// }
