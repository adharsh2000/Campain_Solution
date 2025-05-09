import React from "react";
import { useFormContext } from "react-hook-form";

const Textarea = ({ label, name, validation }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label>{label}</label>
      <textarea
       
        {...register(name, validation)}
      ></textarea>
      {errors[name] && <p style={{color:'red',fontSize:'small'}}>{errors[name].message}</p>}
    </div>
  );
};

export default Textarea;
