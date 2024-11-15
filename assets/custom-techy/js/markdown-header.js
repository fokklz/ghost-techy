// Function to get the language label from the code class
function getLanguageLabel(className) {
  const languageMap = {
    "language-bash": "Bash",
    "language-sh": "Shell",
    "language-shell": "Shell",
    "language-zsh": "Zsh",
    "language-yaml": "YAML",
    "language-json": "JSON",
    "language-dockerfile": "Dockerfile",
    "language-docker": "Docker",
    "language-nginx": "Nginx",
    "language-apache": "Apache",
    "language-ini": "INI",
    "language-properties": "Properties",
    "language-toml": "TOML",
    "language-javascript": "JavaScript",
    "language-js": "JavaScript",
    "language-typescript": "TypeScript",
    "language-ts": "TypeScript",
    "language-python": "Python",
    "language-py": "Python",
    "language-html": "HTML",
    "language-css": "CSS",
    "language-scss": "SCSS",
    "language-sass": "Sass",
    "language-php": "PHP",
    "language-ruby": "Ruby",
    "language-rb": "Ruby",
    "language-java": "Java",
    "language-kotlin": "Kotlin",
    "language-go": "Go",
    "language-rust": "Rust",
    "language-c": "C",
    "language-cpp": "C++",
    "language-csharp": "C#",
    "language-cs": "C#",
    "language-swift": "Swift",
    "language-objectivec": "Objective-C",
    "language-objc": "Objective-C",
    "language-r": "R",
    "language-perl": "Perl",
    "language-lua": "Lua",
    "language-sql": "SQL",
    "language-mysql": "MySQL",
    "language-plsql": "PL/SQL",
    "language-graphql": "GraphQL",
    "language-vue": "Vue.js",
    "language-react": "React JSX",
    "language-tsx": "React TSX",
    "language-markdown": "Markdown",
    "language-md": "Markdown",
    "language-vim": "Vim Script",
    "language-powershell": "PowerShell",
    "language-ps1": "PowerShell",
    "language-batch": "Batch",
    "language-bat": "Batch",
    "language-groovy": "Groovy",
    "language-haskell": "Haskell",
    "language-elixir": "Elixir",
    "language-erlang": "Erlang",
    "language-clojure": "Clojure",
    "language-lisp": "Lisp",
    "language-matlab": "MATLAB",
    "language-fortran": "Fortran",
    "language-assembly": "Assembly",
    "language-rust": "Rust",
    "language-dart": "Dart",
    "language-scala": "Scala",
    "language-sml": "Standard ML",
    "language-fsharp": "F#",
    "language-prolog": "Prolog",
    "language-racket": "Racket",
    "language-coffeescript": "CoffeeScript",
    "language-livecode": "LiveCode",
    "language-stylus": "Stylus",
  };

  return languageMap[className] || "Code"; // Default label if class isn't found
}

// Function to apply headers to code blocks
function initializeHeaders() {
  let copyIndex = 0;
  document.querySelectorAll("pre").forEach((pre) => {
    const codeChild = Array.from(pre.children).find(
      (child) => child.tagName.toLowerCase() === "code"
    );

    if (codeChild) {
      let copyId = `copy-${copyIndex}`;
      codeChild.id = copyId;

      // Create a wrapper div
      const wrapper = document.createElement("div");
      wrapper.classList.add("code-wrapper");
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      const innerWrapper = document.createElement("div");
      innerWrapper.classList.add("code-wrapper-header");

      // Get language label from code class
      const languageClass = Array.from(codeChild.classList).find((cls) =>
        cls.startsWith("language-")
      );
      const languageLabel = getLanguageLabel(languageClass);

      // Create the language label span
      const languageSpan = document.createElement("span");
      languageSpan.classList.add("language-label");
      languageSpan.innerText = languageLabel;

      // Create the copy button
      const copyButton = document.createElement("button");
      copyButton.innerHTML = "Copy";
      copyButton.classList.add("copy-btn");
      copyButton.setAttribute("data-clipboard-target", `#${copyId}`);

      // Add the language label and copy button to the wrapper
      innerWrapper.appendChild(languageSpan);
      innerWrapper.appendChild(copyButton);
      wrapper.prepend(innerWrapper);
    }

    copyIndex++;
  });

  // Initialize copy buttons
  new ClipboardJS(".copy-btn");
}

document.addEventListener("DOMContentLoaded", initializeHeaders);
