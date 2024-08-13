use crate::model::video::Video;
use crate::service::error::Result;
use crate::startup::Application;

#[derive(Clone)]
pub struct VideoService {}

impl VideoService {
    pub async fn new() -> Result<Self> {
        Ok(Self {})
    }

    pub async fn list_videos(
        &self,
        offset: i64,
        Application { database_state, .. }: Application,
    ) -> Result<Vec<Video>> {
        let videos = sqlx::query_as::<_, Video>(r#"SELECT * FROM "video" LIMIT 1 OFFSET $1;"#)
            .bind(offset)
            .fetch_all(&database_state.model.db_pool)
            .await?;
        Ok(videos)
    }
}
