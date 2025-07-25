use std::{fs, io};
use std::path::PathBuf;
use tauri_plugin_dialog::DialogExt;

struct FileInfo {
    directory: Vec<String>,
    file_path: Vec<String>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![
            get_user_directory,get_directory
        ])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
      .plugin(tauri_plugin_dialog::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
#[tauri::command]
fn get_user_directory() -> Option<String> {
    use dirs;
    let home = dirs::picture_dir();
    if let Some(home_path) = &home {
        println!("홈 디렉토리: {}", home_path.display());
    }

    
    home.map(|path| path.display().to_string())
}
#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct FolderData {
    types:String, //폴더 or 파일
    id:String,
    name:String,
    current_path:String, // 현재 경로
    items:Vec<FolderData>,
}

#[tauri::command]
fn get_directory(path:String) -> FolderData {
    println!("{}", path);
    let entries = fs::read_dir(&path).unwrap();


    let paths = entries
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, std::io::Error>>();

    let response_data:FolderData = FolderData {
        types: "folder".to_string(),
        id: "".to_string(),
        name: "".to_string(),
        current_path: path,
        items: vec![],
    };

    match paths {
        Ok(paths) => {
            for p in paths {
                if p.is_dir() {
                    let sub_dir = sub_classify_entry(&p).unwrap();
                    let file_info = sub_dir.file_path.len();
                    let dir_info = sub_dir.directory.len();

                }
            }
        }
        Err(e) => {
            eprintln!("경로 목록을 가져오는 데 실패했습니다: {e}");
        }
    }
    response_data
}

fn sub_classify_entry(path: &PathBuf) -> std::io::Result<FileInfo> {
    let entries = fs::read_dir(path)?; // Iterator<Item = Result<DirEntry, std::io::Error>>
    let paths = entries
        .map(|res| res.map(|e| e.path()))
        .collect::<Result<Vec<_>, std::io::Error>>();
    let mut  dir:Vec<String> = Vec::new();
    let mut  file:Vec<String> = Vec::new();

    match paths {
        Ok(d) => {
            for data in d {
                if data.is_dir() {
                    //println!("'{}'은 디렉토리 입니다.", path.display());
                    dir.push(path.display().to_string());
                } else {
                    //println!("'{}'은 파일 입니다.", path.display());

                    if let Some(ext) = path.extension() {
                        //println!("확장자: {:?}", ext);
                    }
                    file.push(path.display().to_string())
                }
            }
        }
        Err(_) => {}
    };



    Ok(FileInfo {
        directory: dir,
        file_path: file,
    })}



