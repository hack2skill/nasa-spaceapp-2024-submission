import React, { useState } from 'react';
import ErrorIcon from '../../assets/images/icons/exclamation.svg';
import './CreateUser.css';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

function CreateUser() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    designation: "",
    number: "",
  });

  const [errors, setErrors] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    setIsError(false); 
    setErrors("");
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhone = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };
  const handleNumberInput = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  const submit = (event) => {
    event.preventDefault();
    
    if (!userData.fname || !userData.lname || !userData.email || !userData.number || !userData.designation) {
      setIsError(true);
      setErrors("Please fill all Details!");
      return;
    }

    if (!isValidEmail(userData.email)) {
      setIsError(true);
      setErrors("Invalid Email!");
      return;
    }

    if (!isValidPhone(userData.number)) {
      setIsError(true);
      setErrors("Invalid Phone Number!");
      return;
      }
    if(userData.email === JSON.parse(localStorage.getItem('UserData')).email){
      setIsError(true);
      setErrors("Email already exists!");
    }
    else {
      localStorage.setItem('UserData', JSON.stringify(userData));
      localStorage.setItem('isAuth', true);
      navigate("/");
    }
  };

  return (
    <form action="" className="create--user section-p" onSubmit={submit}>
      <h2 className="title">Create User</h2>
      <p className="sub--title">Create a New User Profile</p>
  
      <div className="form--group-1">
        <input 
          type="text" 
          name="fname" 
          placeholder="First Name" 
          onChange={handleChange} 
          value={userData.fname}
        />
        
        <input 
          type="text" 
          name="lname" 
          placeholder="Last Name" 
          onChange={handleChange} 
          value={userData.lname}
        />
      </div>

      <div className="form--group-2">
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          value={userData.email}
        />
        
        <input 
          type="tel" 
          name="number" 
          placeholder="Contact Number" 
          onKeyPress={handleNumberInput}
          onChange={handleChange} 
          value={userData.number}
        />
        
        <select 
          name="designation" 
          id="designation" 
          onChange={handleChange} 
          value={userData.designation}
        >
          <option value="">Select your Designation</option>
          <option value="professor">Professor</option>
          <option value="student">Student</option>
        </select>
      </div>

      {isError && 
        <div className="tools-error">
          <img src={ErrorIcon} alt="error" className="icon" />
          <span className="error-message">{errors}</span>
        </div>
      }

      <button className="create--user-btn">
        <UserPlus size={20}/>
        Create New User
      </button>
    </form>
  );
}

export default CreateUser;
