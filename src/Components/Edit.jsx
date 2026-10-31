import  React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaUserEdit } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import jobRole from "../assets/jobRole.json";
import { toast } from "react-toastify";
import { editAllResumeApi } from "../service/apiService";




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

function Edit({ resumeDetails,setResumeDetails }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [newSkill, setNewSkill] = useState("");
  // const skillRef = useRef(null);
  const skillRef = React.useRef()

const removeSkill = (skill) =>{
  setResumeDetails({...resumeDetails, skills:resumeDetails.skills.filter(item=>item!=skill)})
}

const addSkill = (skill) => {
  if(skill){
    if(resumeDetails?.skills?.map(item=>item.toLowerCase()).includes(skill.toLowerCase())){
      toast.info("given skill is already available, please add another")
    }else{
     setResumeDetails({...resumeDetails,skills:[...resumeDetails?.skills,skill]})
    }
   skillRef.current.value =""

  }else{
    toast.warning("please enter an vaild input!!")
  }
}

const handleEditResume = async () => {
    //  make api call save resume whenver the finish button click
    const {fullname,location,job,phone,email,github,linkedin,degree,college,year,skills,summary} = resumeDetails

    if(fullname && location && job && phone && email && github && linkedin && degree && college && year && skills.length > 0 && summary){
      //  make api call
     const response = await editAllResumeApi(resumeDetails.id,resumeDetails)
     console.log(response);
     if(response.status === 200){
      toast.success("Resume updated succesfully")
      setTimeout(()=> {
        handleClose()
      },2500);

     }

    }else{
      toast.warning("please fill form completely.!!")

    }
}






  return (
    <div>
      <Button className="btn" onClick={handleOpen}>
        <FaUserEdit className="me-1" /> Edit CV
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit resume details
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
           <div>
            <h3> Personal Details</h3>
            <div className='row p-4'>
              <TextField value={resumeDetails?.fullname}  onChange={e=>setResumeDetails({...resumeDetails,fullname: e.target.value})} id="standard-basic-fullname" label="Full name" variant="standard" />
             <TextField value={resumeDetails?.location}  onChange={e=>setResumeDetails({...resumeDetails,location: e.target.value})} id="standard-basic-loc" label="Location" variant="standard" />
              <FormControl variant="standard">
                <InputLabel  id="demo-simple-select-label">Choose Job Title</InputLabel>
                <Select defaultValue={resumeDetails?.job} onChange={e=>setResumeDetails({...resumeDetails,job: e.target.value})}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Job"
                >
                    {
                      jobRole.jobRoles.map(job=>(
                         <MenuItem key={job} value={job}>{job}</MenuItem>
                      ))

                    }


                </Select>
              </FormControl>
            </div>

          </div>

            <div>
              <h3>Contact Details</h3>
               <div>

                          <div className='row p-4'>
                            <TextField  value={resumeDetails?.email}  onChange={e=>setResumeDetails({...resumeDetails,email: e.target.value})} id="standard-basic-email" label="Email" variant="standard" />
                            <TextField  value={resumeDetails?.phone}  onChange={e=>setResumeDetails({...resumeDetails,phone: e.target.value})} id="standard-basic-phone" label="Contct number" variant="standard" />
                            <TextField value={resumeDetails?.github} onChange={e=>setResumeDetails({...resumeDetails,github: e.target.value})} id="standard-basic-github" label="GitHub Link" variant="standard" />
                            <TextField value={resumeDetails?.linkedin} onChange={e=>setResumeDetails({...resumeDetails,linkedin: e.target.value})} id="standard-basic-linkdlin" label="Linkdlin Link" variant="standard" />
                          </div>

                        </div>
         </div>
                   <div>
                      <h3> Education Details</h3>
                      <div className='row p-4'>
                       <TextField value={resumeDetails?.degree}  onChange={e=>setResumeDetails({...resumeDetails,degree: e.target.value})} id="standard-basic-degree" label="degree" variant="standard" />
                       <TextField value={resumeDetails?.college}  onChange={e=>setResumeDetails({...resumeDetails,college: e.target.value})}  id="standard-basic-college" label="university" variant="standard" />
                       <TextField value={resumeDetails?.year}  onChange={e=>setResumeDetails({...resumeDetails,year: e.target.value})} id="standard-basic-year" label="Year of graduation" variant="standard" />
                      </div>


                    </div>


                <div className="mt-3">
                 <h3> Skills</h3>
                 <div className="d-flex p-3">
                  <input ref={skillRef} type="text" placeholder="Add skill" className="form-control"/>
                  <Button onClick={()=>{addSkill(skillRef.current.value)}} className="btn">Add</Button>
                 </div>
                 <h5>Add Skills:</h5>
                 <div className="p-3 d-flex justify-content-between flex-warp">
                  {
                    resumeDetails?.skills?.map(skill=>(
                      <Button onClick={()=>{removeSkill(skill)}} key={skill} variant="contained" className="my-2">{skill} <FaXmark className="ms-3"/> </Button>
                    ))
                  }
                 </div>
                </div>
            <h3>Summary</h3>
            <div className="mt-3">
              <div className="row">
              <TextField
                value={resumeDetails?.summary} onChange={e=>setResumeDetails({...resumeDetails,summary: e.target.value})}
               id='summary' label='summary' multiline variant="standard"></TextField>
             </div>
            </div>
            <Button onClick={handleEditResume}className="btn btn-primary mt-3">
              Update CV
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;
