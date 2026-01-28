import { useState } from "react";


const AddSlider = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!preview) {
      alert("Please upload an image");
      return;
    }

    console.log("Slider image ready");
  };

  return (
    <div className="slider-container">
      <h5 className="slider-title">Add Slider Image</h5>

      <form className="slider-form" onSubmit={handleSubmit}>
         {preview && (
          <div className="preview-box">
            <img src={preview} alt="Preview" />
          </div>
        )}
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
          <span>Click to upload image</span>
        </label>

       

        <button className="upload-btn" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default AddSlider;
