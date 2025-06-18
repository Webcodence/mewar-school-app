// Optional shared JS functions across pages in future

// Auto-check for disabled school access (Kill Switch)
window.onload = function () {
  if (localStorage.getItem("school_access") === "disabled") {
    const currentPage = location.pathname.split("/").pop();
    if (currentPage === "school_panel.html") {
      alert("⚠️ Access denied: Admin has disabled school access.");
      window.location.href = "login.html";
    }
  }
};
