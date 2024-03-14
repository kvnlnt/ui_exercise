import React, { PropsWithChildren, useRef } from "react";
import { DESKTOP_BREAKPOINT } from "src/config";
import { useHover, useMediaQuery } from "usehooks-ts";

type ButtonProps = {
  type: "submit" | "button" | "reset";
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ type, ...props }) => {
  const isDesktop = useMediaQuery(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
  const hoverRef = useRef(null);
  const isHover = useHover(hoverRef);
  return (
    <button
      ref={hoverRef}
      style={{
        backgroundColor: "#01a29e",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontSize: 14,
        fontWeight: "bold",
        opacity: isHover ? 0.8 : 1,
        padding: "15px 30px",
        textTransform: "uppercase",
        transition: "all 0.3s",
        width: isDesktop ? "fit-content" : "100%",
      }}
      type={type}
      {...props}
    />
  );
};

const ErrorMessage: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255, 0, 0, 0.1)",
        borderTop: "1px solid rgba(0, 0, 0, 0.2)",
        color: "red",
        fontSize: 12,
        fontWeight: "bold",
        padding: 5,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

type InputProps = {
  name: string;
  type: HTMLInputElement["type"];
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
};

const Input: React.FC<PropsWithChildren<InputProps>> = React.forwardRef(({ onInput, ...props }, ref) => {
  return (
    <input
      onInput={onInput}
      ref={ref as any}
      style={{
        padding: "0 10px 10px",
        fontSize: 16,
        border: "none",
      }}
      {...props}
    />
  );
});

const FieldSet: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <fieldset
      style={{
        border: "none",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        backgroundColor: "white",
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      }}
      {...props}
    >
      {children}
    </fieldset>
  );
};

type LabelProps = {
  htmlFor?: string;
};

const Label: React.FC<PropsWithChildren<LabelProps>> = ({ children, ...props }) => {
  return (
    <label
      style={{
        color: "rgba(0, 0, 0, 0.7)",
        fontSize: 12,
        fontWeight: "bold",
        padding: 5,
      }}
      {...props}
    >
      {children}
    </label>
  );
};

type RadioProps = {
  defaultChecked?: boolean;
  label: string;
  name: string;
  onClick?: (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void;
  value: string;
};

const Radio: React.FC<PropsWithChildren<RadioProps>> = ({
  defaultChecked,
  children,
  label,
  name,
  onClick,
  value,
  ...props
}) => {
  return (
    <label
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "row",
        gap: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <input defaultChecked={defaultChecked} type="radio" name={name} style={{ height: 28 }} value={value} />
      <div style={{ fontSize: 14, lineHeight: 2 }}>{label}</div>
    </label>
  );
};

const RadioGroup: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

type RootProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Root: React.FC<PropsWithChildren<RootProps>> = ({ children, onSubmit, ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
      {...props}
    >
      {children}
    </form>
  );
};

const Section: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default {
  Button,
  ErrorMessage,
  FieldSet,
  Input,
  Label,
  Radio,
  RadioGroup,
  Root,
  Section,
};
