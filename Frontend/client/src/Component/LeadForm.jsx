import { useState } from "react";
import api from "../api";
import "./LeadForm.css";
import { useNavigate } from "react-router-dom";

const LeadForm = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    source: "website",
    campaignName: "",
    keyword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/api/leads/website", formData);

    alert(res.data.message || "Lead submitted successfully");

    navigate("/");

    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      source: "website",
      campaignName: "",
      keyword: "",
    });
  } catch (error) {
    const backendMessage =
      error.response?.data?.message || "Something went wrong";

    alert(backendMessage);
  }
};

  return (
    <div className="lead-form-wrapper">
      <div className="card lead-card shadow-lg">
        <div className="card-body">
          <h3 className="text-center mb-4 lead-title">
             Get a Free Consultation
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Service */}
              <div className="col-md-6">
                <label className="form-label">Service Interested In</label>
                <select
                  name="service"
                  className="form-select"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option value="">Select Service</option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="SEO">SEO</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>

              {/* Campaign */}
              <div className="col-md-6">
                <label className="form-label">Campaign Name</label>
                <input
                  type="text"
                  name="campaignName"
                  className="form-control"
                  placeholder="Google Ads / Instagram"
                  value={formData.campaignName}
                  onChange={handleChange}
                />
              </div>

              {/* Keyword */}
              <div className="col-md-6">
                <label className="form-label">Keyword</label>
                <input
                  type="text"
                  name="keyword"
                  className="form-control"
                  placeholder="Best Web Agency"
                  value={formData.keyword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary btn-lg">
                Submit 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;
