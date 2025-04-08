import React, { useEffect } from 'react';
import {isLoggedIn} from '../Common/Utils.ts';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoggedIn()){
            navigate('/')
        }
    })

    return(
        <>
            <h4>Home</h4>
            <button onClick={() => {
                localStorage.removeItem('LoggeIn')
                navigate('/')
            }}>Logout</button>
        </>
    )

}

export default Home;