import React from "react";
import { useFormContext } from "react-hook-form";

const Input = ({ label, type, name, validation }) => {
  const { register, formState: { errors },} = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <input type={type} {...register(name,validation)} />
      {/* {validation && <p>{validation.message}</p>} */}
      {errors[name] && <p style={{color:'red',fontSize:'small'}}>{errors[name].message}</p>}
    </div>
  );
};

export default Input;
