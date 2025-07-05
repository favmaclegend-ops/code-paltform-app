'use client';
import Link from 'next/link';
import '../globals.css';

export default function App() {
        
  function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

function handleLogin() {
  const codeId = document.getElementById("codeId").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;
  console.log("Logging in with:", { codeId, password, remember });
  alert("Welcome "+ codeId +"")
}
       
  return (
      <main>
        <header>
        <nav style={{ textAlign:'right', margin:'20px', }}>
            <Link style={{textTransform:'uppercase'}} href="/Signup"><button style={{cursor:'Pointer', backgroundColor:'rainbow', border:'none',borderRadius:'5px',padding:'5px',}}>Sign-up</button></Link>
        </nav>
        </header> 
        
       <div
  style={{
    maxWidth: "320px",
    margin: "40px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "sans-serif"
  }}
>
  <h2 style={{ textAlign: "center" }}>Login</h2>
  <p style={{ textAlign: "center", color: "#666" }}>Welcome back!</p>

 <form  onSubmit={handleLogin}>
  <label htmlFor="codeId">CODE ID</label><br/>
  <input
    type="text"
    id="codeId"
    placeholder="Enter Code ID" required
    style={{
      width: "78%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px"
    }}
  />

 <br/> <label htmlFor="password">Password</label>
  <div
    style={{
      display: "flex",
     // alignItems: "center",
      width: "101%",
      padding: "1px",
      borderRadius: "5px"
    }}
  >
   
    <input
      type="password"
      id="password" required
      placeholder="Enter Password"
      style={{
        flex: 1,
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        marginLeft : "3px",
         width: "20%"
      }}
    />
    <button
      onClick={togglePassword}
      style={{
        marginLeft: "10px",
        background: "none",
        border: "none",
        fontSize: "18px",
        cursor: "pointer"
      }}
    >
      👁️
    </button>
  </div>

  <div style={{ marginTop: "10px" }}>
    <input type="checkbox" id="remember" />
    <label htmlFor="remember"> Remember Me!</label>
  </div>

  <button
    type='submit'
    style={{
      marginTop: "20px",
      width: "100%",
      padding: "12px",
      background: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Login
  </button>
</form>
</div>
</main>
   
    
  );
}


