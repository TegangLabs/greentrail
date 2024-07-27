import React from "react";
import { useField } from "formik";

const CustomSelect = ({ label, classLabel, classSelect, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={classLabel}>{label}</label>
      <select
        {...field}
        {...props}
        className={`${
          meta.touched && meta.error ? "input-error" : ""
        } ${classSelect}`}
      />
      {meta.touched && meta.error && (
        <div className="error text-red-500">{meta.error}</div>
      )}
    </>
  );
};

export default CustomSelect;
