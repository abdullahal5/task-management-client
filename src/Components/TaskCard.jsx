import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { AuthContext } from "../authprovider/Authprovider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskCard = () => {
  const { user } = React.useContext(AuthContext);
  const mainAxios = useAxios();
  const [expandedTask, setExpandedTask] = React.useState({});
  const [columns, setColumns] = React.useState([]);
  

  const fetchData = async () => {
    try {
      const res = await mainAxios.get(`/tasks/${user?.email}`);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  };

  const {
    isPending,
    data: dd,
    refetch,
  } = useQuery({
    queryKey: ["taskData"],
    queryFn: fetchData,
  });
  
  
  React.useEffect(() => {
      if(dd){
        const updatedColumns = [
          {
            name: "Todo",
            id: "111",
            items: dd,
          },
          {
            name: "On going",
            id: "222",
            items: [],
          },
          {
            name: "Completed",
            id: "444",
            items: [],
          },
        ];
        setColumns(updatedColumns);
      }
      else {
        refetch()
      }
  }, [dd]);



  
  

  const toggleExpand = (taskId) => {
    setExpandedTask((prevState) => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  if (isPending) {
    return (
      <div className="flex justify-center h-[100vh] items-center">
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      </div>
    );
  }

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceColumn = columns.find((col) => col.id === source.droppableId);
    const destinationColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    if (source.droppableId === destination.droppableId) {
      const items = Array.from(sourceColumn.items);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      const updatedColumn = {
        ...sourceColumn,
        items: items,
      };

      const updatedColumns = columns.map((col) =>
        col.id === source.droppableId ? updatedColumn : col
      );

      setColumns(updatedColumns);
    } else {
      const sourceItems = Array.from(sourceColumn.items);
      const destItems = Array.from(destinationColumn.items);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const updatedSourceColumn = {
        ...sourceColumn,
        items: sourceItems,
      };

      const updatedDestinationColumn = {
        ...destinationColumn,
        items: destItems,
      };

      const updatedColumns = columns.map((col) => {
        if (col.id === source.droppableId) {
          return updatedSourceColumn;
        } else if (col.id === destination.droppableId) {
          return updatedDestinationColumn;
        }
        return col
      });
      setColumns(updatedColumns)
  }
}
  return (
    <div className="">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        <div className="grid grid-cols-3   h-full w-full mx-auto">
          {columns?.map((column) => (
            <div key={column.id} className="h-[100vh] border border-[#304D30]">
              <h2 className="text-3xl text-black border-b border-[#304D30]">
                {column.name}
              </h2>
              <div>
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className=""
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        minHeight: "100vh",
                      }}
                    >
                      {column?.items?.map((item, index) => (
                        <Draggable
                          draggableId={item._id}
                          key={item._id}
                          index={index}
                        >
                          {(provided) => {
                            return (
                              <div className="flex justify-center">
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
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
                                              onClick={() =>
                                                toggleExpand(item._id)
                                              }
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
                                              onClick={() =>
                                                toggleExpand(item._id)
                                              }
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
                              </div>
                            );
                          }}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskCard;
