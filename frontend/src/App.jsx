import { useState } from "react";
import axios from "axios";
import "./App.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("productImage", image);

    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/generate`,
        formData
      );

      const id = response.data.jobId;

      const jobResponse = await axios.get(
        `${API}/jobs/${id}`
      );

      setJob(jobResponse.data);

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">

      <h1>GlitrAI Mini Content Engine</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">
          Generate
        </button>

      </form>

      {loading && <h3>Generating...</h3>}

      {job && (

        <div className="card">

          <h2>{job.product_name}</h2>

          <p>{job.description}</p>

          <p><b>Status:</b> {job.status}</p>

          <h3>AI Generated Prompt</h3>

          <p style={{ marginBottom: "15px" }}>
            {job.prompt}
          </p>

          {job.image_url && (
            <img
              src={`${API}${job.image_url}`}
              alt="Generated"
            />
          )}

        </div>

      )}

    </div>
  );
}

export default App;