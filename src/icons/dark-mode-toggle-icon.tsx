import type { ComponentChildren, CSSProperties } from "preact";

interface CoreHtmlProps {
  readonly children?: ComponentChildren;
  readonly className?: string;
  readonly title?: string;
  readonly type?: string;
  readonly "aria-label"?: string;
}

interface BaseToggleProps extends CoreHtmlProps {
  readonly toggled?: boolean;
  readonly onToggled?: (toggled: boolean) => void;
  readonly duration?: number;
  readonly reversed?: boolean;
  readonly forceMotion?: boolean;
  readonly idPrefix?: string;
}

type ToggleProps = BaseToggleProps;

const ClassicIcon = ({ idPrefix }: { readonly idPrefix: string }) => {
  const clipId = `${idPrefix}a`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      class="theme-toggle__classic"
      viewBox="0 0 24 24"
    >
      <clipPath id={clipId}>
        <path d="M0 0h25a1 1 0 0 0 10 10v14H0Z" />
      </clipPath>
      <g stroke="currentColor" strokeLinecap="round" clipPath={`url(#${clipId})`}>
        <circle cx={12} cy={12} r={5} />
        <path
          fill="none"
          strokeLinejoin="round"
          strokeMiterlimit={0}
          strokeWidth={2}
          d="M12 1.4v2.4m8.3-.1-2.5 2.5m4.8 5.8h-2.4M12 22.6v-2.4M1.4 12h2.4m16.5 8.3-2.5-2.5M3.7 20.3l2.5-2.5M3.7 3.7l2.5 2.5"
          paintOrder="stroke markers fill"
        />
      </g>
    </svg>
  );
};

export const Classic = ({
  onToggled,
  toggled,
  duration = 500,
  reversed = false,
  title = "Toggle theme",
  forceMotion = false,
  idPrefix = "",
  "aria-label": ariaLabel = "Toggle theme",
  className,
  children,
}: ToggleProps) => {
  const classes = [
    "theme-toggle",
    toggled === true ? "theme-toggle--toggled" : undefined,
    toggled === false ? "theme-toggle--untoggled" : undefined,
    forceMotion ? "theme-toggle--force-motion" : undefined,
    reversed ? "theme-toggle--reversed" : undefined,
    className,
  ].join(" ");
  const style: CSSProperties = {
    "--theme-toggle__classic--duration": `${duration}ms`,
  };

  const handleClick = () => {
    onToggled?.(toggled !== true);
  };

  return (
    <button
      type="button"
      class={classes}
      aria-label={ariaLabel}
      title={title}
      onClick={handleClick}
      style={style}
    >
      {children}
      <ClassicIcon idPrefix={idPrefix} />
    </button>
  );
};
