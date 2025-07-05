'use client';
import React, { useState } from 'react';
import Link from 'next/link';
export default function SignUpForm  ()  {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    codeId: '',
    password: '',
    termsAccepted: false,
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    // Add validation or API logic here
  };

  return (
    <main>
    <nav style={{ textAlign:'right', margin:'20px',}}>
        <Link style={{textTransform:'uppercase'}} href="/"><button style={{cursor:'Pointer', backgroundColor:'rainbow', border:'none',borderRadius:'5px',padding:'5px',}}>Home</button></Link>
    </nav>
     
    <form 
      onSubmit={handleSubmit}
      style={{
        maxWidth: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>

      <label>First Name</label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="Enter your first name"
        required
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />

      <label>Last Name</label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Enter your last name"
        required
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />

      <label>CODE ID</label>
      <input
        type="text"
        name="codeId"
        value={formData.codeId}
        onChange={handleChange}
        placeholder="Your unique code"
        required
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />

      <label>Password</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Create a password"
          required
          style={{ flexGrow: 1, padding: '8px' }}
        />
        <button 
          type="button"
          onClick={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
          style={{ marginLeft: '8px', padding: '8px' }}
        >
          {formData.showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <label style={{ display: 'block', margin: '16px 0' }}>
        <input
          type="checkbox"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
          required
        />{' '}
        I agree to the <Link href="#">Terms and Conditions</Link>
      </label>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}
      >
        Sign Up
      </button>
    </form>
    </main>
  );
}
