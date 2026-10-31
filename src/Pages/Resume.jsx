import { IoDocumentText } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { Link } from "react-router-dom";

function Resume() {
  return (
    <div>
    <div style={{height:"100vh"}} className="container my-5">
      <h1 className="text-center mt-5"> Create an ATS Friendly Resume in Minutes with AI</h1>
      <div className="container">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-4 rounded shadow text-center p-5">
            <IoDocumentText className="fs-1 mb-3 text-primary" />
             <h4> Add Your Details</h4>
              <p> Our AI Will generate skills & summary</p>
              <h5> step 1</h5>
           </div>
          <div className="col-lg-2"></div>
          <div className="col-lg-4 rounded shadow text-center p-5">
            <FaFileDownload  className="fs-1 mb-3 text-danger" />
            <h4>Download your Resume</h4>
            <p> Download PDF and Start applying</p>
            <h5> Step 2</h5>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
      <div className="text-center mt-5">
        <Link to="/Resume-details" style={{backgroundColor:"#1a1363"}} className="btn text-light mt-5 rounded">LET'S START</Link>
      </div>


    </div>
    </div>
  )
}

export default Resume
