import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImg from "../assets/backgroundImg.jpg";


interface Job {
  companyName: string;
  role: string;
  status: "Applied" | "Interview" | "Rejected" | "Accepted";
  dateApp: Date;
  details?: string;
}

const Home: React.FC = () => {
  const [Jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

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

  const handleLogout= async()=>{
   localStorage.removeItem("user");
   sessionStorage.clear();

   navigate("/")
  }

  const handleDelete = (index: number) => {
    //=== Below I am confirming with the user if they want to delete the job application
    const isConfirmed = window.confirm("Are your sure you want to delete this Job Application?");
    if(!isConfirmed) return; //== here I am stopping the delete process if the user changes their minds

    const update = Jobs.filter((_, i) => i !== index);
    setJobs(update);
    localStorage.setItem("jobs", JSON.stringify(update));
    alert("Successfully Deleted");
  };

 
  const getStatusStyle = (status: Job["status"]): React.CSSProperties => {
    switch (status) {
      case "Applied":
        return {
          backgroundColor: "#094c9457", 
          color: "#1284fdff",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        };
      case "Interview":
        return {
          backgroundColor: "#aa81053b", 
          color: "#fac011ff",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        };
      case "Rejected":
        return {
          backgroundColor: "#f10b2233", 
          color: "#f00c0cff",
          fontWeight: "bold",
          padding: "5px 10px",
          borderRadius: "8px",
          textAlign: "center",
        };
      case "Accepted":
        return {
          backgroundColor: "#39f10b33", 
          color: "#14f00cff",
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
        <div style={{display: "inline-flex"}}>
        <h1>Applications Status Tracker</h1><button style={logoutBtn} onClick={handleLogout}>Log Out</button>
        </div>
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
                    <Link to="/editPa" style={addBTNst2}>Edit</Link>
                    <button style={delBTNst2} onClick={() => handleDelete(x)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div style={{display: "inline-flex"}}>
        <Link to="/addP" style={addBTNst}>
          Add
        </Link>
        </div>
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
  boxShadow: "5px 5px 5px #000000ff",
};

const addBTNst2: React.CSSProperties = {
  backgroundColor: "transparent",
  padding: "5px 10px",
  borderRadius: "3rem",
  borderColor: "#00a8e8",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#00a8e8",
  boxShadow: "5px 5px 5px #000000ff",
};

const delBTNst2: React.CSSProperties = {
  backgroundColor: "transparent",
  padding: "5px 10px",
  borderRadius: "3rem",
  borderColor: "#000000ff",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#f50e0eff",
  boxShadow: "5px 5px 5px #000000ff",
};

const logoutBtn: React.CSSProperties={
    backgroundColor: "transparent",
    height: "35px",
  borderRadius: "3rem",
  borderColor: "#00a6e84f",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#00a8e8",
  boxShadow: "5px 5px 5px #000000ff",
  position: "absolute",
  right: 10
}

const tblStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "10px 8px",
  textAlign: "left",
};
