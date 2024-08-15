import React, { useContext,useState } from 'react'
import { Moonicon, Sunicon, Usericon,Seaicon } from '../icons/icons';
import { UserContext } from '../../UserContext';
import { useDispatch } from 'react-redux';
import { Setsearchval } from '../../features/currentSlice';
function NavBar() {
    const {Mode, setMode} = useContext(UserContext);
    const [inputValue,setInputValue] = useState("")
    const dispatch = useDispatch()
    const handleChange = (par)=>{
        setInputValue(par)
    }
    const handleClick = ()=>{
        dispatch(Setsearchval(inputValue))
        setInputValue("")
    }
    return (
        <div className={'NavBar shadow-sm text-white d-flex justify-content-between align-items-center py-3 px-3' + (Mode ? " bg-primary" : " bg-dark bg-gradient border-bottom")}>
            <button className='btn text-white p-0' onClick={()=>{setMode(!Mode)}}>
                {
                    Mode ? <Moonicon/> : <Sunicon/>
                }
            </button>
            <div className='flex-grow-1'>
                <div className='input-group w-25 mx-auto'>
                    <input type="text" className=' form-control' placeholder='Search' onChange={(e)=>handleChange(e.target.value)} value={inputValue}/>
                    <button className={'btn btn-light'} onClick={()=>handleClick()}>
                        <Seaicon/>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default NavBar