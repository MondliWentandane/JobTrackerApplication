import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import bgImg from "../assets/backgroundImg.jpg";

interface Job {
  companyName: string;
  role: string;
  status: "Applied" | "Interview" | "Rejected" | "Accepted";
  dateApp: Date;
  details?: string;
}

const EditStatus: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied");
  const [theDate, setDate] = useState("");
  const [moreDet, setMoreDet] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Get job index from URL params (you'll need to pass this when navigating)
  const { jobIndex } = useParams<{ jobIndex: string }>();
  const navigate = useNavigate();

  // Load job data when component mounts
  useEffect(() => {
    loadJobData();
  }, [jobIndex]);

  const loadJobData = () => {
    try {
      const existing = localStorage.getItem("jobs");
      if (!existing) {
        setError("No job applications found.");
        return;
      }

      const applications: Job[] = JSON.parse(existing);
      const index = parseInt(jobIndex || "0");

      if (index < 0 || index >= applications.length) {
        setError("Job application not found.");
        return;
      }

      const job = applications[index];
      
      // Populate form with existing data
      setCompanyName(job.companyName);
      setRole(job.role);
      setStatus(job.status);
      setMoreDet(job.details || "");
      
      // Handle date conversion
      const date = new Date(job.dateApp);
      const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      setDate(formattedDate);
      
      setError("");
    } catch (error) {
      setError("Error loading job data.");
      console.error("Error loading job data:", error);
    }
  };

  const updateStatus = () => {
    if (!status) {
      setError("Please select a status.");
      return;
    }

    try {
      const existing = localStorage.getItem("jobs");
      if (!existing) {
        setError("No job applications found.");
        return;
      }

      const applications: Job[] = JSON.parse(existing);
      const index = parseInt(jobIndex || "0");

      if (index < 0 || index >= applications.length) {
        setError("Job application not found.");
        return;
      }

      // Update only the status, keep other data the same
      applications[index] = {
        ...applications[index],
        status: status,
        // Optional: Update date to current date when status changes
        // dateApp: new Date(),
      };

      localStorage.setItem("jobs", JSON.stringify(applications));
      
      setSuccess("Status updated successfully!");
      setError("");

      // Redirect back to jobs list after 2 seconds
      setTimeout(() => {
        navigate("/dispJobsD");
      }, 2000);

    } catch (error) {
      setError("Error updating status.");
      console.error("Error updating status:", error);
    }
  };

  const handleCancel = () => {
    navigate("/dispJobsD");
  };

  return (
    <div style={mainStyle}>
      <div style={boxStyle}>
        <h1>Edit Application Status</h1>
        <hr />
        
        {error && <div style={errorStyle}>{error}</div>}
        {success && <div style={successStyle}>{success}</div>}
        
        <table style={tblStyle}>
          <tbody>
            <tr>
              <td>
                <label>
                  Company Name: <br />
                  <input
                    type="text"
                    value={companyName}
                    readOnly
                    style={{...inputSt, ...readOnlyStyle}}
                    title="This field is read-only"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Role: <br />
                  <input
                    type="text"
                    value={role}
                    readOnly
                    style={{...inputSt, ...readOnlyStyle}}
                    title="This field is read-only"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label style={editableLabelStyle}>
                  Status (Editable): <br />
                  <select
                    value={status}
                    onChange={(x) => setStatus(x.target.value as Job["status"])}
                    style={{...inputSt, ...editableStyle}}>
                      <option value="Applied">Applied</option>
                      <option value="Interview">Interview</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Accepted">Accepted</option>
                  </select>
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Date Applied: <br />
                  <input
                    type="date"
                    value={theDate}
                    readOnly
                    style={{...inputSt, ...readOnlyStyle}}
                    title="This field is read-only"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Additional Details: <br />
                  <input
                    type="text"
                    value={moreDet}
                    readOnly
                    style={{...inputSt, ...readOnlyStyle}}
                    title="This field is read-only"
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button 
                  style={btnStyle} 
                  onClick={updateStatus}
                  disabled={!!success}
                >
                  Update
                </button>
                <button 
                  style={cancelBtnStyle} 
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <Link to="/dispJobsD" style={addBTNst}>
          Back to Jobs
        </Link>
      </div>
    </div>
  );
};

export default EditStatus;

// ====== Existing styles ======
const mainStyle: React.CSSProperties = {
  backgroundColor: "#e6ffabff",
  width: "99.5vw",
  height: "97vh",
  justifyContent: "center",
  alignContent: "center",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  color: "#e3e3e3",
};

const boxStyle: React.CSSProperties = {
  width: "53%",
  height: "76%",
  marginLeft: "25%",
  position: "absolute",
  top: "10%",
  textAlign: "center",
  backdropFilter: "blur(13px)",
  boxShadow: "5px 5px 5px #00a8e8",
  borderRadius: "2rem",
};

const addBTNst: React.CSSProperties = {
  backgroundColor: "transparent",
  padding: "20px 20px",
  borderRadius: "3rem",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#e7e6e7",
  position: "absolute",
  bottom: 20,
  right: 20,
  boxShadow: "1px 1px 6px 1px #00a8e8",
  borderColor: "#00a8e8",
};

const inputSt: React.CSSProperties = {
  width: "145%",
  height: "1rem",
  borderRadius: "0.5rem",
};

const tblStyle: React.CSSProperties = {
  textAlign: "left",
  marginLeft: "10%",
};

const btnStyle: React.CSSProperties = {
  backgroundColor: "#000000ff",
  color: "#f7f7f7ff",
  borderRadius: "8px",
  borderColor: "transparent",
  boxShadow: "3px 3px 3px #6f816bff",
  padding: "10px 20px",
  width: "130px",
  height: "30px",
  marginLeft: "5rem",
  marginTop: "1rem",
  fontSize: "16px",
  lineHeight: "3px",
  cursor: "pointer",
  marginRight: "10px"
};

// ====== New styles for edit functionality ======
const readOnlyStyle: React.CSSProperties = {
  backgroundColor: "#f5f5f5",
  color: "#666",
  cursor: "not-allowed",
  opacity: 0.7,
  border: "1px solid #ccc"
};

const editableStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  border: "2px solid #00a8e8",
  boxShadow: "0 0 5px rgba(0, 168, 232, 0.3)"
};

const editableLabelStyle: React.CSSProperties = {
  color: "#00a8e8",
  fontWeight: "bold"
};

const cancelBtnStyle: React.CSSProperties = {
  backgroundColor: "#dc3545",
  color: "#f7f7f7ff",
  borderRadius: "8px",
  borderColor: "transparent",
  boxShadow: "3px 3px 3px #6f816bff",
  padding: "10px 20px",
  width: "100px",
  height: "30px",
  marginTop: "1rem",
  fontSize: "16px",
  lineHeight: "3px",
  cursor: "pointer"
};

const errorStyle: React.CSSProperties = {
  backgroundColor: "#ffebee",
  color: "#c62828",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ef5350",
  marginBottom: "15px",
  width: "80%",
  marginLeft: "10%",
  textAlign: "center"
};

const successStyle: React.CSSProperties = {
  backgroundColor: "#e8f5e8",
  color: "#2e7d32",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #4caf50",
  marginBottom: "15px",
  width: "80%",
  marginLeft: "10%",
  textAlign: "center"
};