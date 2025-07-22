use std::path::Path;
use actix_web::{get, App, HttpServer, Responder, web};
use serde::Serialize;
use actix_cors::Cors;

#[derive(Serialize)]
#[serde(tag = "type")]
enum GalleryItem {
    #[serde(rename = "folder")]
    Folder {
        id: String,
        name: String,
        items: Vec<GalleryItem>,
    },
    #[serde(rename = "image")]
    Image {
        id: String,
        src: String,
        alt: String,
    },
}

#[derive(Serialize)]
struct PathResponse {
    path:String
}

fn sample_data() -> GalleryItem {
    use GalleryItem::*;

    Folder {
        id: "root".into(),
        name: "내 갤러리".into(),
        items: vec![
            Folder {
                id: "travel".into(),
                name: "여행 사진".into(),
                items: vec![
                    Folder {
                        id: "europe".into(),
                        name: "유럽".into(),
                        items: vec![
                            Image {
                                id: "europe-1".into(),
                                src: "/placeholder.svg?height=800&width=1200".into(),
                                alt: "파리 에펠탑".into(),
                            },
                            Image {
                                id: "europe-2".into(),
                                src: "/placeholder.svg?height=900&width=1400".into(),
                                alt: "로마 콜로세움".into(),
                            },
                        ],
                    },
                    Folder {
                        id: "asia".into(),
                        name: "아시아".into(),
                        items: vec![
                            Image {
                                id: "asia-1".into(),
                                src: "/placeholder.svg?height=1080&width=1920".into(),
                                alt: "도쿄 타워".into(),
                            },
                        ],
                    },
                    Image {
                        id: "travel-1".into(),
                        src: "/placeholder.svg?height=700&width=1000".into(),
                        alt: "제주도 해변".into(),
                    },
                ],
            },
            Folder {
                id: "family".into(),
                name: "가족 사진".into(),
                items: vec![
                    Image {
                        id: "family-1".into(),
                        src: "/placeholder.svg?height=600&width=800".into(),
                        alt: "가족 모임".into(),
                    },
                    Image {
                        id: "family-2".into(),
                        src: "/placeholder.svg?height=700&width=700".into(),
                        alt: "아이들 사진".into(),
                    },
                ],
            },
            Image {
                id: "main-1".into(),
                src: "/placeholder.svg?height=500&width=800".into(),
                alt: "메인 이미지".into(),
            },
        ],
    }
}

#[get("/directory")]
async fn get_directory() -> impl Responder {
    web::Json(sample_data())
}

#[get("/default")]
async fn get_default_directory_path() -> impl Responder {
    let path = if let Some(home_dir) = dirs_next::home_dir() {
        home_dir.display().to_string()
    } else {
        String::new()
    };

    web::Json(PathResponse{path})
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::permissive()) // 개발 중에는 permissive 허용
            .service(get_directory)
    })
        .bind(("127.0.0.1", 3001))?
        .run()
        .await
}