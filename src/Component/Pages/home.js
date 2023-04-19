import React, { useCallback } from 'react'
import axios from 'axios'
import { useEffect, useMemo, useRef } from 'react'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';



const Home = () => {

  const [data, setData] = useState(null);


  const [isLoading, setIsLoaading] = useState(true)
  // var url = window.location.href; 
  // var filename = url.substring(url.lastIndexOf("/") + 1); sessionStorage.setItem("fetch", (decodeURI(filename)));

  const location = useLocation()
  const navigate = useNavigate()
  const [logo, setLogo] = useState('');
  const [tags, setTag] = useState([]);
  const [allResponses, setAllResponses] = useState([]);
  const [open, setOpen] = useState(false);
  const [databaseId, setDatabaseId] = useState(null);
  const [domain,setDomain]=useState(null)
  const [authordatabaseid,setAuthorDatabaseId]=useState('')
  

  const domainDatabaseMap = [
    { domain: 'domain123.netlify.app', databaseId: 'd8eac0833b3d41edbd89f6eed252ca9a' },
    { domain: 'localhost', databaseId: 'cc662110c0d4419a9e77261e07ef5738' },
    { domain: 'domain12345.netlify.app', databaseId: '7588674fea134ee9b66e54266bb38e95' },
    { domain: 'domain121.netlify.app', databaseId: 'a378753a1e4c44969fe5e4b5c9132b78' },
    { domain: 'domain122.netlify.app', databaseId: '8b7789d6519f4ade9f0310c3d34646de' },
  
    // add more domain-database mappings as needed
  ];

  /////Pagination//////
  const [currentpage, setCurrentPage] = useState(1)
  const recordsperpage = 3;
  // sessionStorage.setItem("page",recordsperpage)
  const lastIndex = currentpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = allResponses?.users?.results.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allResponses?.users?.results?.length / recordsperpage)
  const num = []
  for (let i = 1; i <= npage; i++) {
    num.push(i)
  }
  // console.log(num);
  // const num=[...Array(npage +1).keys()].slice(1);
  // console.log("data records", records, npage, recordsperpage, currentpage);

  // console.log(numbers);

  // console.log("records",records);


  // const [data1, setData1] = useState(null);
  const [list, setList] = useState([]);

 
  useMemo(() => {
    const uniqueIds = new Set();

    data?.users?.results?.forEach((res) => {
      res?.properties?.Tags?.multi_select.forEach((d) => {
        uniqueIds.add(d.name);
      });
    });
    setList(Array.from(uniqueIds));
  }, [data]);

  // console.log("ulist",list);
 const datacount= JSON.parse(sessionStorage.getItem("data"))
  const [name, setName] = useState('')
  const [count, setCount] = useState('' || datacount?.users?.results.length)


  // useEffect(()=>{
  //   sessionStorage.setItem("name","all")
  // })
  useEffect(() => {
    sessionStorage.setItem("name", "all")
  }, [name])

  const [array,setArray]=useState([])
  
  const LoadData=async()=>{
    ////Load Master Page User-List/////
    // const res=await axios.get('https://notion-api.splitbee.io/v1/table/82c796b9a232481ca43002087faa0a81');
    const res=await axios.get(`https://vercel-notion.vercel.app/users`);

    const uniqueData = res.data.results.filter(newData => !array.some(existingData => existingData.properties.ContentPageId.rich_text.plain_text === newData.properties.ContentPageId.rich_text.plain_text));
    // const uniqueData = res.data.filter(newData => !array.some(existingData => existingData.ContentPageId === newData.ContentPageId));


    setArray(uniqueData)
  }

  
  const Datafilter = async (filter) => {
    // console.log(filter);
    setName(filter)
    setCurrentPage(1);
    setCount('')
 

      // const response = await axios.get(`http://localhost:4000/fetchuserdatafilter/7588674fea134ee9b66e54266bb38e95/?q=${filter}`)
      // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
      // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
      // const response = await axios.get(`http://localhost:5000/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)
      // console.log("data filter",response);
      const response= await axios.get(`https://vercel-notion.vercel.app/fetchuserdatafilter/${databaseId}/${domain}/?q=${filter}`)  
      setAllResponses(response.data)
      setCount(response.data?.users?.results.length)
      sessionStorage.setItem("filter", JSON.stringify(response.data))

  }
 
  const hadlequery = async (filter) => {
    setName(filter)
    setCurrentPage(1);
    setCount('')
    // const response = await axios.get(`http://localhost:4000/fetchuserdata/7588674fea134ee9b66e54266bb38e95`)
    // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
    // const response = await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
    const response= await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)   
   
    // console.log("data filter",response.data);
    setAllResponses(response.data, { replace: true })
    setCount(response.data?.users?.results.length)
    sessionStorage.setItem("filter", JSON.stringify(response.data))
  }

  const call = async () => {
    // const response1= await axios.get(`https://notion-api.splitbee.io/v1/table/d8eac0833b3d41edbd89f6eed252ca9a`)   
    // const response = await axios.get(`http://localhost:4000/fetchpage1/7588674fea134ee9b66e54266bb38e95`)
    // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/7588674fea134ee9b66e54266bb38e95`)
    // const response = await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)
      const response= await axios.get(`https://vercel-notion.vercel.app/fetchuserdata/${databaseId}/${domain}`)   
    
    // const response = await axios.get(`http://localhost:5000/fetchuserdata/${databaseId}/${domain}`)
    // console.log("res", response)

    sessionStorage.setItem("data", JSON.stringify(response.data))
    head(response.data.users.results[0].properties.Authors.relation[0].id)

    setData(response.data)
    setCount(response.data?.users?.results.length)
    // setData1(response1.data)


    // const uniqueIds1 = new Set(); 
    //  response.data.users.results[0].properties.Tags.relation.map(async(d)=> {
    //    try{
    //      const response= await axios.get(`https://notion-api.splitbee.io/v1/page/${d.id}`)   
    //      console.log("tag",response.data[d.id].value);
    //      uniqueIds1.add(response.data[d.id].value);

    //     }catch(e){
    //       console.log(e);
    //     }
    //     console.log("newTag",tags);
    //     // sessionStorage.setItem("tag", JSON.stringify(response.data[d.id].value))
    //   })
    //   setTag(Array.from(uniqueIds1))
    //   console.log(tags);

    // (response.data.users.results[0].properties.Tags.relation.map((d,i)=>tag(d.id)))
    // tag(response.data.users.results[0].properties.Tags.relation[0].id)
    

    // sessionStorage.setItem("time",new Date(response.headers).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    setIsLoaading(false)
  }

  const head = async (id) => {

    // const response = await axios.get(`https://notion-api.splitbee.io/v1/page/${id}`)
    console.log("id",id);
    // const response= await axios.get(`https://vercel-notion.vercel.app/fetchpagelogo/${authordatabaseid}/${domain}`)   
    const response= await axios.get(`https://vercel-notion.vercel.app/fetchdata/${authordatabaseid}`)   
    console.log(response);
    // sessionStorage.setItem("logo", JSON.stringify(response.data[authordatabaseid].value))
    sessionStorage.setItem("logo", JSON.stringify(response.data.recordMap.block[id].value))
    // setLogo(response.data[authordatabaseid].value);
    // setLogo(response.data.users)
    setLogo(response.data.recordMap.block[id].value)
  }

  // const tag=async(id)=>{

  //     const res= await axios.get(`https://notion-api.splitbee.io/v1/page/${id}`)   
  //      console.log("tag",res.data[id].value);
  //       sessionStorage.setItem("tag", JSON.stringify(res.data[id].value))
  //       //  setTag([res.data[id].value,...tags])
  //       setAllResponses(prevResponses => [...prevResponses, res.data]);
  //   }

  // console.log("data tags",tags)
  // useEffect(()=>{
  //   const currentDomain = window.location.hostname;
  //   console.log(currentDomain);
  //   const matchingDomain1 = array.find(mapping => mapping.Domain === currentDomain);
    
  //    if (matchingDomain1) {
     
  //     setDatabaseId(matchingDomain1.ContentPageID);
  //     setDomain(matchingDomain1.Domain)
    
  //   }
  // }, [databaseId,domain,array])
  // setArray(JSON.parse(users))
  useEffect(() => {
    const users= sessionStorage.getItem("UsersList")
    // console.log(JSON.parse(users));
    
    if(array.length <=1){
      LoadData()
    }
    // const currentDomain = window.location.hostname;
    // console.log(currentDomain);
    // const matchingDomain = array.find(mapping => mapping.Domain === currentDomain);
    // console.log(matchingDomain);
    // if (matchingDomain) {
     
    //    setDatabaseId(matchingDomain.ContentPageId);
    //    setDomain(matchingDomain.Domain)
     
    //  }

  }, [array])



  useEffect(() => {
    const data = sessionStorage.getItem("data")
    const logo1 = sessionStorage.getItem("logo")
    const allfilter = sessionStorage.getItem("filter")
    const name1 = sessionStorage.getItem("name")
    setAllResponses(JSON.parse(allfilter))
    setData(JSON.parse(data));
    setLogo(JSON.parse(logo1));
    setName(name1)

  


    // const matchingDomain = domainDatabaseMap.find(mapping => mapping.domain === currentDomain);
    // if (matchingDomain) {
     
    //    setDatabaseId(matchingDomain.databaseId);
    //    setDomain(matchingDomain.domain)
     
    //  }

    // const matchingDomain = array.find(mapping => mapping.Domain === currentDomain);
    const currentDomain = window.location.hostname;
    const matchingDomain = array.find(mapping => mapping.properties.Domain.rich_text[0].plain_text === currentDomain);
    
    if (matchingDomain) {
       setDatabaseId(matchingDomain.properties.ContentPageId.rich_text[0].plain_text);
       setDomain(matchingDomain.properties.Domain.rich_text[0].plain_text)
       setAuthorDatabaseId(matchingDomain.properties.AuthorPageId.rich_text[0].plain_text)
     }
     

      ///////text therew json/////
      // const loged=JSON.parse(sessionStorage.getItem('user'))
      // console.log(loged?.listUsersResponse?.results[0].person.email);
      
  
      // Users.Users.map((data)=>{
      //   return(
      //     <div key="data.id">
      //       { data.email === loged?.listUsersResponse?.results[0].person.email &&
      //       setId(data['notion-Home-id'])
              
      //       }
      //     </div>
      //   )
      // });
     if(!allfilter && databaseId !== null && domain !==null){
      hadlequery()
     }

      //  console.log(logo);
      if(!data && !logo1 && databaseId !== null && domain !==null){
        call()
        // hadlequery()

      }
      else {
      setIsLoaading(false)
    }
  }, [array,databaseId,domain])



  const handlecall = (res) => {
    console.log(res?.properties.Slug.rich_text[0].plain_text);
    navigate(`/${res?.properties.Slug.rich_text[0].plain_text}`, { state: { myData: res ,domain:domain } })
  }
  // console.log("log1",logo);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleResize = () => {
    if (window.innerWidth > 500) {
      setOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })
  const prevPage = () => {
    if (currentpage !== 1) {
      setCurrentPage(currentpage - 1)
    }
  }
  const nexPage = () => {
    if (currentpage !== npage) {
      setCurrentPage(currentpage + 1)
    }
  }
  const changeCPage = (id) => {
    setCurrentPage(id)
  }

  return (

    <>
      <div className=''>
        <h3 className='my-5 text-center text-2xl '>Resources & insights </h3>
        {/* {data.users?.url} */}
        <div className='overflow-hidden bg-[#fafafa] py-5'>
          {/* <NotionRenderer blockMap={data1} fullPage={true} darkMode={false} hideHeader/> */}

          {/* <div className=' w-[50%]'>
              <img src={data.users?.results[0].cover.file.url} height='50px' width={'500px'} alt=''/>
              <div>
                {data.users?.results[0].properties.Authors.relation[0].id} / {data.users?.results[0].properties['Publish Date'].date.start}
              </div>
              <h2>{data.users?.results[0].properties.Name.title[0].plain_text}</h2>
              <p>{data.users?.results[0].properties.Excerpt.rich_text[0].plain_text}</p> 
              <div>
                {data.users?.results[0].properties.Tags.relation.map((d,i)=>{
                  console.log(d);
                  return(
                    <div key={i}>
                     {d.id} 
                    </div>
                  )
                })}
              </div>
           </div> */}

          <div className='w-[80%] m-auto '>

            {data && !isLoading ? (
              <>
                <div className='font-bold text-2xl'> Featured posts</div>
                {data && data.users?.results.map((res,i) => {
               
                  return (
                    <>

                      {res.properties.Featured.checkbox && i % 2 === 0 ?
                        <div key={i} className='md:w-[50%] lg:flex gap-5 md:float-right p-10 md:p-2 ' >
                          <img src={res?.cover?.file?.url || res?.cover?.external.url} alt='' className='transition-all truncate shadow-md flex md:h-[250px] object-cover rounded-md  md:w-[400px] cursor-pointer h-[200px]  w-full' onClick={() => handlecall(res)} />
                          <div className='md:flex-col '>
                            <span className='cursor-pointer '/*  onClick={()=>handlecall(res?.properties.Authors.relation[0].id)} */>   {logo && logo?.format?.page_icon}  <span className='font-[600]'>{logo && logo?.properties.title[0]}</span> </span>  <span className='font-[200] font-sans'> / {res?.properties['Publish Date'].date.start}</span>
                            <h4 onClick={() => handlecall(res)} className='cursor-pointer font-[600]  py-1'>{res?.properties.Name.title[0].plain_text}</h4>
                            <p className='cursor-pointer font-[200] font-sans' onClick={() => handlecall(res)}>{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                            <div>
                              {res?.properties?.Tags?.multi_select?.map((d, a) => {
                                // console.log("data tag", d);
                                // setList((prev)=>[...new Set([...prev, d.id])])
                                // const result =await someAsyncFunction(d.id);
                                // setTag(result);
                                return (
                                  <>
                                    <div key={a} className='cursor-pointer' >
                                      <strong className='hover:text-black p-1 text-[10px] font-[400] rounded bg-slate-300'> {d.name}</strong>
                                    </div>

                                  </>
                                )
                              })}


                            </div>
                          </div>
                        </div>

                        : (res.properties.Featured.checkbox && i % 2 === 1 ? (
                          <div className=' md:w-[50%] lg:flex-col  md:float-left p-10 md:p-2' >
                            <img src={res?.cover?.file?.url || res?.cover?.external?.url} onClick={() => handlecall(res)} /* height='50px' */ width={'100%'} className="overflow-hidden  object-cover md:h-[400px] h-[200px] rounded-md cursor-pointer" alt='' />
                            <div className='py-2' >
                              <span className='cursor-pointer '> {logo && logo?.format?.page_icon} <span className='font-[600]'>{logo && logo?.properties.title[0]}</span> </span>  <span className='font-[200] font-sans'> / {res?.properties['Publish Date'].date.start}</span>
                            </div>
                            <h3 className='cursor-pointer py-1 font-[600]' onClick={() => handlecall(res)}>{res?.properties.Name.title[0].plain_text}</h3>
                            <p className='cursor-pointer font-[200] font-sans'  onClick={() => handlecall(res)}>{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                            <div>
                              {res?.properties.Tags.multi_select.map((d, b) => {
                                // console.log(d);
                                return (
                                  <div key={b} className='cursor-pointer '  /* onClick={()=>handlecall(d.id)} */ >
                                    <strong className='hover:text-black p-1 text-[10px] font-[400] rounded bg-slate-300'> {d.name}</strong>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                          : (<></>))

                      }
                    </>
                  )
                })

                }
              </>
            ) :
              <div className="text-center text-gray-500 mt-10"> data Loading... </div>
            }

          </div>

        </div>
        <div className='w-[80%] md:flex m-auto pt-3'>
        <div className='font-bold text-2xl mb-3'> All Posts</div>
        </div>
        <div className='w-[80%] md:flex m-auto py-1 '>
          <div className='md:p-1 md:w-[35%] lg:w-[25%]'>
            {/* <div className='font-bold text-2xl mb-3'> All Posts</div> */}
            <p className='font-[500] text-[13px] text-gray-500 font-sans hidden md:block '>TAGS</p>
            <br />
            <div className='md:hidden flex w-full bg-gray-300  justify-between mr-3 sm:mt-2 p-2' >
              View Tag
              {/* <svg onClick={()=>{setOpen(!open)}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg> */}
              <svg onClick={() => { setOpen(!open) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 ">
                <path fill="currentColor" d="M12 16.59l-5.29-5.29a1 1 0 0 1 1.41-1.41L12 13.77l4.88-4.88a1 1 0 0 1 1.41 1.41L12 16.59z" />
              </svg>

            </div>

            {open ? (
              <div >
                <button className={`${"all" === name && name ? 'bg-gray-300' : ''} font-sans font-[300] text-sm hover:text-black  space-y-0.5  p-2 flex w-[100%] outline-2 border-2 hover:bg-slate-200 active'`} onClick={() => hadlequery('all')}>
                  All Tags

                  {"all" === name && name ? (<span className="inline-block  text-xs ml-auto rounded-full py-0.5 px-3 active1"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                </button>
                {list.map((d, c) => {
                  //  console.log(d);

                  return (
                    //  <button className='space-y-0.5 flex-col p-2 flex w-[100%] outline-2 border-2 hover:bg-slate-400 ' key={i}>
                    //   {d}
                    //  </button>

                    <ul className={`nav hover:bg-slate-200 flex-col p-2 flex w-[100%] outline-2 border-2   cursor-pointer ${d === name && name ? 'bg-gray-300' : ''}`} key={c} onClick={() => Datafilter(d)}>
                      <li className="active space-y-0.5  flex border-b-3  active:border-b-[3px] font-sans font-[300] text-sm hover:text-black ">{d}
                        <>

                          {d === name ? (<span className="inline-block text-xs ml-auto rounded-full py-0.5 px-3 active1"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                        </>
                      </li>
                    </ul>
                  )
                })}

              </div>
            ) : (

              <div className='hidden md:block'>

                <button className={`space-y-0.5  p-2 flex w-[100%] font-sans font-[300] text-sm hover:text-black rounded  hover:bg-slate-200 active ${"all" === name && name ? 'bg-gray-300' : ''}`} onClick={() => hadlequery('all')}>
                  All Tags

                  {"all" === name && name ? (<span className="inline-block  text-xs ml-auto rounded-full py-0.5 px-3 active1"> {/* allResponses?.users?.results.length */ count}</span>) : ''}
                </button>
                {list.map((d, e) => {
                  //  console.log(d);
                  return (
                    //  <button className='space-y-0.5 flex-col p-2 flex w-[100%] outline-2 border-2 hover:bg-slate-400 ' key={i}>
                    //   {d}
                    //  </button>

                    <ul className={`nav space-y-0.5 hover:bg-slate-200 rounded flex-col p-2 flex w-[100%]   cursor-pointer ${d === name && name ? 'bg-gray-300' : ''}`} key={e} onClick={() => Datafilter(d)}>

                      <li className={" flex border-b-3 active:border-b-[3px] font-sans font-[300] text-sm hover:text-black "} >{d}
                        <>
                          {d === name ? (<span className="inline-block text-xs ml-auto rounded-full py-0.5 px-3 active1 active:bg-slate-300" > {/* allResponses?.users?.results.length */ count}</span>) : ''}

                        </>
                      </li>
                    </ul>
                  )
                })}

              </div>
            )}

          </div>
          <div className='w-[100%]'>
            <div className='md:w-[100%] grid md:grid-cols-2 lg:grid-cols-3 ' >
              {/* {allResponses && allResponses.users?.results.map((res,i)=>{ */}

              {/* console.log(records); */}
              {records?.map((res, f) => {
                return (
                  <div key={f} className='lg:w-[100%]  flex-col  p-10 md:p-2 '>
                    <img src={res?.cover?.file?.url || res?.cover?.external?.url} onClick={() => handlecall(res)} width={'100%'} className="hover:contrast-[1.1]  md:h-[200px] rounded-md  md:w-full h-[200px]  cursor-pointer" alt='' />
                    <div className='mt-2'>
                    <span className='cursor-pointer '> {logo && logo?.format?.page_icon}<span className='font-[600]'>{logo && logo?.properties.title[0]}</span> </span>  <span className='font-[200] font-sans'> / {res?.properties['Publish Date'].date.start}</span>                   
                    </div>
                    <h4 className='cursor-pointer font-[600] p-1' onClick={() => handlecall(res)}>{res?.properties.Name.title[0].plain_text}</h4>
                    <p className='cursor-pointer font-[200] ' onClick={() => handlecall(res)}>{res?.properties.Excerpt.rich_text[0].plain_text}</p>
                    <div>
                      {res?.properties.Tags.multi_select.map((d, g) => {
                        // console.log(d);
                        return (
                          <div key={g} className='cursor-pointer '  /* onClick={()=>handlecall(d.id)} */ >
                            <strong className='hover:text-black p-1 text-[10px] font-[400] rounded bg-slate-300'>
                              {d.name}
                            </strong>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <hr />
            <div>
            <nav className='flex justify-center py-3'>
              <ul className='pagination '>
                <li className='page-item'>
                  <Link to='#' className='page-link' onClick={prevPage}>previous</Link>
                </li>
                {/* <li className={`page-item ${currentpage  ? 'active':''}`} >
                <Link to='#' className='page-link'>
                {currentpage}
                </Link>

                </li> */}
                {num?.map((n, h) => (
                  <div>

                  <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={h}>
                    <Link to='#' className='page-link'
                      onClick={() => changeCPage(n)}
                      >{n}</Link>
                  </li>
                  </div>
                )
                )}
                <li className='page-item'>
                  <Link to='#' className='page-link' onClick={nexPage}>Next</Link>
                </li>
              </ul>
            </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )


}

export default Home;