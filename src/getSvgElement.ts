export const getSvgElement = (svg: SVGSVGElement | null) => {
  if (!svg) {
    return null;
  }

  // biome-ignore lint/suspicious/noExplicitAny: at this stage a ref might not actually an SVGSVGElement, but svg.base is :shrug: so try and use that instead
  const svgEl = (svg as unknown as any).base;
  return svgEl || svg;
};

export const getCanvasElement = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) {
    return null;
  }

  // biome-ignore lint/suspicious/noExplicitAny: at this stage a ref might not actually an HTMLCanvasElement, but canvas.base is :shrug: so try and use that instead
  const canvasEl = (canvas as unknown as any).base;
  return canvasEl || canvas;
};
