use axum::{extract::State, http::StatusCode};
use axum::Json;
use axum::{extract::Path, Extension};

use crate::model::video::Video;
// use crate::model::ModelManager;
use crate::service::video_service::VideoService;
use crate::startup::Application;




pub async fn list_video(
    Path(page): Path<i64>,
    State(state): State<Application>,
    service: Extension<VideoService>,
) -> Result<Json<Vec<Video>>, StatusCode> {
    tracing::info!("into list_videos function.");
    match service.list_videos(page, state).await {
        
        Ok(videos) => Ok(Json(videos)),
        Err(ex) => {
            eprintln!("{:?}", ex);
            Err(StatusCode::INTERNAL_SERVER_ERROR)
        }
    }
}