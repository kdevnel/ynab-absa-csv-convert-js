/**
 * Resets errors and preview on each new file submission
 */
function resetPage() {
  document.getElementById("filePreview").innerHTML = "";
  document.getElementById("errorMessages").innerHTML = "";
  document.getElementById("downloadLinkContainer").innerHTML = "";
}

export default resetPage;
