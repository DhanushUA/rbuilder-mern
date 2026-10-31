import { Button, Divider } from "@mui/material"


function Preview({resumeDetails}) {
  return (
    <div>
       <div className="w-100">
         <h2>{resumeDetails?.fullname}</h2>
            <p className="fs-5 lh-1">Phone :{resumeDetails?.phone}</p>
            <p className="fs-5 lh-1">Email :{resumeDetails?.email}</p>
            <p className="fs-5 lh-1">LinkedIn :{resumeDetails?.linkedin}</p>
            <p className="fs-5 lh-1">Github : {resumeDetails?.github}</p>
            <p className="fs-5 lh-1">Location :{resumeDetails?.location}</p>
            <Divider className="bg-dark mb-3"/>
            <h2> Professional Summary</h2>
            <p>{resumeDetails?.summary}</p>
            <Divider className="bg-dark mb-3"/>
            <h2> Techincal Skills</h2>
            {
              resumeDetails?.skills?.map((skill, index)=>(
              <span key={`${skill}-${index}`}><Button variant="text" className="bg-dark text-light rounded my-2 mx-2">{skill} </Button></span>
              ))
            }

            <Divider className="bg-dark mt-3" />
            <p> Bachelor's Degree in: {resumeDetails?.degree}</p>
            <p> University/College Name:{resumeDetails?.college}</p>
            <p> Year of Graduation: {resumeDetails?.year}</p>

       </div>
    </div>
  )
}

export default Preview
