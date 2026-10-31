
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
function Footer() {
  return (
    <footer style={{ backgroundColor: '#111523', color: 'white', padding: '48px 24px 24px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div>
          <h4 style={{ marginBottom: '16px' }}>AI rBulider</h4>
          <p style={{textAlign:"justify"}}>
            An AI rBuilder suggests job-specific keywords, professional summaries, and skill
            recommendations to make the resume more effective and ATS-friendly. The main goal
            of the AI-powered Resume Builder is to simplify resume creation and help job
            seekers build professional, well-structured resumes in a few minutes. Users can
            select templates, edit content, preview their resume, and download it as a PDF.
          </p>
        </div>
        <div aria-hidden="true" />
        <div>
          <h4 style={{ marginBottom: '16px' }}>Contact Us</h4>
          <p><IoMdMail aria-hidden="true" /> &nbsp;resumebuilder@gmail.com</p>
          <p><FaPhoneAlt aria-hidden="true" /> &nbsp;999999999999</p>
          <h4 style={{ margin: '20px 0 12px' }}>Connect with us</h4>
          <div style={{ display: 'flex', gap: '16px', fontSize: '22px' }}>
            <FaInstagram aria-hidden="true" />
            <CiFacebook aria-hidden="true" />
            <FaWhatsapp aria-hidden="true" />
          </div>
        </div>
      </div>
      <p style={{ textAlign: 'center', margin: '24px 0 0' }}>
        Designed &amp; Designed & built with ❤️ using React
      </p>
    </footer>
  )
}

export default Footer
