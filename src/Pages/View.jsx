import { FaFileDownload } from "react-icons/fa";
// import { IoDocumentText } from "react-icons/io5";
// import { IoMdRefresh } from "react-icons/io";
import Edit from "../Components/Edit";
import { FaBackward } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import Preview from "../Components/Preview";
import { downloadResumeApi, viewResumeApi } from "../service/apiService";
import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

function View() {

const [resume,setResume] = useState()
const previewRef = useRef()

const {id} = useParams()

useEffect(()=>{
  const getResumeDetails = async () => {
    const response = await viewResumeApi(id)
    if(response.status === 200){
      setResume(response.data)
    }
  }

  getResumeDetails()
}, [id])


const downloadCV = async () =>{

  const preview = previewRef.current
  const canvas = await html2canvas(preview)
  canvas.toBlob(async (imgfile)=>{
  //
  const formData = new FormData()
  formData.append("file", imgfile)
  formData.append("upload_preset", "my-resume")
  const result = await fetch("https://api.cloudinary.com/v1_1/xuu7qri1/image/upload",{
  method:"POST",
  body:formData
  })
  const serverData = await  result.json()
  const url = serverData.secure_url
  console.log(url);
  generatePDF(url)

})

}






 const generatePDF = async (resumeImg) => {


  const pdf = new jsPDF()
  const imageWidth = pdf.internal.pageSize.getWidth()
  const imageHeight = pdf.internal.pageSize.getHeight()
  pdf.addImage(resumeImg,"PNG",0,0,imageWidth,imageHeight)
  pdf.save("resume.pdf")

  const today = new Date()
  console.log(today);
  const timeStamp = `${today.toLocaleDateString()}, ${today.toLocaleTimeString()}`
  console.log(timeStamp);


 const response = await downloadResumeApi({timeStamp,resumeImg,resumeId:resume.id,jobRole:resume.job})
 if(response.status===201){
  pdf.save(`${resume.fullName} CV.pdf`)
 }


}




  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
         {/* navigation items */}
         <div className="d-flex justify-content-center align-items-center">
         <button onClick={downloadCV} style={{Color:"#111523"}} className="btn"><FaFileDownload />download CV</button>
          <Edit resumeDetails={resume} setResumeDetails={setResume}/>
           {/* <Link style={{color:""}} to={'/all-resumes'} className="btn mx-2"> <IoDocumentText/>  All resumes  </Link> */}
         {/* download histroy */}
        {/* <Link style={{color:""}} to={'/downloads'} className="btn mx-2"><IoMdRefresh />  Download history </Link> */}
         {/* back */}
         <Link style={{color:""}} to={'/Resume-details'} className="btn mx-2"> <FaBackward /> Previous </Link>
        </div>
          <div ref={previewRef} className="p-5">
          <Preview resumeDetails={resume}/>
         </div>

         </div>

        <div className="col-lg-2"></div>

      </div>

    </div>
  )
}

export default View
