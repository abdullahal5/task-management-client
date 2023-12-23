import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AuthContext } from "../authprovider/Authprovider";
import { DragDropContext } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";

const TaskCard = () => {
  const { user } = React.useContext(AuthContext);
  const [expandedTask, setExpandedTask] = React.useState({});
  const [tasksData, setTasksData] = React.useState([]); 
  const mainAxios = useAxios();
  const { isPending, data } = useQuery({
    queryKey: ["taskData"],
    queryFn: async () => {
      const res = await mainAxios.get(`/tasks/${user?.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center h-[100vh] items-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  const toggleExpand = (taskId) => {
    setExpandedTask((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };


  const handleDragDrop = (results) =>{
    // console.log(results)
    const { source, destination, draggableId } = results;
    // console.log(results.type)
    if(!destination) return

    if(source.droppableId === destination.droppableId && source.index === destination.index) return

    
    
    if (destination.droppableId === "ongoing") {
      const draggedTask = data.find((item) => item._id === draggableId);
      draggedTask.status = "ongoing";
      const updatedData = Array.from(data);

      // Assuming your task has moved to the "On-going" section
      if (destination.droppableId === "ongoing") {
        // Remove the dragged task from its previous position
        updatedData.splice(source.index, 1);

        // Add the dragged task to the new position (in this case, the end of "On-going")
        updatedData.push(draggedTask);

        // Update the state with the modified data
        setTasksData(updatedData);
        
      }
    }
  };

  
  console.log(tasksData)
  
  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <Droppable droppableId="all" type="group">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1"
          >
            <div>
              <h1>To-Do</h1>
              <div className="grid grid-cols-1 gap-3">
                {data?.map((item, index) => (
                  <Draggable
                    draggableId={item._id}
                    key={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <div className="text-gray-900 border border-[#304D30] rounded-lg bg-gray-100 w-[275px] p-3 h-52">
                          <h1 className="text-xl font-bold">
                            Title: {item.title}
                          </h1>
                          <p className="py-3">
                            Description: {item.description}
                            {expandedTask[item._id] ? (
                              item.description.length > 20 ? (
                                <span>
                                  {item.description.slice(0, 50)}
                                  <button
                                    onClick={() => toggleExpand(item._id)}
                                    className="text-[#304D30] underline font-bold"
                                  >
                                    See More
                                  </button>
                                </span>
                              ) : (
                                item.description
                              )
                            ) : (
                              <span>
                                {item.description}
                                {item.description.length < 20 ? (
                                  ""
                                ) : (
                                  <button
                                    className="text-[#304D30] underline font-bold"
                                    onClick={() => toggleExpand(item._id)}
                                  >
                                    See less
                                  </button>
                                )}
                              </span>
                            )}
                          </p>
                          <p>Deadline: {item.deadline}</p>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {provided.placeholder}
            </div>
            <div>
              <h1>On-going</h1>
              <Droppable droppableId="ongoing" type="task">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="grid grid-cols-1 gap-3 h-[100vh]"
                  >
                    {tasksData.map((item) => (
                      <div key={item._id} className="text-gray-900 border border-[#304D30] rounded-lg bg-gray-100 w-[275px] p-3 h-52">
                        <h1 className="text-xl font-bold">
                          Title: {item.title}
                        </h1>
                        <p className="py-3">
                          Description: {item.description}
                          {expandedTask[item._id] ? (
                            item.description.length > 20 ? (
                              <span>
                                {item.description.slice(0, 50)}
                                <button
                                  onClick={() => toggleExpand(item._id)}
                                  className="text-[#304D30] underline font-bold"
                                >
                                  See More
                                </button>
                              </span>
                            ) : (
                              item.description
                            )
                          ) : (
                            <span>
                              {item.description}
                              {item.description.length < 20 ? (
                                ""
                              ) : (
                                <button
                                  className="text-[#304D30] underline font-bold"
                                  onClick={() => toggleExpand(item._id)}
                                >
                                  See less
                                </button>
                              )}
                            </span>
                          )}
                        </p>
                        <p>Deadline: {item.deadline}</p>
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
            <div>
              <h1>Completed</h1>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskCard;
