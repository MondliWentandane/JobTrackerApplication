import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/backgroundImg.jpg";


interface Job {
  companyName: string;
  role: string;
  status: "Applied" | "Pending" | "Rejected";
  dateApp: Date;
  details?: string;
}

const Home: React.FC = () => {
  const [Jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("jobs");
    if (saved) {
      const parsed: Job[] = JSON.parse(saved).map((j: any) => ({
        ...j,
        dateApp: new Date(j.dateApp),
      }));
      setJobs(parsed);
    }
  }, []);

  const handleDelete = (index: number) => {
    const update = Jobs.filter((_, i) => i !== index);
    setJobs(update);
    localStorage.setItem("jobs", JSON.stringify(update));
    alert("Successfully Deleted");
  };

 
  const getStatusStyle = (status: Job["status"]): React.CSSProperties => {
    switch (status) {
      case "Applied":
        return {
          backgroundColor: "#007bff33", 
          color: "#007bff",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        };
      case "Pending":
        return {
          backgroundColor: "#ffc10733", 
          color: "#856404",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        };
      case "Rejected":
        return {
          backgroundColor: "#dc354533", 
          color: "#dc3545",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        };
      default:
        return {};
    }
  };

  return (
    <div style={mainStyle}>
      <div style={boxStyle}>
        <h1>Applications Status Tracker</h1>
        <hr />
        <table style={tblStyle}>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Job Title</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Additional Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Jobs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center" }}>
                  No Jobs Application added yet. Please press the add button
                  below on your <strong>Right hand side...</strong>
                </td>
              </tr>
            ) : (
              Jobs.map((a, x) => (
                <tr key={x}>
                  <td>{a.companyName}</td>
                  <td>{a.role}</td>
                  <td style={getStatusStyle(a.status)}>{a.status}</td>
                  <td>{a.dateApp.toLocaleDateString()}</td>
                  <td>{a.details}</td>
                  <td>
                    <button onClick={() => handleDelete(x)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Link to="/addP" style={addBTNst}>
          Add
        </Link>
      </div>
    </div>
  );
};

export default Home;

//===== Below are my styles ======
const mainStyle: React.CSSProperties = {
  color: "#e3e3e3",
  width: "99.5vw",
  height: "97vh",
  justifyContent: "center",
  alignContent: "center",
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${bgImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const boxStyle: React.CSSProperties = {
  width: "93%",
  height: "76%",
  marginLeft: "3%",
  position: "absolute",
  top: "13%",
  backdropFilter: "blur(11px)",
  boxShadow: "5px 5px 5px #00a8e8",
  padding: "20px",
  overflowY: "auto",
};

const addBTNst: React.CSSProperties = {
  backgroundColor: "#00a8e8",
  padding: "10px 20px",
  borderRadius: "3rem",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#e7e6e7",
  position: "absolute",
  bottom: 20,
  right: 20,
  boxShadow: "5px 5px 5px #000000ff",
};

const tblStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "10px 8px",
  textAlign: "left",
};
