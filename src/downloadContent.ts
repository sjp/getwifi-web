import { getSvgElement } from "./getSvgElement";

const downloadContent = (url: string, fileName: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const downloadSvg = (svg: SVGSVGElement | null) => {
  const svgNode = getSvgElement(svg);
  if (!svgNode) {
    return;
  }

  const svgData = new XMLSerializer().serializeToString(svgNode);
  const svgBlob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);
  downloadContent(svgUrl, "wifi-qrcode.svg");
  URL.revokeObjectURL(svgUrl);
};

export const downloadPng = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) {
    return;
  }

  const pngUrl = canvas.toDataURL("image/png");
  downloadContent(pngUrl, "wifi-qrcode.png");
  URL.revokeObjectURL(pngUrl);
};
