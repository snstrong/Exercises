import React, { useState } from "react";

const NewBoxForm = ({ addBox }) => {
  const INITIAL_STATE = {
    width: "100",
    height: "100",
    backgroundColor: "#7300ff",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBox({ ...formData });
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="width">Width (px): </label>
      <input
        required
        id="width"
        type="number"
        name="width"
        min={50}
        max={500}
        value={formData.width}
        onChange={handleChange}
      />
      <label htmlFor="height">Height (px): </label>
      <input
        required
        id="height"
        type="number"
        name="height"
        min={50}
        max={500}
        value={formData.height}
        onChange={handleChange}
      />
      <label htmlFor="backgroundColor">Background Color: </label>
      <input
        required
        id="backgroundColor"
        type="color"
        name="backgroundColor"
        value={formData.backgroundColor}
        onChange={handleChange}
      />
      <button>Add Box</button>
    </form>
  );
};

export default NewBoxForm;
