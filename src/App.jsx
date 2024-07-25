import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setLength] = useState(6);
  const[numberAllowed, setNumberAllowed]=useState(false);
  const[charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("");
  const[color,setColor]=useState("blue");
  
  // useRef hook
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()?~";
    for(let i=1;i<length;i++){
      let char =Math.floor(Math.random()*str.length+1)
      pass +=str.charAt(char)
    }
    setPassword(pass)


    
  },[length,numberAllowed,charAllowed,setPassword])
const copyPasswordToClipBoard=useCallback(()=>{
  setColor("red");
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0,30);
  window.navigator.clipboard.writeText(password)
},
[password])

  useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    <>
      <div className="main-box  w-[30rem]  mx-auto shadow-md rounded-lg pt-5 p-7 my-40 text-orange-500 h-40 bg-gray-700">
        <div className=" sec-box flex shadow rounded-lg overflow-hidden mt-6 mb-5">
        <input
        
        type="text"
        value={password}
        className="outline-none w-full py-2 px-3  "
        placeholder='Password'
        readOnly 
          ref={passwordRef}
        />
       <button style={{backgroundColor:color}}
       onClick={copyPasswordToClipBoard}className='hover:bg-sky-700 outline-none text-white px-3 py-0.5 shrink-0'
       >copy</button> 

        </div>
        <div className='flex text-md gap-x-4'>
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{setNumberAllowed((prev)=>!prev);}}
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="characterInput"
          onChange={()=>{setCharAllowed((prev)=>!prev);}}
        />
        <label htmlFor="characterInput">Characters</label>
        </div>

        </div>
        
      </div>
    </>
  )
}

export default App
