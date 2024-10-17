// this code is largely a hack to ensure we get the 'real' element instead of JSX

export const getElement = <T extends Element>(element: T | null) => {
  if (!element) {
    return null;
  }

  // biome-ignore lint/suspicious/noExplicitAny: at this stage a ref might not actually an HTMLCanvasElement (or otherwise), but element.base is 🤷‍♂️ so try and use that instead
  const el = (element as unknown as any).base;
  return el || element;
};
