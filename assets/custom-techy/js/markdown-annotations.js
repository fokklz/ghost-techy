// Main function to process code elements
function processCodeElements() {
  const preElements = document.querySelectorAll("pre");
  let index = 0;
  preElements.forEach((preElement) => {
    findAndMarkAnnotationsInCode(preElement, index);
    index++;
  });
}

// Function to find and mark annotations in code
function findAndMarkAnnotationsInCode(preElement, index) {
  const codeElement = preElement.querySelector("code");
  if (!codeElement) return;

  // Get full text and node info
  let { fullText, nodeInfoList } = getFullTextAndNodeInfo(codeElement);

  // First, find and collect bottom annotations (Option 2)
  const bottomAnnotationsRegex = /#(\d+)\?\?(.*?)(?=(\n#\d+\?\?|$))/gs;
  const bottomAnnotations = {};
  const bottomAnnotationMatches = [];
  let bottomMatch;
  while ((bottomMatch = bottomAnnotationsRegex.exec(fullText)) !== null) {
    const number = bottomMatch[1];
    const text = bottomMatch[2].trim();
    bottomAnnotations[number] = text;

    bottomAnnotationMatches.push({
      index: bottomMatch.index,
      length: bottomMatch[0].length,
    });
  }

  // Remove bottom annotations from code, processing in reverse order
  for (let i = bottomAnnotationMatches.length - 1; i >= 0; i--) {
    const { index: matchIndex, length: matchLength } =
      bottomAnnotationMatches[i];
    const startInfo = getNodeAndOffsetFromIndex(nodeInfoList, matchIndex);
    const endInfo = getNodeAndOffsetFromIndex(
      nodeInfoList,
      matchIndex + matchLength
    );

    // Remove from DOM
    const range = document.createRange();
    range.setStart(startInfo.node, startInfo.offset);
    range.setEnd(endInfo.node, endInfo.offset);
    range.deleteContents();
  }

  // Recompute fullText and nodeInfoList after removal
  const { fullText: updatedFullText, nodeInfoList: updatedNodeInfoList } =
    getFullTextAndNodeInfo(codeElement);

  // Find code annotations
  const codeAnnotationsRegex = /#::(\d+)?(.*)$/gm;
  const matches = [];
  let match;
  while ((match = codeAnnotationsRegex.exec(updatedFullText)) !== null) {
    matches.push({
      index: match.index,
      length: match[0].length,
      number: match[1],
      text: match[2].trim(),
    });
  }

  // Process matches in reverse order
  for (let i = matches.length - 1; i >= 0; i--) {
    const { index: matchIndex, length: matchLength, number, text } = matches[i];

    const startInfo = getNodeAndOffsetFromIndex(
      updatedNodeInfoList,
      matchIndex
    );
    const endInfo = getNodeAndOffsetFromIndex(
      updatedNodeInfoList,
      matchIndex + matchLength
    );

    let annotationText;
    if (number) {
      // Option 2
      annotationText = bottomAnnotations[number];
    } else {
      // Option 1
      annotationText = text;
    }

    if (!annotationText) {
      // No annotation text found; skip
      continue;
    }

    // Create a range covering the match
    const range = document.createRange();
    range.setStart(startInfo.node, startInfo.offset);
    range.setEnd(endInfo.node, endInfo.offset);

    // Get bounding rect
    const rect = range.getBoundingClientRect();
    const codeRect = preElement.getBoundingClientRect();

    const top = rect.top - codeRect.top + preElement.scrollTop;
    const left = rect.left - codeRect.left + preElement.scrollLeft;

    const marker = document.createElement("a");
    marker.id = `annotation-marker-${index}-${i}`;
    marker.className = "annotation-marker";
    marker.style.top = `${top - 2}px`;
    marker.style.left = `${left}px`;
    marker.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="19px" height="19px">
      <path fill="#2196f3" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"/>
      <path fill="#fff" d="M22 22h4v11h-4V22zM26.5 16.5c0 1.379-1.121 2.5-2.5 2.5s-2.5-1.121-2.5-2.5S22.621 14 24 14 26.5 15.121 26.5 16.5z"/>
    </svg>`;

    preElement.appendChild(marker);

    // Add the tooltip to the marker
    tippy(marker, {
      content: marked.parse(annotationText.replaceAll("\n", "\n\n")),
      placement: "right",
      allowHTML: true,
      interactive: true,
      hideOnClick: false,
      maxWidth: 300,
      appendTo: () => document.body,
      zIndex: 99999,
    });

    // Remove the annotation from the code
    range.deleteContents();
  }

  removeNewLines(codeElement);
}

// Function to remove extra newlines at the end of code
function removeNewLines(codeElement) {
  // After processing annotations, recompute fullText and nodeInfoList
  const { fullText: updatedFullText, nodeInfoList: updatedNodeInfoList } =
    getFullTextAndNodeInfo(codeElement);

  // Find the start index to trim
  const trimStartIndex = findStartIndexToTrim(updatedFullText);

  if (trimStartIndex !== null) {
    const startInfo = getNodeAndOffsetFromIndex(
      updatedNodeInfoList,
      trimStartIndex
    );
    const lastNodeInfo = updatedNodeInfoList[updatedNodeInfoList.length - 1];
    const endInfo = {
      node: lastNodeInfo.node,
      offset: lastNodeInfo.length,
    };

    // Create a range from startInfo to endInfo
    const range = document.createRange();
    range.setStart(startInfo.node, startInfo.offset);
    range.setEnd(endInfo.node, endInfo.offset);

    // Delete the contents of the range
    range.deleteContents();
  }
}

// Function to find where to start trimming extra newlines
function findStartIndexToTrim(fullText) {
  // Regex to find where more than one consecutive newline at the end starts
  let regex = /(?:\n\s*){2,}$/;
  let match = regex.exec(fullText);
  if (match) {
    return match.index + 1;
  } else {
    return null;
  }
}

// Function to build full text and node info
function getFullTextAndNodeInfo(element) {
  let fullText = "";
  const nodeInfoList = [];

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent;
      nodeInfoList.push({ node, length: textContent.length });
      fullText += textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach((child) => traverse(child));
    }
  }

  traverse(element);
  return { fullText, nodeInfoList };
}

// Function to map index to node and offset
function getNodeAndOffsetFromIndex(nodeInfoList, index) {
  let currentIndex = 0;
  for (const info of nodeInfoList) {
    if (currentIndex + info.length >= index) {
      return { node: info.node, offset: index - currentIndex };
    }
    currentIndex += info.length;
  }
  return null;
}

// Call the main function after the DOM is loaded
document.addEventListener("DOMContentLoaded", processCodeElements);
