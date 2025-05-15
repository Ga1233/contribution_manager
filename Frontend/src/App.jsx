import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { publicRequest } from "./requestMethods";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "./utils";
import "react-toastify/dist/ReactToastify.css";
import { BarChart } from "@mui/x-charts/BarChart";
import "./App.css";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
function App() {
  const [showLogout, setShowLogout] = useState(false);
  const [showAddContribution, setShowAddContribution] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [contribution, setContribution] = useState([]);
  const [updatedId, setUpdatedID] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAddContribution = () => {
    setShowAddContribution(!showAddContribution);
  };

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedID(id);
  };

  const handleUpdateContribution = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(
          `/contribution/contributionupdate/${updatedId}`,
          {
            label: updatedLabel,
            date: updatedDate,
            value: updatedAmount,
          }
        );
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  const navigate = useNavigate();
  const goToApp = () => {
    navigate("/app");
  };
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out Successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleContribution = async () => {
    try {
      await publicRequest.post("/contribution/contributionpost", {
        label,
        date,
        value: amount,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getContributions = async () => {
      try {
        const res = await publicRequest.get("/contribution/contributionfetch");
        setContribution(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getContributions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/contribution/contributiondelete/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredContribution = contribution.filter((contribution) =>
    contribution.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalSum = filteredContribution.reduce(
    (acc, curr) => acc + curr.value,
    0
  );
  const dates = filteredContribution.map((item) => new Date(item.date));
  const minDate = dates.length ? new Date(Math.min(...dates)) : new Date();
  const maxDate = dates.length ? new Date(Math.max(...dates)) : new Date();

  // Calculate the time difference in days
  const timeDiff = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)) || 1;

  // Calculate averages
  const dailyAverage = totalSum / timeDiff;
  const weeklyAverage = totalSum / (timeDiff / 7);

  const monthlyAverage = totalSum / (timeDiff / 30);
  const yearlyAverage = totalSum / (timeDiff / 365);

  return (
    <div>
      <ToastContainer />
      <div className="w-full  flex flex-col justify-center items-center py-4 ">
        <div>
          {/* Menu Button */}
          <button
            className="fixed top-4 left-4 z-50 text-2xl text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>

          {/* Side Menu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isOpen ? "0%" : "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-full w-64 bg-stone-200 shadow-xl z-40 flex flex-col p-6 "
          >
            <h2 className="text-xl font-semibold mb-6">Menu</h2>
            <ul className="space-y-4">
              <h1 className="font-serif  ">Welcome {loggedInUser}</h1>
              <li className="cursor-pointer text-gray-700  font-serif  hover:text-blue-500 transition">
                <Link to="/AboutPage">About</Link>
              </li>
              <li className="text-gray-700">
                <div className="flex flex-col items-start space-y-4">
                  <Button
                    onClick={() => setShowLogout(!showLogout)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Settings
                  </Button>
                  {showLogout && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Logout
                      </Button>
                    </motion.div>
                  )}
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Overlay to close menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30"
              onClick={toggleMenu}
            ></motion.div>
          )}
        </div>
        <div className="bg-blue-500 p-6 rounded-lg w-full">
        <div className="max-w-4xl mx-auto">
          <h1>Welcome {loggedInUser}</h1>
          <h1 className="font-bold text-3xl text-center text-gray-800">
            Contribution Manager
          </h1>
        </div>
      </div>

        <div className="relative flex items-center justify-between mt-5 w-[100%]">
        <div className="relative flex justify-between w-[300px]">
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white p-[12px] rounded-lg border-none outline-none cursor-pointer font-bold tracking-tight shadow-md transition-all"
            onClick={handleAddContribution}
          >
            Add Amount
          </button>
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-orange-500 hover:to-orange-600 text-white p-[12px] rounded-lg border-none outline-none cursor-pointer font-bold tracking-tight shadow-md transition-all"
            onClick={handleShowReport}
          >
            Contribution Report
          </button>
        </div>
          {/* Add Contribution Form*/}
          {showAddContribution && (
            <div className="absolute z-[999] flex flex-col p-[20px] top-[20px] left-0 h-[500px] w-[400px] bg-white shadow-xl rounded-xl font-sans">
              <FaWindowClose
                className="self-end text-red-500 cursor-pointer text-[24px]"
                onClick={handleAddContribution}
              />
              <label
                htmlFor="contribution-name"
                className="mt-[10px] font-semibold text-[18px] text-gray-700"
              >
                Contribution Name
              </label>
              <input
                id="contribution-name"
                type="text"
                placeholder="Name"
                className="outline-none border border-gray-300 p-[10px] rounded-lg mt-[5px] focus:border-[#555] transition-all"
                onChange={(e) => setLabel(e.target.value)}
              />
              <label
                htmlFor="contribution-date"
                className="mt-[15px] font-semibold text-[18px] text-gray-700"
              >
                Contribution Date
              </label>
              <input
                id="contribution-date"
                type="date"
                className="outline-none border border-gray-300 p-[10px] rounded-lg mt-[5px] focus:border-[#555] transition-all"
                onChange={(e) => setDate(e.target.value)}
              />
              <label
                htmlFor="contribution-amount"
                className="mt-[15px] font-semibold text-[18px] text-gray-700"
              >
                Contribution Amount
              </label>
              <input
                id="contribution-amount"
                type="number"
                placeholder="00"
                className="outline-none border border-gray-300 p-[10px] rounded-lg mt-[5px] focus:border-[#555] transition-all"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="bg-[#af8978] text-white p-[12px] rounded-lg cursor-pointer mt-[20px] hover:bg-[#8b5e4f] transition-all"
                onClick={() => {
                  handleContribution();
                  toast.success("Contribution Added Successfully", {
                    autoClose: 2000,
                  });
                }}
              >
                Add Contribution
              </button>
            </div>
          )}
         { /*Report  */}
          {showReport && (
            <div className="chart-container absolute z-[999] grid grid-rows-auto gap-4 p-5 top-[20px] left-[100px] h-auto w-[700px] bg-white shadow-xl max-h-[500px] overflow-y-auto rounded-xl font-sans">
              {/* Close Button */}
              <FaWindowClose
                className="absolute top-3 right-3 text-red-500 cursor-pointer text-[24px]"
                onClick={handleShowReport}
              />

              {/* Charts Grid: 2 columns, 3 rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Total Contribution */}
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: contribution.map((item) => item.label),
                      },
                    ]}
                    series={[{ data: contribution.map((item) => item.value) }]}
                    width={300}
                    height={150}
                  />
                  <strong className="mt-3 text-lg text-gray-700">
                    Total Contribution:
                  </strong>
                  <p className="text-xl font-semibold text-[#555]">
                    ₹{totalSum}
                  </p>
                </div>

                {/* Daily Average */}
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: contribution.map((item) => item.label),
                      },
                    ]}
                    series={[{ data: contribution.map((item) => item.value) }]}
                    width={300}
                    height={150}
                  />
                  <strong className="mt-3 text-lg text-gray-700">
                    Daily Average:
                  </strong>
                  <p className="text-xl font-semibold text-[#555]">
                    ₹{dailyAverage.toFixed(2)}
                  </p>
                </div>

                {/* Weekly Average */}
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: contribution.map((item) => item.label),
                      },
                    ]}
                    series={[{ data: contribution.map((item) => item.value) }]}
                    width={300}
                    height={150}
                  />
                  <strong className="mt-3 text-lg text-gray-700">
                    Weekly Average:
                  </strong>
                  <p className="text-xl font-semibold text-[#555]">
                    ₹{weeklyAverage.toFixed(2)}
                  </p>
                </div>

                {/* Monthly Average */}
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: contribution.map((item) => item.label),
                      },
                    ]}
                    series={[{ data: contribution.map((item) => item.value) }]}
                    width={300}
                    height={150}
                  />
                  <strong className="mt-3 text-lg text-gray-700">
                    Monthly Average:
                  </strong>
                  <p className="text-xl font-semibold text-[#555]">
                    ₹{monthlyAverage.toFixed(2)}
                  </p>
                </div>

                {/* Yearly Average */}
                <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
                  <BarChart
                    xAxis={[
                      {
                        scaleType: "band",
                        data: contribution.map((item) => item.label),
                      },
                    ]}
                    series={[{ data: contribution.map((item) => item.value) }]}
                    width={300}
                    height={150}
                  />
                  <strong className="mt-3 text-lg text-gray-700">
                    Yearly Average:
                  </strong>
                  <p className="text-xl font-semibold text-[#555]">
                    ₹{yearlyAverage.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}

<div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="p-2 w-40 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        </div>

        <div className="contribution-list-container mt-5 w-[80vw] max-h-[400px] overflow-y-auto border border-gray-300 rounded-lg shadow-md">
          {filteredContribution.map((item, index) => (
            <>
              <div
                className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#f3edeb] my-[20px] py-[10px]"
                key={index}
              >
                <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                  {item.label}
                </h2>
                <span className="m-[20px] text-[18px]">{item.date}</span>
                <span className="m-[20px] text-[18px] font-medium">
                  ₹ {item.value}
                </span>
                <div className="m-[20px]">
                  <FaTrash
                    className="text-red-500 mb-[5px] cursor-pointer"
                    onClick={() => {
                      handleDelete(item._id);
                      toast.error("Contribution Deleted Successfully", {
                        autoClose: 2000,
                      });
                    }}
                  />
                  <FaEdit
                    className="text-[#555] mb-[5px] cursor-pointer"
                    onClick={() => handleShowEdit(item._id)}
                  />
                </div>
              </div>
            </>
          ))}
        </div>
        {/* Edit Contribution */}
        {showEdit && (
          <div className="absolute z-[999] flex flex-col p-5 top-[25%] right-0 h-[500px] w-[400px] bg-white shadow-xl rounded-xl font-sans">
            {/* Close Button */}
            <FaWindowClose
              className="self-end text-red-500 cursor-pointer text-[24px]"
              onClick={handleShowEdit}
            />

            {/* Contribution Name */}
            <label
              htmlFor="edit-contribution-name"
              className="mt-4 font-semibold text-[18px] text-gray-700"
            >
              Contribution Name
            </label>
            <input
              id="edit-contribution-name"
              type="text"
              placeholder="Name"
              className="outline-none border border-gray-300 p-[10px] rounded-lg mt-[5px] focus:border-[#555] transition-all"
              onChange={(e) => setUpdatedLabel(e.target.value)}
            />

            {/* Contribution Date */}
            <label
              htmlFor="edit-contribution-date"
              className="mt-4 font-semibold text-[18px] text-gray-700"
            >
              Contribution Date
            </label>
            <input
              id="edit-contribution-date"
              type="date"
              className="outline-none border border-gray-300 p-[10px] rounded-lg mt-[5px] focus:border-[#555] transition-all"
              onChange={(e) => setUpdatedDate(e.target.value)}
            />

            {/* Contribution Amount */}
            <label
              htmlFor="edit-contribution-amount"
              className="mt-4 font-semibold text-[18px] text-gray-700"
            >
              Contribution Amount
            </label>
            <input
              id="edit-contribution-amount"
              type="number"
              placeholder="00"
              className="outline-none border border-gray-300 p-[10px] rounded-lg mt-[5px] focus:border-[#555] transition-all"
              onChange={(e) => setUpdatedAmount(e.target.value)}
            />

            {/* Update Button */}
            <button
              className="bg-[#af8978] text-white p-[12px] rounded-lg cursor-pointer mt-[20px] hover:bg-[#8b5e4f] transition-all"
              onClick={() => {
                handleUpdateContribution();
                toast.info("Contribution Updated Successfully", {
                  autoClose: 2000,
                });
              }}
            >
              Update Contribution
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
