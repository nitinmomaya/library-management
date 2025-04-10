import React, { Dispatch, SetStateAction } from 'react';
import API from '../../api/axios';

interface Options{

  value: string;
}

interface DropDownProps{
  options:Options[];
  value:string;
  setValue: Dispatch<SetStateAction <string>>;
}


const Select: React.FC<DropDownProps> = ({options,value,setValue}) => {

 
  return (
    <>
    <select value={value}  onChange={(e)=>setValue(e.target.value)} name="select" id="select">
    {options.map((item:Options)=> <option value={item.value}>{item.value}</option>)}
    </select>
    
    </>
  )
}

export default Select