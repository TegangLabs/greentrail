import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, classLabel, classInput, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label className={classLabel}>{label}</label>
      <input
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "input-error" : ""
        } ${classInput}`}
      />
      {meta.touched && meta.error && (
        <div className="text-red-600 text-xs md:text-sm">{meta.error}</div>
      )}
    </>
  );
};

export default CustomInput;
