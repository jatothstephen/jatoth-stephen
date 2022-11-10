import React,{ useState} from 'react';

import'./Signup.css';
import Loginform from '../Login/Loginform';

const Signup=() =>{
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");  
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://ixonotest.herokuapp.com/api/User/submit-profile", {
        method: "POST",
        contentType:"application/json",
        body: JSON.stringify({
          email: email,
          name: name,
          mobileNum: mobileNumber,
          password: password,
          username: username,
        }),
      });
      let resJson = await res.json();
      if (res.status === 201 || res.status === 200) {
        setName("");
        setEmail("");
        setMobileNumber("");
        setPassword("");
        setUsername("");        
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }     
  }; 

  let handleSubmit1 = async (e) => {
    e.preventDefault();
      let res = await fetch("https://ixonotest.herokuapp.com/api/User/get-profiles", {
      method: "GET"  
    });
    let resJson = await res.json();    
    setPosts(JSON.stringify(resJson));
     
  };

  let handleSubmit2 = async (e) => {
    e.preventDefault();       
   setPosts("");  
   console.log()   
  };


    return (
    <center>
      <div className='mainheader'>
      <h1>SUMBIT PROFILE</h1>
      </div>
    <div className='profile'>
      <form onSubmit={handleSubmit}>
        <Loginform
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Loginform
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Loginform
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <Loginform
          type="text"
          value={password}
          placeholder="PassWord"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Loginform
          type="text"
          value={username}
          placeholder="User Name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Submit</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>
</form>
<div>
    <button className='btn1' onClick={handleSubmit1}>Show Details</button>
    <button className='btn2' onClick={handleSubmit2}>Clear</button>
</div>
<div>
<div className="message">{posts ? <p>{posts}</p> : null}</div>
</div>
</div>
</center>

  );

}
export default Signup;