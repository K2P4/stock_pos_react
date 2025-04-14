import React, { useRef, useState } from "react";
import { Snackbar, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useImportStockMutation } from "../store/services/endpoints/stock.endpoint";
import { useImportCategoryMutation } from "../store/services/endpoints/category.endpoint";

const ImportComponent = ({ closeImport, categoryCheck = false }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [importStock] = useImportStockMutation();
  const [importCategory] = useImportCategoryMutation();
  const fileInputRef = useRef(null);

  const fileUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    if (categoryCheck) {
      try {
        const response = await importCategory(formData);
        setSnackbar(true);
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }else{
      try {
        const response = await importStock(formData);
        setSnackbar(true);
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }

    setLoading(false);
    closeImport();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileUpload(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    fileUpload(file);
  };

  const selectFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="h-screen flex flex-col items-center justify-center">
        <Snackbar
          open={snackbar}
          autoHideDuration={5000}
          onClose={() => setSnackbar(false)}
          message="Uploaded File Successfully."
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed  px-32 py-24 rounded-lg flex flex-col items-center gap-4 text-center transition ${
            isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300"
          }`}
        >
          <CloudUploadIcon
            sx={{ fontSize: 120 }}
            className="text-blue-500   "
          />

          <div>
            <h1 className="text-gray-600 text-xl font-semibold">
              Drag & Drop to Upload File
            </h1>
            <p className="text-gray-500">OR</p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx,.xls,.csv"
            className="hidden"
            onChange={handleFileChange}
          />

          {!loading ? (
            <button
              onClick={selectFile}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Browse File
            </button>
          ) : (
            <CircularProgress color="primary" size={30} thickness={5} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ImportComponent;
