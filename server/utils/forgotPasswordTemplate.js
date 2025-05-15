const forgotPasswordTemplate = ({name, otp}) =>{
    return `

    <div>
      <p> Dear, ${name} </p>
      <p>You're requested a password reset. Please Use following OTP Code to reset your password.</p>
      <div>
      <div style =" background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
            ${otp}
      </div>
    <p>This otp is valid for 1hour only. Enter this otp in the blinkyet website to proceeed with resetting your password. </p>
    <br/>
    <br/>
    <p>Thanks</p>
    <p>Blinkyet</p>

    </div>
    `

}
export default forgotPasswordTemplate