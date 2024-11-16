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
