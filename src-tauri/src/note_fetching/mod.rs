use serde::{Deserialize, Serialize};
use std::fs;
//use tauri::command;

#[derive(Serialize, Deserialize)]
pub struct Content {
    title: String,
    text_blocks: Vec<String>,
}

#[tauri::command]
pub fn json_fetching() -> Result<Vec<Content>, String> {
    let path = "../DummyJson/json_reader_dummy.json"; // Adjust path if necessary
    let content = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let parsed: Vec<Content> = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    Ok(parsed)
}
