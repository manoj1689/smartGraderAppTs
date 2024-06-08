import React from "react";

function UserInfo(props) {
  return (
    <div className="flex flex-col my-5 max-md:my-2 w-full">
      <div className="flex gap-5 justify-between max-md:flex-wrap w-full">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-4 text-slate-800">
            {props.data.skill}
            <div className="mt-[5%] font-thin text-sm">{props.data.sub_skill}</div>
          </div>
        </div>
        <div className="flex">
          <div className="text-neutral-500 self-end text-base font-semibold leading-6">
            {props.data.score}/
          </div>
          <div className="self-end text-base font-semibold leading-6 text-neutral-500">
            {props.data.maxScore}
          </div>
        </div>
      </div>
      {props.data.score >= 5 && (
        <div className="flex flex-col justify-center items-start rounded-md bg-neutral-500 w-full">
          <div className="shrink-0 bg-sky-500 rounded-md h-[5px] w-full md:w-[338px]" />
        </div>
      )}
      {props.data.score < 5 && (
        <div className="flex flex-col justify-center items-start rounded-md bg-neutral-500 w-full">
          <div className="shrink-0 bg-red-600 rounded-md h-[5px] w-full md:w-[210px]" />
        </div>
      )}
    </div>
  );
}

export default UserInfo;

// import React from "react";

// const UserInfo = ({ user, downloadPDF }) => {
//   return (
//     <div className="flex flex-wrap items-center w-full mb-4">
//       <img
//         src={user.profileImage}
//         alt="Profile"
//         className="w-24 h-24 rounded-full mr-4"
//       />
//       <div className="flex flex-col flex-grow">
//         <h1 className="text-2xl font-bold">{user.name}</h1>
//         <p className="text-gray-600">{user.role}</p>
//         <p className="text-gray-600">{user.interviewDate}</p>
//         <p className="text-gray-600">{user.totalTime}</p>
//       </div>
//       <button
//         onClick={downloadPDF}
//         className="ml-auto px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
//       >
//         <i className="fas fa-download"></i> Download PDF
//       </button>
//     </div>
//   );
// };

// export default UserInfo;
