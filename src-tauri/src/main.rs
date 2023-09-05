// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{AppHandle, Manager};

fn main() {
  let context = tauri::generate_context!();

  let mut builder = tauri::Builder::default();

  builder = builder
    .plugin(tauri_plugin_store::Builder::default().build());

  builder = builder
    .invoke_handler(tauri::generate_handler![
      drag_window,
    ]);

  builder
    .run(context)
    .expect("error while running tauri application");
}

#[tauri::command]
fn drag_window(app: AppHandle) {
  app.get_window("main").unwrap().start_dragging().unwrap()
}
