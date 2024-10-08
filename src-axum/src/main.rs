mod configuration;
mod constants;
mod error;
mod handler;
mod model;
mod service;
mod startup;

use crate::handler::user_handler::{
    create_user, delete_user, get_user_by_id, list_users, update_user,
};
use crate::handler::video_handler::{
    list_video
};
use axum::{
    routing::{delete, get, post, put},
    Extension, Router, http::Method
};
use configuration::get_configuration;
use service::user_service::UserService;
use service::video_service::VideoService;
use startup::Application;
use tracing::info;
use tracing_subscriber::EnvFilter;
use tower_http::cors::{Any, CorsLayer};

#[tokio::main]
async fn main() {
    // Log Init
    tracing_subscriber::fmt()
        .without_time() // For early local development.
        .with_target(false)
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    info!("Starting Service..!");
    let configuration = get_configuration().expect("Failed to read configuration.");

    let application = Application::build(configuration.clone())
        .await
        .expect("create application service occur error!");

    run(application).await;
}
pub async fn run(application: Application) {

    let cors = CorsLayer::new()
    // allow `GET` and `POST` when accessing the resource
    .allow_methods([Method::GET, Method::POST])
    // allow requests from any origin
    .allow_origin(Any);

    let user_service = UserService::new().await.unwrap();
    let video_service = VideoService::new().await.unwrap();
    let app = Router::new()
        .route("/", get(list_users))
        // .route("/users", get(list_users))
        // .route("/user/:id", get(get_user_by_id))
        // .route("/user", post(create_user))
        // .route("/user/:id", put(update_user))
        // .route("/user/:id", delete(delete_user))
        .route("/videos/:page", get(list_video))
        .layer(cors)
        .layer(Extension(user_service))
        .layer(Extension(video_service))
        .with_state(application.clone());

    let listenner = tokio::net::TcpListener::bind(application.address)
        .await
        .unwrap();

    tracing::info!("Stared server!!!");
    axum::serve(listenner, app).await.unwrap()
}
