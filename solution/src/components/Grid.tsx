import { PropsWithChildren } from "react";

type LayoutProps = {
  style?: React.CSSProperties;
};

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ children, style, ...props }) => {
  return (
    <div
      style={{
        display: "grid",
        borderCollapse: "collapse",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        flexDirection: "column",
        gap: 1,
        padding: 1,
        width: "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

type AreaProps = {
  style?: React.CSSProperties;
};

const Area: React.FC<PropsWithChildren<AreaProps>> = ({ children, style, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        boxSizing: "border-box",
        margin: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default { Area, Layout };
