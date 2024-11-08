function initializeToC() {
  const contentElement = document.querySelector(".gh-content");
  contentElement.id = "start";
  if (contentElement) {
    const asideElement = document.createElement("aside");
    asideElement.className = "gh-sidebar";
    asideElement.innerHTML = '<div class="gh-toc" id="gh-toc"></div>';
    const firstChildElement = contentElement.firstElementChild;
    if (firstChildElement) {
      firstChildElement.insertAdjacentElement("beforebegin", asideElement);
    } else {
      contentElement.appendChild(asideElement);
    }

    const extraHeadingElement = document.querySelector(".gh-article-title");
    if (extraHeadingElement) {
      const extraHeadingText = extraHeadingElement.textContent;
      const hiddenTitle = document.createElement("h2");
      hiddenTitle.id = "start";
      hiddenTitle.textContent = extraHeadingText;
      hiddenTitle.style.display = "none";
      contentElement.prepend(hiddenTitle);
    }

    tocbot.init({
      tocSelector: ".gh-toc",
      contentSelector: ".gh-content",
      headingSelector: "h1,h2,h3,h4",
      hasInnerContainers: true,
      scrollSmoothOffset: -100,
      headingsOffset: 100,
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeToC);
