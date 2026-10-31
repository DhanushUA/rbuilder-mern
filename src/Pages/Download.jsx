import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import { getAlldownloadResumeApi } from "../service/apiService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from "react-chartjs-2";




ChartJS.register(ArcElement, Tooltip, Legend);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  maxHeight: "80vh",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};




function Download() {

 const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 const [downloadlist,setdownloadlist] = useState([])
 const [label,setLabel] = useState([])
 const [value,setValue] = useState([])
 const colorPallete = ['#bafc03','#bf770b','#38bf0b','#0b44bf','#9b0bbf','#bf0b50']
  const backgroundColor = label.map((value,index)=>colorPallete[index%colorPallete.length])
 console.log(downloadlist);



 const data = {
   labels:label,
   datasets:[
    {
       label: 'Download Count',
       data: value,
       backgroundColor

    }
   ]

}




useEffect(()=>{
 getAlldownloads()
},[])





const getAlldownloads = async () =>{
  const result = await getAlldownloadResumeApi()
  setdownloadlist(result.data)
  const output = {}

 result.data.forEach(item=>{
 const currentJob = item.jobRole
  if(currentJob in output){
      output[currentJob] += 1
   }else{
    output[currentJob] = 1
   }
  })

 setLabel(Object.keys(output))
 setValue(Object.values(output))


}



  return (
   <div className="container my-5">

    <div className="d-flex justify-content-between  align-items center">
      <h1>Download Resume History</h1>
       <Button onClick={handleOpen} style={{backgroundColor:"rgb(145, 145, 148)"}} className="btn btn-ssecondary"> View in Chart</Button>
    </div>
    <p className="mt-3 fs-3 fw-semibold text-primary" > Total download resumes from our site is : <span className="fw-bolder text-danger">{downloadlist?.length} </span>  </p>
    <div className="row my-5">
      {
         downloadlist?.length>0?
        downloadlist?.map((resume,index)=>(
          <div className="col-lg-4" key={`${resume?._id ?? resume?.resumeId ?? "download"}-${index}`}>
            <div style={{height:'350px'}} className="rounded shadow p-3">
              <h6> Review at: {resume?.timeStamp}</h6>
             <div className="mt-4 text-center">
              <Link to={`/resume/${resume?.resumeId}`}> <img className="w-100"  style={{height:'300px'}} src={resume?.resumeImg} alt="resume image"/> </Link>
            </div>
           </div>
          </div>
      ))
      :
      <div> No resumes download yet </div>
      }
    </div>
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{backgroundColor:"rgb(148, 160, 32)",width:"100%",padding:"10px",color:"white"}}  >
       CV Count by Job Role
    </Typography>
    <div className="text-center">
      <Pie data = {data }/>
    </div>
    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
      this chart provides an overview of the number of CV downloads associated with different jobs on the website.it helps visulaize the demand and engegement for CV's across various career categories, making it easier to identify which job roles attract the highest number of downloads. By comparing downloads counts accross roles, the chart can provide useful insights in to user perferences and the popularity of different career oppertunies on the platform
    </Typography>
  </Box>
</Modal>
   </div>
  )
}

export default Download





// <Modal
//   open={open}
//   onClose={handleClose}
//   aria-labelledby="modal-modal-title"
//   aria-describedby="modal-modal-description"
// >
//   <Box sx={style}>
//     <Typography id="modal-modal-title" variant="h6" component="h2" sx={{backgroundColor:"rgb(148, 160, 32)",width:"100%",padding:"10px",color:"white"}}>
//       CV Count by Job Role
//     </Typography>
//     <div className="text-center">
//      {/* <Pie data = {data}/> */}
//     </div>
//     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//
//     </Typography>
//   </Box>
// </Modal>