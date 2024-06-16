// Password.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import passwordIcon from "../../assets/images/Password/password-icon.png";
import smartLogo from "../../assets/logos/smart-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleRecoverSubmit, handleOtpSubmit, handleResetPassword } from '../../services/api/PasswordService';
import { MyFormData } from "../../types/interfaces/interface";
import { handleMouseDown, handleMouseUp } from "../common/Mouse/HandleMouse";
import { getRememberedPasswordEmail, setRememberedPasswordEmail } from "../../utils/rememberedCredentials";

const Password: React.FC = () => {
  const navigate = useNavigate();
  const [isPressed, setIsPressed] = useState(false);
  const [recover, setRecover] = useState(true);
  const [reset, setReset] = useState(false);
  const [password, setPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(5).fill(""));
  const storedEmailID = getRememberedPasswordEmail();

  const [formData, setFormData] = useState<MyFormData>({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const enteredOtp = otp.join("");

  const handleOtp = (element: HTMLInputElement, index: number): void => {
    if (isNaN(parseInt(element.value))) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      (element.nextSibling as HTMLElement).focus();
    }
  };

  const handleRecoverSubmitClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const success = await handleRecoverSubmit(formData);

    if (success) {
      setRecover(false);
      setReset(true);
    }
  };

  useEffect(() => {
    setRememberedPasswordEmail(formData.email);
  }, [formData.email]);

  const handleOtpSubmitClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const storeEmail = storedEmailID || '';
    const success = await handleOtpSubmit(storeEmail, enteredOtp);

    if (success) {
      setPassword(true);
      setReset(false);
    } else {
      setPassword(false);
      setReset(true);
    }
  };

  const handleResetPasswordClick = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const storeEmail = storedEmailID || '';
    const new_password=newPassword;
    const confirm_password=confirmPassword;
    const success = await handleResetPassword(new_password, confirm_password, storeEmail, enteredOtp);

    if (success === true) {
      toast.success("New Password Updated");
      navigate("/");
    } else {
      setPassword(true);
      setReset(false);
    }
  };

  return (
    <>
      <div className="container mx-auto min-h-screen px-4 py-4 flex flex-col lg:flex-row">
        <div className="lg:hidden w-full">
          <Link to="/">
            <img width={179} height={43} src={smartLogo} alt="smart Grader" />
          </Link>
        </div>
        <div className="w-full lg:w-1/2 flex flex-row px-4 py-7 my-5 sm:my-20 justify-start items-center">
          <div>
            <img
              src={passwordIcon}
              alt="Click Password"
              width={102}
              height={102}
            />
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-2xl sm:3xl md:text-4xl text-slate-800 font-medium font-spline">Forgot Password</div>
            <div className="font-sans text-sm sm:text-lg font-light text-gray-600 my-1.5">
              Reset your SmaratGrader Password for account access
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col mx-auto justify-center items-center">
          <div className="max-lg:hidden">
            <Link to="/">
              <img width={179} height={43} src={smartLogo} alt="Smart Grader" />
            </Link>
          </div>

          {recover && (
            <>
              <div className="self-center mt-5 text:xl sm:text-2xl w-full mx-auto flex justify-center items-center font-spline text-slate-800">
                Recover Password
              </div>

              <form onSubmit={handleRecoverSubmitClick} className="flex-flex-col w-full sm:w-96">
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="justify-center items-start p-5 mt-5 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                />

                <button
                  className={`flex justify-center items-center px-4 py-5 mt-8 text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full ${
                    isPressed ? "bg-sky-600" : "bg-sky-500"
                  }`}
                  onMouseDown={() => handleMouseDown(setIsPressed)}
                  onMouseUp={() => handleMouseUp(setIsPressed)}
                  type="submit"
                >
                  <div className="flex gap-2.5 px-px">
                    <span className="font-spline text-sm sm:text-lg">Send Recovery Link</span>
                  </div>
                </button>

                <div className="flex flex-col self-end mt-8 max-w-full leading-5 text-center">
                  <div>
                    <span className="font-light text-gray-600">
                      Or you can
                    </span>{" "}
                    <Link to="/signIn">
                      {" "}
                      <span className="text-cyan-600 font-spline">Login</span>
                    </Link>{" "}
                    <span className="font-light gap-3 text-gray-600 font-spline">Here</span>
                  </div>
                </div>
              </form>
            </>
          )}

          {reset && (
            <>
              <div className="self-center mt-5 text:xl sm:text-2xl font-spline text-slate-800">
                Enter OTP
              </div>

              <form onSubmit={handleOtpSubmitClick} className="flex-flex-col w-full sm:w-96">
                <div className="flex flex-row gap-4 justify-center">
                  {otp.map((data, index) => {
                    return (
                      <input
                        type="text"
                        name="otp"
                        placeholder="*"
                        maxLength={1}
                        className="text-center mt-5 max-sm:w-12 sm:w-16 rounded-md border border-solid border-neutral-400 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none max-sm:h-12 sm:h-16"
                        key={index}
                        value={data}
                        onChange={(e) => handleOtp(e.target, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    );
                  })}
                </div>

                <button
                  className={`flex justify-center items-center px-4 py-5 mt-8 text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full ${
                    isPressed ? "bg-sky-600" : "bg-sky-500"
                  }`}
                  onMouseDown={() => handleMouseDown(setIsPressed)}
                  onMouseUp={() => handleMouseUp(setIsPressed)}
                  type="submit"
                >
                  <div className="flex gap-2.5 px-px">
                    <span className="font-spline text-sm sm:text-lg">Continue</span>
                  </div>
                </button>
                <div className="flex flex-col self-end mt-8 max-w-full leading-5 text-center">
                  <div>
                    <span className="font-light font-sans text-gray-600">
                      Didn't receive the email?
                    </span>{" "}
                    <Link to="/signIn">
                      {" "}
                      <span className="text-cyan-600 font-sans">Resend</span>
                    </Link>{" "}
                    <span className="font-light gap-3 text-gray-600 font-sans">Link</span>
                  </div>
                </div>

                <div className="flex flex-col self-end mt-8 max-w-full leading-5 text-center">
                  <div>
                    <span className="font-light text-gray-600">
                      Or you can
                    </span>{" "}
                    <Link to="/signIn">
                      {" "}
                      <span className="text-cyan-600">Login</span>
                    </Link>{" "}
                    <span className="font-light gap-3 text-gray-600">Here</span>
                  </div>
                </div>
              </form>
            </>
          )}

          {password && (
            <>
              <div className="self-center my-10 text:xl sm:text-2xl text-slate-800">
                Set New Password
              </div>

              <form onSubmit={handleResetPasswordClick} className="flex-flex-col w-full sm:w-96">
                <div>
                  <input
                    type="password" // Change to password type
                    name="newPassword" // Change name to newPassword
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={handlePasswordChange} // Use handlePasswordChange
                    className="justify-center items-start p-5 mt-5 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="password" // Change to password type
                    name="confirmPassword" // Change name to confirmPassword
                    placeholder="Confirm New Password"
                    required
                    value={confirmPassword}
                    onChange={handlePasswordChange} // Use handlePasswordChange
                    className="justify-center items-start p-5 mt-2 leading-4 rounded-md border border-solid border-neutral-400 w-full pr-10 focus:border-neutral-500 focus:ring-neutral-500 focus:outline-none"
                  />
                </div>

                <button
                  className={`flex justify-center items-center px-4 py-5 mt-8 text-white bg-sky-500 rounded-md border border-sky-500 border-solid w-full ${
                    isPressed ? "bg-sky-600" : "bg-sky-500"
                  }`}
                  onMouseDown={() => handleMouseDown(setIsPressed)}
                  onMouseUp={() => handleMouseUp(setIsPressed)}
                  type="submit"
                >
                  <div className="flex gap-2.5 px-px">
                    <span className="font-spline text-sm sm:text-lg">Set Password</span>
                  </div>
                </button>

                <div className="flex flex-col self-end mt-8 max-w-full leading-5 text-center">
                  <div>
                    <span className="font-light text-gray-600">
                      Or you can
                    </span>{" "}
                    <Link to="/signIn">
                      {" "}
                      <span className="text-cyan-600 font-spline">Login</span>
                    </Link>{" "}
                    <span className="font-light gap-3 text-gray-600 font-spline">Here</span>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Password;
