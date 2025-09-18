import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImg from "../assets/backgroundImg.jpg"

interface Job {
  companyName: string;
  role: string;
  status: "Applied" | "Pending" | "Rejected";
  dateApp: Date;
  details?: string;
}

const Adding: React.FC = () => {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Job["status"]>("Applied"); 
  const [theDate, setDate] = useState("");
  const [moreDet, setMoreDet] = useState("");

  const submitForm = () => {
    const newApplication: Job = {
      companyName,
      role,
      status,
      dateApp: new Date(theDate),
      details: moreDet,
    };

    const existing = localStorage.getItem("jobs");
    const applications: Job[] = existing ? JSON.parse(existing) : [];
    applications.push(newApplication);

    localStorage.setItem("jobs", JSON.stringify(applications));

    setCompanyName("");
    setRole("");
    setStatus("Applied");
    setDate("");
    setMoreDet("");
  };

  return (
    <div style={mainStyle}>
      <div style={boxStyle}>
        <h1>Add Job Application</h1>
        <hr />
        <table style={tblStyle}>
          <tbody>
            <tr>
              <td>
                <label>
                  Company Name: <br />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(x) => setCompanyName(x.target.value)}
                    style={inputSt}
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
                    onChange={(x) => setRole(x.target.value)}
                    style={inputSt}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Status: <br />
                  <input
                    type="text"
                    value={status}
                    onChange={(x) =>
                      setStatus(x.target.value as Job["status"])
                    }
                    style={inputSt}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Date: <br />
                  <input
                    type="date"
                    value={theDate}
                    onChange={(x) => setDate(x.target.value)}
                    style={inputSt}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  Additional Details (optional): <br />
                  <input
                    type="text"
                    value={moreDet}
                    onChange={(x) => setMoreDet(x.target.value)}
                    style={inputSt}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td>
                <button style={btnStyle} onClick={submitForm}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <Link to="/dispJobsD" style={addBTNst}>
          Back
        </Link>
      </div>
    </div>
  );
};

export default Adding;

// ---------- styles ----------
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
  height: "70%",
  marginLeft: "25%",
  position: "absolute",
  top: "13%",
  textAlign: "center",
  backdropFilter: "blur(13px)",
  boxShadow: "5px 5px 5px #00a8e8",
  borderRadius: "2rem"
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
  borderColor: "#00a8e8"
};

const inputSt: React.CSSProperties = {
  width: "145%",
  height: "1.5rem",
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
  marginLeft: "9rem",
  marginTop: "1rem",
  fontSize: "20px",
  lineHeight: "3px",
};

