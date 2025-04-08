import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/css/style.css';
type User =  {
  name: string,
  username: string,
  role: string,
  password: string
} | undefined;

const Login : React.FC = () => {
    const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)


  const onSubmit  = () : void => {
    fetch('http://localhost:3000/users').then(r => {
        if (!r.ok) {
            throw new Error('Network response was not ok ' + r.statusText);
          }
      
        return r.json();
    }).then(data => {
        console.log(data)
        const user: User | undefined = data.find((o: User | undefined) => o?.username === username && o?.password === password)
        if(user !== undefined){
        navigate('/home')
        localStorage.setItem('LoggeIn', 'true');
      console.log(user, "logged in !!!!")
    }
    })
  }

  const addUser = () : void => {
    if(name !== "" && name !== "" && name !== "" && name !== ""){
        const newUser: User = {
            name: name,
            username: username,
            role: role,
            password: password
        }

const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  };
  
  // Making the POST request
  fetch('http://localhost:3000/users', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Post created:', data); // Handle the response data here
      setIsLogin(true)
      setName("")
      setUsername("")
      setRole("")
      setPassword("")
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
    }
  }
  

  return (
    <div style={{
      width: '100%',
      height: "100%",
      justifyContent: 'center',
      alignItems: "center"
    }}>
      {
        isLogin ? (
        <div style={{
        width: '100%',
        height: '500px',
        border: '1px solid black',
        backgroundColor: '#F1F1F1',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: "column",
        padding: '10px',
        boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: '10px',
      }}>
        <div className='text-4xl flex w-full justify-center align-middle mb-[50px]'>Login</div>
        <div className="input-container">
        <input value={username} type="text" id="input" placeholder=" " required onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="input">Username</label>
    </div>
    <div className="input-container">
        <input value={password} type="password" id="input" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="input">Password</label>
    </div>
        <div style={{color: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
        <button  
        onClick={onSubmit}
        >Submit</button>
        </div>
        <div className='link' onClick={() => {
            setIsLogin(false)
        }}>Register</div>
      </div>
    ) : (
<div style={{
        width: "100%",
        height: '500px',
        border: '1px solid black',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: "column",
        padding: '10px',
        boxShadow: ' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        borderRadius: '10px'
      }}>
        <div className='text-4xl flex w-full justify-center align-middle'>Sign Up</div>
        <div className="input-container">
            <input value={name} type="text" id="input" placeholder=" " required onChange={(e) => setName(e.target.value)} />
            <label htmlFor="input">Name</label>
        </div>
        <div className="input-container">
            <input value={username} type="text" id="input" placeholder=" " required onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="input">Username</label>
        </div>
        <div className="input-container">
            <input value={password} type="password" id="input" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="input">Password</label>
        </div>
        <div className="select-container">
            <select id="select" required onChange={(e) => console.log(e.target.value)}>
                <option value="" disabled selected></option>
                <option value='user'>User</option>
                <option value='admin'>Admin</option>
            </select>
            <label htmlFor="select">Your Label</label>
        </div>
        <div style={{color: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
        <button  
        onClick={addUser}
        >Submit</button>
        </div>
        <div className='link' onClick={() => {
            setIsLogin(true)
        }}>Back to Login</div>
      </div>
    )
    }
      
    </div>
  )
}

export default Login;
