/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Select from '../components/Select/Select'
import axios from 'axios';
import Search from '../components/Search/Search';
import Sidebar from '../components/Sidebar/Sidebar';

const Borrow = () => {
    //get user details
    //filter book with userid
    const [selectType,setSelectType]=useState('member');
    const [search,setSearch]=useState('');
    const [filterData,setFilterData]=useState([]);
    console.log(selectType,'selectType',search,filterData);
    const isMember:boolean=selectType==='member';

    const fetchUserData= async()=>{
           
       const {data}= await   axios.get('http://localhost:3000/userlist');
       return data;
    }

    const fetchborrowBook= async()=>{
           
      const {data}= await   axios.get('http://localhost:3000/borrowedtracking');
      return data;
   }

   const fetchBook= async()=>{
           
    const {data}= await   axios.get('http://localhost:3000/booklist');
    return data;
 }


    const getData= async()=>{

      
     const userData:any=await fetchUserData();
     const bookData:any=await fetchBook();
     const borrowDetails:any=await fetchborrowBook();


      const filterType:any= search && (isMember? 
      userData?.filter((item:any)=> item?.name?.toLowerCase()?.includes(search)) 
      : bookData?.filter((item:any)=> item?.bookname?.toLowerCase()?.includes(search)) ??[]);

      const filterData:any= isMember ? borrowDetails.filter((item:any)=> item?.userid== filterType[0]?.id):borrowDetails.filter((item:any)=> item.bookid== filterType[0]?.id)
      
    
      const borrowedBook= !isMember?userData.filter((item:any,i:any)=>filterData.map((item:any)=>item.userid).includes(item.id)):bookData.filter((item:any)=>filterData.map((item:any)=>item.bookid).includes(item.id));
      setFilterData(borrowedBook);
      console.log(borrowedBook,'fd',filterData,'bb',bookData,'cc',!isMember,bookData.filter((item:any,i:any)=>{console.log(i,filterData[i]?.bookid,item?.id);if(filterData[i]?.bookid==item?.id) return item}));


    }

    // useEffect(()=>{
    //   getData();
    // },[search,selectType])

console.log(isMember?'name':'bookname')

  return (
   <>

    <Select value={selectType} setValue={setSelectType} options={[{value:'member'},{value:'book'}]}/>
    <Search value={search} onChange={(e)=>setSearch(e.target.value)} placeholder={'search by member or book'} onSubmit={getData}/>
    {filterData.map((item:any)=><div>{item[!isMember?'name':'bookname']}</div>)}
   </>
  )
}

export default Borrow