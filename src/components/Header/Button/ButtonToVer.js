import React, {useState} from 'react'
import './ButtonToVer.css'
import { useAuth } from '../../../AuthContext';


function Buttons(){
    const [activeButtonToLog, setActiveButtonToLog]=useState(false)
    const [activeButtonToReg, setActiveButtonToReg]=useState(false)
    const [activeCodePanel, setActiveCodePanel]=useState(false)
    return(
        
            <div>
                <button className='button LogIn'
                    onClick={()=>setActiveButtonToLog(true)}
                    >Log In</button> 
                <button className='button SignIn'
                    onClick={()=>setActiveButtonToReg(true)}
                    >Sign Up</button>
                {activeButtonToLog&&<LogPanel activeButtonToLog={activeButtonToLog}
                    setActiveButtonToLog={setActiveButtonToLog} 
                    />}
                {activeButtonToReg&&<RegPanel activeButtonToReg={activeButtonToReg} 
                    setActiveButtonToReg={setActiveButtonToReg}
                    activeCodePanel={activeCodePanel}
                    setActiveCodePanel={setActiveCodePanel} />}
                {activeCodePanel&&<CodePanel
                    activeButtonToReg={activeButtonToReg} 
                    setActiveButtonToReg={setActiveButtonToReg}
                    activeCodePanel={activeCodePanel}
                    setActiveCodePanel={setActiveCodePanel}
                />}
            </div>
        
    )

}

function RegPanel({activeButtonToReg, setActiveButtonToReg, activeCodePanel, setActiveCodePanel}){

     const {authData, updateAuthData}=useAuth();

     const {email, password, again_password}=authData

    function handleSubmit(event){
        event.preventDefault();

        const url = new URL('https://fast-booking.onrender.com/users/auth/prod-registration');
        url.searchParams.append('email', email);

        fetch(url,
            {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
            }
        )
        .then((response)=>{
             if(response.ok){
                 setActiveButtonToReg(false)
                 setActiveCodePanel(true)
             } 
              
         })

    }


    return(
        <div className="conteiner">
            
            <div className="form">
                <h1 className="www">Register new account</h1>
                <form id="registrForm"
                    onSubmit={handleSubmit}
                >
                    <input type="text" name="email"  placeholder="E-mail" required
                        value={email}
                        onChange={(event)=>updateAuthData('email',event.target.value)}
                    />
                    
                    <input type="password" name="password"  placeholder="Password" required
                        value={password}
                        onChange={(event)=>updateAuthData('password',event.target.value)}
                    />
                    
                    <input type="password" name="again_password" placeholder="Again password" required
                        value={again_password}
                        onChange={(event)=>updateAuthData('again_password',event.target.value)}
                    />
                    
                    <button className="buttonAvtor" type="submit">Sign Up</button>
                </form>
                <span className="buttonTo">Sign In</span>
                <div className="exit"
                    role='button'
                    tabIndex={0}
                    onClick={()=>setActiveButtonToReg(false)}
                    >X</div>
            </div>
        </div>
    )
}



function LogPanel({setActiveButtonToLog}){
    return(
        <div className="conteiner">
            
            <div className="form">
                <h1 className="www">Log account</h1>
                <form id="registrForm"
                >
                    <input type="email" name="email"  placeholder="E-mail" required/>
                    
                    <input type="password" name="password"  placeholder="Password" required/>
                    
                    <button className="buttonAvtor" type="submit">Sign Up</button>
                </form>
                <span className="buttonTo">Sign Up</span> 
                <div className="exit"
                    role='button'
                    tabIndex={0}
                    onClick={()=>setActiveButtonToLog(false)}
                >X</div>
            </div>
        </div>
    )
}

function CodePanel({activeButtonToReg, setActiveButtonToReg, activeCodePanel, setActiveCodePanel}){
    const [code, setCode]=useState('')
    const {authData, updateAuthData}=useAuth();
     const {email, password, again_password}=authData

    function HandleCode(event){
        event.preventDefault();

        const url=new URL('https://fast-booking.onrender.com/users/auth/prod-add-to-db');
        url.searchParams.append('code', code)

        const data = {
            "email": email,
            "password":password,
            "again_password": again_password
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then((response)=>{
            if(response.ok){
                setActiveCodePanel(false)
            }
        })
        
    }

    return(
        <div className="conteiner">
            
        <div className="form formCode">
            <h1 className="www h_code">Enter the code sent to email</h1>
            <form id="registrFormCode"
            onSubmit={HandleCode}
            >
                <input type="text" name="code"  placeholder="Code" required
                   value={code}
                   onChange={(event)=>setCode(event.target.value)} 
                />
                
                <button className="buttonAvtor buttonCode" type="submit">Confirm</button>
            </form>
            <span className="buttonTo"></span> 
            <div className="exit"
                role='button'
                tabIndex={0}
                onClick={()=>{
                    setActiveButtonToReg(true)
                    setActiveCodePanel(false)
                }}
            >X</div>
        </div>
    </div>
)
    
}




export default Buttons;

