import fileSubmitEventHandler from "./js/fileSubmitEventHandler.js";
import "./scss/style.scss";

const uploadForm = document.getElementById("fileForm");

uploadForm.addEventListener("submit", fileSubmitEventHandler);
