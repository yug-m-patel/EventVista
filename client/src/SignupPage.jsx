import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function SignupPage() {
  const navigate = useNavigate();
  const handleSignup = async () => {
    console.log("hit line 10")
    // e.preventDefault();
      axios.post('http://localhost:5217/api/user/signup', {
        Name,
        Department,
        Year,
        Email,
        Password,
        Preferences: selectedFields,
      }).then((res)=>{
        if(res.status===200){
          console.log("User created successfully", res.data);
          navigate('/login')
        }


      }).catch((error)=>{
        console.log("Error creating user", error);
      });
      
  };
  const [selectedFields, setSelectedFields] = useState([]);
  const [showPreferences, setShowPreferences] = useState(false);
  const [Name, setName] = useState(""); // New state for Name
  const [Department, setDepartment] = useState(""); // New state for Department
  const [Year, setYear] = useState(""); // New state for Year of Studying
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isEditable, setIsEditable] = useState(true); // New state to control editability

  const handleFieldSelect = (field) => {
    setSelectedFields((prevSelectedFields) =>
      prevSelectedFields.includes(field)
        ? prevSelectedFields.filter((f) => f !== field)
        : [...prevSelectedFields, field]
    );
  };

  const handlePreferencesClick = () => {
    if (!Name) {
      setError("Please enter your name.");
      return;
    }
    if (!Department) {
      setError("Please enter your department.");
      return;
    }
    if (!Year) {
      setError("Please enter your year of studying.");
      return;
    }
    if (!Email) {
      setError("Please enter your email.");
      return;
    }
    if (!Password) {
        setError("Please enter your password.");
        return;
    }
    if (Password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setShowPreferences(!showPreferences);
    setIsEditable(false); // Make fields non-editable after valid input
  };

  const handleSave = () => {
    if (!Email) {
      setError("Please enter your email.");
      return;
    }
    if (Password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (selectedFields.length === 0) {
      setError("Please select at least one preference.");
      return;
    }

    setError("");
    console.log("Selected fields:", selectedFields);
    handleSignup();
    // Save preferences logic here
    // For now, simulate a successful save
    
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: '#f0f0f0',
    color: '#333',
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    textAlign: "left",
    fontWeight: "bold",
    color: '#333',
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    color: '#fff',
    backgroundColor: '#333',
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center" style={{ backgroundColor: '#f0f0f0' }}>
      <div className="container mx-auto flex max-w-md flex-col items-center px-4">
        <div className="mb-8 flex w-full items-center justify-center">
          <h1 className="text-3xl font-bold" style={{ color: '#333' }}>Sign Up</h1>
        </div>
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative">
                <label htmlFor="name" style={labelStyle}>Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                  disabled={!isEditable}
                />
              </div>
              <div className="relative">
                <label htmlFor="department" style={labelStyle}>Department</label>
                <input
                  id="department"
                  type="text"
                  placeholder="Department"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={Department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                  disabled={!isEditable}
                />
              </div>
              <div className="relative">
                <label htmlFor="year" style={labelStyle}>Year of Studying</label>
                <input
                  id="year"
                  type="text"
                  placeholder="Year of Studying"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={Year}
                  onChange={(e) => setYear(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                  disabled={!isEditable}
                />
              </div>
              <div className="relative">
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                  disabled={!isEditable}
                />
              </div>
              <div className="relative">
                <label htmlFor="password" style={labelStyle}>Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                  disabled={!isEditable}
                />
              </div>
              <div className="relative">
                <label htmlFor="confirm-password" style={labelStyle}>Confirm Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                  disabled={!isEditable}
                />
              </div>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="button"
              style={buttonStyle}
              onClick={handlePreferencesClick}
            >
              Preferences
            </button>
            {showPreferences && (
              <div style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "15px", textAlign: "left" }}>
                  <label style={labelStyle}>Favourite Fields</label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "10px" }}>
                    {["CSE", "Mechanical", "Electrical", "Architecture", "MBA", "BBA", "Agriculture", "Chemical", "Pharmacy"].map((field) => (
                      <div key={field} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field)}
                          onChange={() => handleFieldSelect(field)}
                        />
                        <label>{field}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  style={buttonStyle}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            )}
          </form>
          <div className="mt-4 text-center text-sm" style={{ color: '#333' }}>
            Already have an account? <NavLink to='/login' style={{ color: '#007BFF', textDecoration: 'underline', cursor: 'pointer' }}>Sign In</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
