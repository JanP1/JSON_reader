use serde::{Deserialize, Serialize};
use std::fs;
//use tauri::command;

#[derive(Serialize, Deserialize)]
#[serde(rename_all="camelCase")]
pub struct Style {
    color: Option<String>,
    font_size: Option<String>,
    font_weight: Option<String>,
    width: Option<String>,
    border_radius: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct Block {
    content_type: String,
    value: String,
    style: Style,
}

#[tauri::command]
pub fn json_fetching() -> Result<Vec<Block>, String> {
    let path = "../DummyJson/json_reader_dummy.json"; 
    let content = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let parsed: Vec<Block> = serde_json::from_str(&content).map_err(|e| e.to_string())?;
    Ok(parsed)
}
