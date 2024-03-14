import { PropsWithChildren } from "react";

const Caption: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <figcaption
      style={{
        display: "flex",
        flexDirection: "column",
        fontWeight: "bold",
        gap: 20,
      }}
      {...props}
    >
      {children}
    </figcaption>
  );
};

type ImageProps = {
  src: string;
  alt: string;
  style?: React.CSSProperties;
};

const Image: React.FC<PropsWithChildren<ImageProps>> = ({ style, ...props }) => {
  return <img style={{ width: "100%", ...style }} {...props} />;
};

type RootProps = {
  style?: React.CSSProperties;
};

const Root: React.FC<PropsWithChildren<RootProps>> = ({ children, style, ...props }) => {
  return (
    <figure
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        margin: 0,
        padding: 0,
        ...style,
      }}
      {...props}
    >
      {children}
    </figure>
  );
};

export default {
  Caption,
  Image,
  Root,
};
