"use client";

import React, { ComponentProps } from "react";
//@ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({ children, className, ...props }: Props) => {
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type="submit"
      className={`btn btn-primary ${className}`}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;
