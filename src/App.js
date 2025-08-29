import React, { useState } from "react";
import "./App.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [formData, setFormData] = useState({});
  const [resume, setResume] = useState(null);

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    setResume(formData);
  };

  // Download PDF
  const downloadPDF = () => {
    const input = document.getElementById("resumePreview");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("resume.pdf");
    });
  };

  return (
    <div className="container">
      <h1>Resume Builder</h1>

      {/* Resume Form */}
      <form onSubmit={handleSubmit} className="resume-form">
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>Phone</label>
          <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleChange}
            placeholder="Enter your LinkedIn profile link"
          />
        </div>

        <div>
          <label>GitHub</label>
          <input
            type="text"
            name="github"
            value={formData.github || ""}
            onChange={handleChange}
            placeholder="Enter your GitHub profile link"
          />
        </div>

        <div>
          <label>Education</label>
          <input type="text" name="education" value={formData.education || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Skills</label>
          <input type="text" name="skills" value={formData.skills || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Work Experience</label>
          <textarea name="experience" value={formData.experience || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Projects</label>
          <textarea name="projects" value={formData.projects || ""} onChange={handleChange} />
        </div>

        <button type="submit" className="btn">Generate Resume</button>
      </form>

      {/* Resume Preview */}
      {resume && (
        <div id="resumePreview" className="resume-preview">
          <h2>{resume.name}</h2>
          <p><strong>Email:</strong> {resume.email}</p>
          <p><strong>Phone:</strong> {resume.phone}</p>
          <p><strong>LinkedIn:</strong> {resume.linkedin}</p>
          <p><strong>GitHub:</strong> {resume.github}</p>
          <hr />
          <h3>Education</h3>
          <p>{resume.education}</p>
          <h3>Skills</h3>
          <p>{resume.skills}</p>
          <h3>Work Experience</h3>
          <p>{resume.experience}</p>
          <h3>Projects</h3>
          <p>{resume.projects}</p>
        </div>
      )}

      {/* Download PDF */}
      {resume && (
        <button onClick={downloadPDF} className="btn">
          Download PDF
        </button>
      )}
    </div>
  );
}

export default App;
