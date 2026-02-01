
export const getPathFromSvg = (svgContent: string): string => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const path = doc.querySelector('path');
    return path ? path.getAttribute('d') || '' : '';
  } catch (e) {
    console.error("Error parsing SVG", e);
    return "";
  }
};
