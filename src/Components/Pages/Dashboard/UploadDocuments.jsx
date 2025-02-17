import { useState } from "react";
import { FaBell, FaUserCircle, FaUpload } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { MdDashboard, MdPolicy, MdPayment, MdSettings, MdNotifications } from "react-icons/md"; // Missing imports
import logo from "../../../assets/logo.png";
import { useProgress } from "./ProgressContext";

const UploadDocuments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { uploadedDocuments, setUploadedDocuments, setProgress, uploadedFiles, setUploadedFiles } = useProgress();

  const handleFileUpload = (event, docName) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [docName]: file.name,
      }));

      if (!uploadedDocuments.includes(docName)) {
        const updatedDocuments = [...uploadedDocuments, docName];
        setUploadedDocuments(updatedDocuments);

        const totalDocuments = 5;
        const newProgress = (updatedDocuments.length / totalDocuments) * 100;
        setProgress(newProgress);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 bg-white p-5 shadow-lg fixed h-full transform transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <img src={logo} alt="Logo" className="h-10" />
        <nav className="mt-5 space-y-2">
          <a href="#" className="flex items-center p-2 text-blue-600 bg-blue-100 rounded">
            <MdDashboard className="mr-2" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <MdPolicy className="mr-2" />
            <span>Policy</span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <MdPayment className="mr-2" />
            <span>Payments</span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <MdSettings className="mr-2" />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-200 rounded">
            <MdNotifications className="mr-2" />
            <span>Notifications</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-xl">
              <FiMenu />
            </button>
            <div className="flex items-center border p-2 rounded-md bg-gray-100 w-96">
              <BiSearch className="text-gray-500" />
              <input type="text" placeholder="Search here..." className="bg-transparent outline-none pl-2 w-full" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-xl text-gray-600" />
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="text-gray-800 font-medium">Sara Cynthia</span>
            </div>
          </div>
        </div>

        {/* Upload Documents Section */}
        <div className="p-6 flex-1 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Car Insurance Quote In Progress</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["National ID/Passport", "KRA PIN Certificate", "Driving License", "Logbook", "Valuation Report (for comprehensive cover)"].map((doc, index) => (
              <div key={index} className="p-4 bg-white rounded shadow">
                <label className="block font-medium mb-2">{doc}</label>
                <div className="flex justify-between items-center border p-2 rounded-md bg-gray-50 cursor-pointer">
                  <span className="text-gray-500">
                    {uploadedFiles[doc] ? uploadedFiles[doc] : "Upload document"}
                  </span>
                  <label className="cursor-pointer">
                    <FaUpload className="text-blue-600" />
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, doc)}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocuments;
