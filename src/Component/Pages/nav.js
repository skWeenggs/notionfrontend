import React,{useState,useEffect, useRef} from 'react'

import { Link, useNavigate,NavLink } from 'react-router-dom';
import '../Style/nav.css'
import axios from 'axios';

const Nav = () => {
  // localStorage.setItem("navId",'2ec2121978bc4fe4b0563f9feeb9ca56')
  const [databaseId, setDatabaseId] = useState(null);
  const [domain,setDomain]=useState('')
  const [array,setArray]=useState([]);

  // const domainDatabaseMap = [
  //   { domain: 'localhost', databaseId: '2ec2121978bc4fe4b0563f9feeb9ca56' },
  //   { domain: 'domain123.netlify.app', databaseId: '3aa619a29e924491929bfa5508adf40e' },
  //   { domain: 'domain12345.netlify.app', databaseId: 'c3947bed600c49c39490e3d14ad199c0' },
  //   { domain: 'domain121.netlify.app', databaseId: '1089e33bd7d243068f83de1e6d5a46bd' },
  //   { domain: 'domain122.netlify.app', databaseId: '573affb5ad7e40cd8401ea27a2cbf500' },
  //   // add more domain-database mappings as needed
  // ];

  const LoadData=async()=>{
    // const res=await axios.get('https://notion-api.splitbee.io/v1/table/82c796b9a232481ca43002087faa0a81');
    const res=await axios.get(`https://vercel-notion.vercel.app/users`);
    // const uniqueData = res.data.filter(newData => !array.some(existingData => existingData.ContentPageId === newData.ContentPageId));
    const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
    console.log(uniqueData);
    sessionStorage.setItem("UsersList",JSON.stringify(uniqueData))
    setArray(uniqueData)
  }
  // const auth = sessionStorage.getItem('user');
  const admin=sessionStorage.getItem('admin');
//   const time=sessionStorage.getItem('time');
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate('/login')
  }
  const [open,setOpen]=useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setOpen(false)
    } 
  }
  
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  // console.log(JSON.parse(auth).listUsersResponse.results[0].name )
  const [header,setHeader]=useState([])
  

  const callonce=async()=>{
    // const response=await axios.get(`http://localhost:4000/fetchuserdata/c3947bed600c49c39490e3d14ad199c0`)

    // const response=await axios.get(`https://notion-api.splitbee.io/v1/table/${databaseId}`)
    // const response=await axios.get(`https://notion-api.splitbee.io/v1/table/${databaseId}`)
    const response=await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
    console.log("nav response",response.data);
    setHeader(response.data)
    sessionStorage.setItem('header',JSON.stringify(response.data))
    // setHeader(response.data)
    // sessionStorage.setItem('header',JSON.stringify(response.data))
  }
// console.log(header);
//  const users= sessionStorage.getItem("UsersList")
//  setArray(JSON.parse(users));

  useEffect(()=>{
    if(array.length < 1  ){
      LoadData()
    }

  
  const head=sessionStorage.getItem("header")
    setHeader(JSON.parse(head));
 
    const currentDomain = window.location.hostname;

    // const matchingDomain = domainDatabaseMap.find(mapping => mapping.domain === currentDomain);

    // if (matchingDomain) {
    //   // localStorage.setItem("navId",matchingDomain.databaseId)
    //    setDatabaseId(matchingDomain.databaseId);
    //    setDomain(matchingDomain.domain)
    //  }

    // const matchingDomain = array.find(mapping => mapping.Domain === currentDomain);
    const matchingDomain = array.find(mapping => mapping.properties.Domain.rich_text[0].plain_text === currentDomain);
    console.log(matchingDomain);
    
    if (matchingDomain) {
     
      //  setDatabaseId(matchingDomain.PagesPageId);
      //  setDomain(matchingDomain.Domain)
      setDatabaseId(matchingDomain.properties.PagesPageId.rich_text[0].plain_text);
      setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
     }
     console.log(databaseId !==null && !header);
     if(databaseId !==null && !header){
       
       callonce()
     }

// eslint-disable-next-line react-hooks/exhaustive-deps
},[array,databaseId,domain])

const handlecall=(res)=>{
  setOpen(!open)
console.log(res);
  navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`,{ state: { myData: res}, replace:true })
  // navigate(`/${res?.Slug}`,{ state: { myData: res}, replace:true })
  // navigate(`/${res?.properties.Slug.rich_text[0].plain_text }`,{ state: { myData: res}, replace:true })
  // navigate(`/${res?.Slug }`,{ state: { myData: res}, replace:true })
  
 }

// const handlecallFull=(res)=>{
// console.log(res);
//   navigate(`/${res?.properties.Slug.rich_text[0].plain_text }`,{ state: { myData: res}, replace:true  })
//  }

const handleresetFilter=()=>{
  sessionStorage.removeItem('filter')
  setOpen(!open)
}

  return (
    <>
   
   
    <div className='bg-gray-300 p-1 w-full flex sticky top-0  z-0'  ref={menuRef}>
        <div className='w-[15%] flex justify-center m-auto'>

        <Link to='/'>
         <img
            alt='logo'
            className="logo md:block ml-2 sm:mx-20 mt-[-8px] lg:mt-0 sm:float-left"
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIEAAACBCAMAAADQfiliAAAAMFBMVEXk5ueutLfo6eqssbTq7O2orrK7wMPa3d7S1dfGyszMz9Hg4+TCxsnd4OG4vcCzuLuHxgkrAAAC/0lEQVR4nO2a626rMAyAwSYXAiTv/7YntIytFQ022Kl0lE+bNG0//DVxnIvXdY1Go9FoNBqNRqPxPwKQv39++Ep8F2YbU4p29lN1CQBvjcF+A00/u6Fm/C4g7uE3CUy+2kCA79/CbxLRVVGALh7GfziECgrgPsbPmDhpO0AoCeRRSIuuwpnA6jCpCjhzJpDRFFgoAn3SM5go8fM8zFqpAPNpEmwKXkmhuA5fFXQMBmr8XBZGDQXwpDTcUFmSiSGACoNAKwU7CisSLDkPV4z8ciDWgn0arPiBhZWHK9ICA7Ua7ThpA85KWMEgbMBMg3VzEE6EhWvQJ2EDxzbohQ08NxHFdye+gWkG4gb8TETptcAeA+m1MHENMEpvTdwRED+jDJFr4GUFOhiZ04CLsAE/FeUPirztGUfxMxJ3GqQPKJmFZRDlBfJhmSGgcFTOcC4MSeXiONBvDEbpUY18VpSvyBuER6TNQLwa7Qq0edBJww1KWdK4N/9C2KTRqj4owqmCWhb+KqSig5G+Kh1hC5XJ1Hjazovy+HG/wqPyrjDN5sDBYKjX6xmmuX+VQEwV469A521CRPP46tPs6jfccsTFh3Ecg3fLNxp+AMNfqhrAAJ3Ln97GlKf/0XSLdh6Dm9a/qEeHyYX4DIwvifj4RRz9ojka+aM/o3+uSGjWpNTJCgA3p6MycGRhPUgX52EZe86TJqLo8syjb0tD/8Eh+k7IAVxkx39KJBEHWEp74Qkm+bv5sG5Cl+M/He4d3D912TngeH0qoGM/qB8qXB4GcPcHYHMIl7IBwr0M+IuxVwS4zzZFMLKTgdzhpSpwm29wowh8UOA1nuBmFTgkMfqwsjnwA+M6B/yHdJoC+T41KUzBA+q1HriNPYYCKRXILyUXwEgZBHZnkaVAmAfpUvQGoTBdaKZwOP/PNeUh6Alv7toCZytSckv+wEllBG4zhw+eTIL6EJxMA/Mfbi5RfvDU2RTfKDY/WF2Mq5TPCfqJmCm+vCfUxxSbYFCDkkCj0Wg0vss/Bz8hBPfP7w0AAAAASUVORK5CYII=' />
          {/* {time && time } */}
        </Link>
        </div>
              <>  
                {admin?
                <>
                <ul className="nav-ul nav-right w-[90%]">
                        <div className='lg:hidden flex   justify-end mr-3 sm:mt-2' >
                        <svg onClick={()=>{setOpen(!open)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                         
                         </div>
                      {open?
                       (
                        <> 
                      
                        <NavLink to="/dashboard" onClick={handleresetFilter}><li className= 'hover:bg-gray-600 text-black hover:text-slate-50 w-full  ' >Home</li></NavLink>
                        <NavLink to="/userlist" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full '>USer List</li></NavLink>
                       
                         <NavLink to="/login"  onClick={logout}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Logout ({(JSON.parse(admin)?.listUsersResponse?.results[0].name )})</li></NavLink>
                  
                        </>
                       )
                      :(
                      <> 
                        <div className="hidden lg:flex lg:justify-end">
                        
                         <li className='mt-[10px]'><NavLink to="/dashboard"   className='hover:bg-gray-600 text-black hover:text-slate-50 '>Home</NavLink></li>
                         <li className='mt-[10px]'><Link to="/userlist" className='hover:bg-gray-600 text-black hover:text-slate-50 '>User List</Link></li>
                         
                        <li className='mt-[10px]'>
                       <NavLink onClick={logout} to="/login" className='hover:bg-gray-600 text-black hover:text-slate-50 '>Logout({(JSON.parse(admin)?.listUsersResponse?.results[0].name )})</NavLink>
                          </li>
                      
                        {/* <li><Link to="#" className='hover:bg-gray-600 text-black hover:text-slate-50 '>Home</Link></li>
                          <li><Link to="/users" className='hover:bg-gray-600 text-black hover:text-slate-50 '>Users</Link></li> 
                          <li><NavLink to='/course' className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Add Course</NavLink></li> */}
                        </div>
                      </>
                      )
                      }
                  </ul>
                </>
                :
                <>
                <ul className="nav-ul nav-right w-[90%]">
                        <div className='lg:hidden flex   justify-end mr-3 sm:mt-2' >
                        <svg onClick={()=>{setOpen(!open)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                         
                         </div>
                      {open?
                       (
                        <> 
                        <NavLink to="/" onClick={handleresetFilter}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full '>Home</li></NavLink>
                        {header && header?.users?.results.map((data,key)=>
                           {
                              console.log("data=--====",data);
                               return(
                                <div key={key}  onClick={()=>{handlecall(data)}} className='hover:bg-gray-600 text-black hover:text-slate-50 w-full  cursor-pointer'>
                                 <button ><li>{data.properties.Name.title[0].plain_text}</li></button>
                                 {/* <button ><li>{data.Name}</li></button> */}
                                </div>
                                )
                            }
                        )}
                         <NavLink to="/register"  ><li onClick={()=>{setOpen(!open)}} className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Registeration </li></NavLink>
                         <NavLink to="/login" /*  onClick={logout} */><li onClick={()=>{setOpen(!open)}} className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>LogIn </li></NavLink>
                        {/* <NavLink to="/form" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full '>Form</li></NavLink>
                        <NavLink to="#" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full '>Home</li></NavLink>
                        <NavLink to="/users" onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Users</li></NavLink>
                        <NavLink to='/course' onClick={()=>{setOpen(!open)}}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Add Course</li></NavLink> */}
                        {/* <NavLink to="/login"  onClick={logout}><li className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Logout ({(JSON.parse(auth).listUsersResponse.results[0].name )})</li></NavLink>  */}
                        {/* <li><Link to="/profile">Profile</Link></li> */}
                        {/* <li> <Link onClick={logout} to="/signup">Logout ({(JSON.parse(auth).listUsersResponse.results[0].name )})</Link></li> */}
                        </>
                       )
                      :(
                      <> 
                        <div className="hidden lg:flex lg:justify-end">
                        
                         <li className='mt-[10px]'><Link to="/" onClick={sessionStorage.removeItem('filter')} className='hover:bg-gray-600 text-black hover:text-slate-50 '>Home</Link></li>
                        {header && header?.users?.results.map((data)=>
                           {

                             return(
                               <div key={data.id} className="hidden lg:block">
                                <li>

                                  {/* <Link to={`/${data?.Slug}`} state={{ myData: data }} replace  className='flex hover:bg-gray-600 text-black hover:text-slate-50 '>{data.Name}</Link> */}
                                  <Link to={`/${data?.properties.Slug.rich_text[0].plain_text}`} state={{ myData: data }} replace  className='flex hover:bg-gray-600 text-black hover:text-slate-50 '>{data.properties.Name.title[0].plain_text}</Link>
                                  {/* <Link to={`/${data.Slug}`} state={{ myData: data }} replace  className='flex hover:bg-gray-600 text-black hover:text-slate-50 '>{data.Name}</Link> */}
                                  </li>
                                  {/* <Link  to={`/${data?.properties.Slug.rich_text[0].plain_text}`} state={{ myData: data }} replace >{data.properties.Name.title[0].plain_text}</Link> */}
                                </div>
                                )
                            }
                        )}
                          <NavLink to="/register" ><li className='hover:bg-gray-600 mt-[10px] text-black hover:text-slate-50 w-full'>Registeration </li></NavLink>
                        <li className='mt-[10px]'>

                       <NavLink /* onClick={logout} */ to="/login" className='hover:bg-gray-600 text-black hover:text-slate-50 '>LogIn {/* ({(JSON.parse(auth).listUsersResponse.results[0].name )}) */}</NavLink>
                          </li>
                      
                        {/* <li><Link to="#" className='hover:bg-gray-600 text-black hover:text-slate-50 '>Home</Link></li>
                          <li><Link to="/users" className='hover:bg-gray-600 text-black hover:text-slate-50 '>Users</Link></li> 
                          <li><NavLink to='/course' className='hover:bg-gray-600 text-black hover:text-slate-50 w-full'>Add Course</NavLink></li> */}
                        </div>
                      </>
                      )
                      }
                  </ul>
                </>

                }
               

              </>

    </div>
    </>
  )
}

export default Nav;