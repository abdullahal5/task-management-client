import { IoMdAdd } from "react-icons/io";
import * as React from "react";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import useAxios from "../hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { AuthContext } from "../authprovider/Authprovider";

const Todo = () => {
    const {user} = React.useContext(AuthContext)
    const navigate = useNavigate()
    const [description, setDescription] = React.useState('')
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 450,
      bgcolor: "background.paper",
      border: "none",
      boxShadow: 24,
      p: 4,
      borderRadius: '15px'
    };
    const mainAxios = useAxios()


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleGET =(e) =>{
        e.preventDefault()
        const title = e.target.title.value;
        const description = e.target.description.value;
        const deadline = e.target.deadline.value;
        const priority = e.target.priority.value;
        const email = user?.email
        const data = {title, description, deadline,email, priority}
        mainAxios.post("/tasks", data )
        .then((res) => {
            navigate("/dashboard/to-do");
            if(res.data.insertedId){
                Swal.fire({
                  title: "Good Job!",
                  text: "you successfully added a task",
                  icon: "success",
                });
            }
        })

    }
    const maxChars = 70
    const handleDescriptionChange =(e) =>{
      const text = e.target.value;
      if(text.length <= maxChars){
        setDescription(text)
      }
    }
  return (
      <div className="min-h-screen">
        <div
          onClick={handleOpen}
          className="flex justify-between items-center text-[#304D30] font-semibold cursor-pointer"
        >
          <p className="text-2xl">Your Task</p>
          <h1 className="bg-[#304D30] py-3 text-white font-bold rounded-lg  w-[160px]">
            <IoMdAdd
              className="inline pr-2"
              color="white"
              fontSize={"1.5rem"}
            />
            Add New Task
          </h1>
        </div>
        <hr className="border-[#304D30] my-5" />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                className="font-bold"
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                Add New Task lorem20
              </Typography>
              <form onSubmit={handleGET}>
                <p className="pt-5">Tak Name</p>
                <input
                  type="text"
                  name="title"
                  className="border border-[#304D30]  w-full py-3 bg-gray-100 rounded-lg pl-5 outline-none"
                  required
                />
                <Typography
                  id="transition-modal-description"
                  sx={{ mt: 2, fontSize: "17px" }}
                >
                  Description
                </Typography>
                <textarea
                  className="border border-[#304D30] mx-atuo bg-gray-100 rounded-lg pl-5 w-full pt-2 resize-none outline-none"
                  name="description"
                  onChange={handleDescriptionChange}
                  id=""
                  rows="5"
                  maxLength={maxChars}
                  required
                ></textarea>
                <p className="text-gray-500 text-right">
                  {maxChars - description.length} characters remaining
                </p>
                <p className="pt-5">Deadline</p>
                <input
                  type="date"
                  name="deadline"
                  className="w-full border-[#304D30] bg-gray-100 py-3 rounded-lg px-2 border outline-none"
                  required
                />
                <p className="pt-5">Priority</p>
                <div className="flex justify-center gap-3">
                  <label className="sidebar-label-container">
                    <input
                      type="radio"
                      value={"low"}
                      name="priority"
                      required
                    />
                    Low
                  </label>
                  <label className="sidebar-label-container">
                    <input
                      type="radio"
                      value={"moderate"}
                      name="priority"
                      required
                    />
                    Moderate
                  </label>
                  <label className="sidebar-label-container">
                    <input
                      type="radio"
                      value={"high"}
                      name="priority"
                      required
                    />
                    High
                  </label>
                </div>
                <div className="text-center my-2">
                  <button
                    type="submit"
                    className="bg-[#304D30] text-white  font-semibold px-4 py-2 rounded-lg w-full"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </Box>
          </Fade>
        </Modal>
        <TaskCard />
      </div>
  );
};

export default Todo;
