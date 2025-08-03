import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Spinner from "./Spinner";

const FileUploaderSection = ({ files, setFiles, session }) => {
  console.log(files);

  const [isUploading, setIsUploading] = useState(false);

  async function uploadFiles(e) {
    e.preventDefault();
    const uploadedFiles = e.target?.files;
    if (uploadedFiles?.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of uploadedFiles) {
        data.append("file", file);
      }
      try {
        const res = await axios.post("/api/upload", data);
        const safeOldFiles = Array.isArray(files) ? files : [];
        const newFiles = [...safeOldFiles, ...res.data.links];
        setFiles(newFiles);
      } catch (error) {
        console.error("Error uploading files:", error);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Could not upload files. Please try again.",
        });
      } finally {
        setIsUploading(false);
      }
    }
  }

  function deleteFile(e, link) {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Are you sure?",
        text: `This file will be deleted permanently.`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const safeFiles = Array.isArray(files) ? files : [];
          const newFiles = safeFiles.filter((value) => value !== link);
          setFiles(newFiles);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "Could not delete file. Please try again.",
      });
    }
  }

  if (session.user.email === "demo@gmail.com") {
    return null;
  }

  const displayFiles = Array.isArray(files) ? files : [];

  return (
    <>
      <label className="text-gray-400">Files</label>
      <div className="mb-2 flex flex-wrap gap-1 items-center">
        {!!displayFiles?.length &&
          displayFiles.map((link) => (
            <div
              key={link}
              className="relative flex h-20 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </a>
              <button
                onClick={(e) => deleteFile(e, link)}
                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                aria-label="Delete file"
              >
                x
              </button>
            </div>
          ))}

        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}

        <label className="w-20 h-20 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 rounded-sm bg-white shadow-sm border text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload file</div>
          <input type="file" onChange={uploadFiles} className="hidden" />
        </label>
        {!displayFiles?.length && !isUploading && (
          <div className="text-gray-400"> No attached files </div>
        )}
      </div>
    </>
  );
};

export default FileUploaderSection;
