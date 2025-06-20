import { forwardRef } from "preact/compat";

export const EmptyQrSvg = forwardRef<SVGSVGElement>((_props, ref) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: not needed, just an icon
    <svg ref={ref} height="100%" width="100%" viewBox="0 0 33 33">
      <path fill="#FFFFFF" d="M0,0 h33v33H0z" shape-rendering="crispEdges" />
      <path d="m 4,4 h 7 V 5 H 4 Z M 4,5 H 5 V 6 H 4 Z m 6,0 h 1 V 6 H 10 Z M 4,6 H 5 V 7 H 4 Z m 6,0 h 1 V 7 H 10 Z M 4,7 H 5 V 8 H 4 Z m 6,0 h 1 V 8 H 10 Z M 4,8 H 5 V 9 H 4 Z m 6,0 h 1 V 9 H 10 Z M 4,9 h 1 v 1 H 4 Z m 6,0 h 1 v 1 h -1 z m -6,1 h 7 v 1 H 4 Z M 22,4 h 7 v 1 h -7 z m 0,1 h 1 v 1 h -1 z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 h -1 z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 h -1 z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 h -1 z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 h -1 z m 6,0 h 1 v 1 h -1 z m -6,1 h 7 v 1 H 22 Z M 6,6 H 9 V 7 H 6 Z M 6,7 H 9 V 8 H 6 Z M 6,8 H 9 V 9 H 6 Z M 24,6 h 3 v 1 h -3 z m 0,1 h 3 v 1 h -3 z m 0,1 h 3 V 9 H 24 Z M 4,22 h 7 v 1 H 4 Z m 0,1 h 1 v 1 H 4 Z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 H 4 Z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 H 4 Z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 H 4 Z m 6,0 h 1 v 1 h -1 z m -6,1 h 1 v 1 H 4 Z m 6,0 h 1 v 1 h -1 z m -6,1 h 7 v 1 H 4 Z m 2,-4 h 3 v 1 H 6 Z m 0,1 h 3 v 1 H 6 Z m 0,1 h 3 v 1 H 6 Z" />
    </svg>
  );
});
