import React from "react";

type BoxProps<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export default function Box<T extends React.ElementType = "div">({
  as,
  children,
  ...props
}: BoxProps<T>) {
  const Component = as || "div";

  return <Component {...props}>{children}</Component>;
}