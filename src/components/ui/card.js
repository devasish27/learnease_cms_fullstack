import React from "react";
import clsx from "clsx";

export function Card({ className, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-lg border bg-white p-4 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return (
    <div className={clsx("mb-4", className)} {...props} />
  );
}

export function CardTitle({ className, ...props }) {
  return (
    <h2
      className={clsx("text-lg font-medium leading-none", className)}
      {...props}
    > </h2>
  );
}

export function CardDescription({ className, ...props }) {
  return (
    <p
      className={clsx("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }) {
  return (
    <div className={clsx("text-sm", className)} {...props} />
  );
}
