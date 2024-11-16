function doTrees() {
  const treeElement = document.querySelector(".tree");
  const { fullText, _ } = getFullTextAndNodeInfo(treeElement);
  let content = fullText.trim();

  const pattern = /^\W+{/gm;
  if (!pattern.test(content)) {
    content = `{ ${content} }`;
  }

  try {
    const parsedContent = parseJsLikeObject(content);
    treeElement.innerHTML = window.treeify.asTree(parsedContent, true);
    treeElement.classList.add("processed");
  } catch (error) {
    console.error(error);
  }
}

// Function to parse JS-like objects (e.g., { key: value }) into JSON
function parseJsLikeObject(jsLikeString) {
  try {
    const jsonCompatibleString = jsLikeString
      // Quote unquoted object keys
      .replace(/([{,]\s*)([a-zA-Z0-9_$\-\.]+)(\s*:)/g, '$1"$2"$3')
      // Keep `null`, `true`, `false`, and numbers as is, but quote unquoted strings
      .replace(/:\s*([a-zA-Z0-9_$\-\.]+)(?=\s*[},])/g, (match, value) => {
        // Keep null, booleans, and numbers unquoted
        if (["null", "true", "false"].includes(value) || !isNaN(value)) {
          return `: ${value}`;
        }

        // Quote strings
        return `: "${value}"`;
      });

    return JSON.parse(jsonCompatibleString);
  } catch (error) {
    console.error("Failed to parse JS-like object:", error);
    throw new SyntaxError("Invalid JS-like object structure.");
  }
}

document.addEventListener("DOMContentLoaded", doTrees);
