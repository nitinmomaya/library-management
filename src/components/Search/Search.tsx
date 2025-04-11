import React from 'react'

interface SearchProps{

    value: string | number;
    placeholder:string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit:()=>void;
}

const Search = ({value,placeholder,onChange,onSubmit}:SearchProps) => {
  return (
   <div className="search">
    <input type='text' value={value} onChange={onChange} placeholder={placeholder} />
    <button onClick={()=>{onSubmit()}}>Icon</button>
   </div>
  )
}

export default Search