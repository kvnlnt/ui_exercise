import { PropsWithChildren } from "react";
import { DESKTOP_BREAKPOINT } from "src/config";

const Desc: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <p style={{ padding: 0, margin: 0, fontSize: 16 }} {...props}>
      {children}
    </p>
  );
};

const Header: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const Main: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const Root: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: 20,
        maxWidth: DESKTOP_BREAKPOINT,
      }}
      {...props}
    >
      {children}
    </section>
  );
};

type TitleProps = {
  style?: React.CSSProperties;
};

const Title: React.FC<PropsWithChildren<TitleProps>> = ({ children, style }) => {
  return <h1 style={{ fontWeight: 700, fontSize: 32, margin: 0, padding: 0, ...style }}>{children}</h1>;
};

export default { Desc, Header, Main, Root, Title };
