import React, { useState } from 'react';
import { BASE_URL } from '../consts';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert platforms to JSON string
        const dataToSend = {
            ...formData,
            platforms: JSON.stringify(formData.platforms) // Convert platforms to JSON
        };

        console.log("Printing data");
        console.log(dataToSend);
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set content type to JSON
            },
            body: JSON.stringify(dataToSend),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok){
            localStorage.setItem("user", JSON.stringify(dataToSend.username));
            setUser(dataToSend.username);
            navigate(`/${dataToSend.username}/overview`);
        } else{
            console.error("Registration failed.");
        }
    };

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
    //         <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
    //         <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
    //         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

    //         <button type="submit">Register</button>
    //     </form>
    // );

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2 className="register-heading">Register</h2>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="form-input"
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
            </form>
        </div>
    );
    
};

export default Register;