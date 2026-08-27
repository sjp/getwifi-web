const downloadContent = (url: string, fileName: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

// Builds a filesystem-safe filename from the SSID, e.g. "wifi-My Cafe-qrcode.svg".
export const qrFileName = (ssid: string, extension: string): string => {
  const safe = ssid
    .replace(/[<>:"/\\|?*]/g, "")
    .trim()
    .slice(0, 100);
  return `wifi${safe ? `-${safe}` : ""}-qrcode.${extension}`;
};

export const downloadSvg = (svg: SVGSVGElement | null, fileName: string) => {
  if (!svg) {
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  downloadContent(svgUrl, fileName);
  URL.revokeObjectURL(svgUrl);
};

export const downloadPng = (canvas: HTMLCanvasElement | null, fileName: string) => {
  if (!canvas) {
    return;
  }

  const pngUrl = canvas.toDataURL("image/png");
  downloadContent(pngUrl, fileName);
};
