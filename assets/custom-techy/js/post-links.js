document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".gh-content a").forEach((link) => {
    // classes which should not open in a new tab
    const hasRequiredClass =
      link.classList.contains("gh-card-link") ||
      link.classList.contains("gh-portal-close") ||
      link.classList.contains("gh-button") ||
      link.classList.contains("gh-article-tag") ||
      link.classList.contains("kg-btn") ||
      link.classList.contains("gh-navigation-logo") ||
      // classes added by this theme
      link.classList.contains("annotation-marker") ||
      link.classList.contains("toc-link");

    // if there is a nav or gh-article-meta parent, do not open in a new tab
    const closest = link.closest("nav") || link.closest(".gh-article-meta");

    if (!hasRequiredClass && closest == null) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    }
  });
});
