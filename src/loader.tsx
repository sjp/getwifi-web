import "./loader.css";

interface LoaderProps {
  size?: string | number;
  strokeWidth?: string | number;
  color?: string;
}

export const Loader = ({ size, strokeWidth, color }: Readonly<LoaderProps>) => {
  const resolvedSize = size || "48px";
  const resolvedStrokeWidth = strokeWidth || "5px";
  const resolvedColor = color || "#fff";

  return (
    <span
      className="loader"
      height={resolvedSize}
      width={resolvedSize}
      style={{
        borderLeftColor: resolvedColor,
        borderTopColor: resolvedColor,
        borderRightColor: resolvedColor,
        borderBottomColor: "transparent",
        borderWidth: resolvedStrokeWidth,
      }}
    ></span>
  );
};
