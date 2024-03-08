import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [lenght, setLenght] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  // console.log(lenght,password,numberAllowed,charAllowed);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEabcde";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let index = 1; index <= lenght; index++) {
      // console.log('I am in Loop', index, lenght);
      // console.log('In');
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      // console.log(str);      
      // console.log(pass);
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed, setPassword])
  // passwordGenerator()

  useEffect(() => {
    // console.log('In');
    passwordGenerator()
    // console.log('Out');
  }, [lenght, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClick = useCallback(
    () => {
      passwordRef.current?.select()
      passwordRef.current?.setSelectionRange(0, 15)
      window.navigator.clipboard.writeText(password);
    }, [password]
  )
  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-green-500 text-center p-4">
        <label className='text-white mb-1 mt-0 block w-full text-left' htmlFor="">Password Generator</label>
        <div className="input text-left inline-flex w-full">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 p-4'
            ref={passwordRef}
            readOnly
          />
          <button onClick={copyPasswordToClick} className='outline-none rounded-none max-w-auto w-full py-0 p-2 bg-black text-white'>COPY CODE</button>
        </div>
        <div className="flex text-sm gap-4">
          <div className="flex gap-2 text-white mt-4">
            <input
              type="range"
              min={8}
              max={20}
              value={lenght}
              className='cursor-pointer'

              onChange={(e) => { setLenght(e.target.value) }}
            />
            <label htmlFor="lenght">Lenght: {lenght}</label>
          </div>
          <div className="flex gap-2 text-white mt-4">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              className='cursor-pointer'
              id='numberInput'
              // onChange={(prev) => setNumberAllowed()}
              onChange={
                () => {
                  setNumberAllowed((prev) => !prev)
                }
              }
            />

            {/* <p>{ !numberAllowed? "true" : "false"}</p> */}
            <label htmlFor="numberInput">Add Number</label>
          </div>
          <div className="flex gap-2 text-white mt-4">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              className='cursor-pointer'
              id='numberInput1'
              onChange={
                () => {
                  setCharAllowed((prev) => !prev)
                }
              }
            />

            <label htmlFor="numberInput1">Add Charactors</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
