import {
  forwardRef,
  type ReactNode,
  type MouseEventHandler,
} from "preact/compat";
import type { ComponentType, ComponentProps, JSX, Ref } from "preact";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ReactTag = keyof JSX.IntrinsicElements | ComponentType<any>;

interface CoreHtmlProps<Tag extends ReactTag> {
  onClick?: MouseEventHandler<EventTarget>;
  className?: string;
  title?: string;
  type?: string;
  children?: ReactNode;
  "aria-label"?: string;
}

export interface BaseToggleProps<TTag extends ReactTag>
  extends CoreHtmlProps<TTag> {
  toggled?: boolean;
  as?: TTag;
  onToggled?: (toggled: boolean) => void;
  duration?: number;
  reversed?: boolean;
  forceMotion?: boolean;
  idPrefix?: string;
  svgProps?: ComponentProps<"svg">;
}

export type ToggleProps<Tag extends ReactTag> = BaseToggleProps<Tag> &
  ComponentProps<Tag>;

const forwardRefWithAs = <T extends { name: string; displayName?: string }>(
  component: T
): T & { displayName: string } => {
  // biome-ignore lint/suspicious/noExplicitAny:
  return Object.assign(forwardRef(component as unknown as any) as any, {
    displayName: component.displayName ?? component.name,
  });
};

export const Classic = forwardRefWithAs(function Classic<
  Tag extends ReactTag = "button"
>(props: ToggleProps<Tag>, ref: Ref<Element>) {
  const {
    onToggled,
    toggled,
    duration = 500,
    reversed = false,
    title = "Toggle theme",
    forceMotion = false,
    onClick,
    style = {},
    idPrefix = "",
    as: Component = "button",
    "aria-label": ariaLabel = "Toggle theme",
    className,
    children,
    ...rest
  } = props;
  const classes = [
    "theme-toggle",
    toggled !== undefined && toggled ? "theme-toggle--toggled" : undefined,
    toggled !== undefined && !toggled ? "theme-toggle--untoggled" : undefined,
    forceMotion ? "theme-toggle--force-motion" : undefined,
    reversed ? "theme-toggle--reversed" : undefined,
    className,
  ].join(" ");
  style["--theme-toggle__classic--duration"] = `${duration}ms`;
  if (Component === "button" && !rest.type) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (rest as any).type = "button";
  }
  const handleClick: MouseEventHandler<EventTarget> = (e) => {
    onToggled?.(!toggled);
    onClick?.(e);
  };
  return (
    <Component
      ref={ref}
      class={classes}
      aria-label={ariaLabel}
      title={title}
      onClick={handleClick}
      style={style}
      {...rest}
    >
      {children}
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          class="theme-toggle__classic"
          viewBox="0 0 24 24"
          {...props.svgProps}
        >
          <clipPath id={`${props.idPrefix || ""}a`}>
            <path d="M0 0h25a1 1 0 0 0 10 10v14H0Z" />
          </clipPath>
          <g
            stroke="currentColor"
            strokeLinecap="round"
            clipPath={`url(#${props.idPrefix || ""}a)`}
          >
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
      }
    </Component>
  );
});
