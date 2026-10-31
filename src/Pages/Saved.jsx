import { FaBackward, FaForward, FaSearch, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteAllResumeApi, getAllResumeApi } from "../service/apiService";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";





function Saved() {

   const [Allresumes,setAllResumes] = useState([])
    const [SearchKey, setSearchKey] = useState("")
    const [dummyAllresumes,setdummyAllresumes] = useState([])
    console.log(Allresumes);

    console.log(SearchKey);

   const [currentPage,setCurrentPage] = useState(1)
   const rowperPage = 4
   const lastIndexofcurrentPage = currentPage * rowperPage
   const firstIndexofCurrentPage = lastIndexofcurrentPage - rowperPage
   const currentResumes = Allresumes.slice(firstIndexofCurrentPage,lastIndexofcurrentPage)
   const totalPages = Math.ceil(Allresumes.length/rowperPage)


   useEffect(()=>{
     SearchKey ==""? getAllResumes() : searchCandidate()
    },[SearchKey])

    const searchCandidate = () => {
    setAllResumes(dummyAllresumes.filter(item => item.job.toLowerCase().includes(SearchKey.toLowerCase())))
   }


  const getAllResumes = async () => {
    const response = await getAllResumeApi()
    if (response.status == 200) {
      setAllResumes(response.data)
      setdummyAllresumes(response.data)
    }
  }


    const removeResume = async (id) => {
    if (confirm("Are you sure do you want to delete this resume")) {
      const response = await deleteAllResumeApi(id)
      if (response.status == 200) {
        getAllResumes()
      }
    }
  }

  return (



    <div className="container d-flex justify-content-center align-items-center my-5 flex-column">
      <h1> All saved Resumes</h1>
      <div className='d-flex justify-content-center align-items-center w-50 mt-3'>
        <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search candidate by their job name' className='form-control' />
        <FaSearch style={{marginLeft:'-30px'}}/>

      </div>
          <table className="table table-hover table-stripped my-5">
            <thead>
              <tr>
                 <th>#</th>
                 <th>Resume</th>
                 <th>Job title</th>
                 <th>....</th>
              </tr>
            </thead>
             <tbody>
               {
                currentResumes?.length>0?
                currentResumes?.map((resume ,index)=>(
                  <tr key={resume?.id}>
                 <td> {index+1}</td>
                 <td> <Link to={`/resume/${resume?.id}`}>{resume?.fullname.toUpperCase()}</Link></td>
                 <td>{resume?.job.toUpperCase()}  </td>
                 <td> <button onClick={()=>{removeResume(resume?.id)}} className="btn btn-danger"> <FaTrash /> </button> </td>
               </tr>
                ))
                :
                <tr>
                  <td colSpan="4" className="text-center">No Resumes Added yet</td>
                </tr>
               }
             </tbody>
          </table>
          <div className="d-flex align-items-center">
            <Button className="btn" onClick={()=>setCurrentPage(currentPage-1)} disabled={currentPage==1}>
              <FaBackward/>
            </Button>
            {currentPage} of {totalPages}
            <Button className="btn" onClick={()=>setCurrentPage(currentPage+1)} disabled={currentPage==totalPages || totalPages==0}>
             <FaForward/>
            </Button>
          </div>
    </div>
  )
}

export default Saved
