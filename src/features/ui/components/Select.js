import React from "react";
import { useFormContext } from "react-hook-form";

const Select = ({ label, name, options, validation }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <select {...register(name, validation)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && <p style={{color:'red',fontSize:'small'}}>{errors[name].message}</p>}
    </div>
  );
};

export default Select;
