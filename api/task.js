import axios from "axios";

const instance = axios.create({
  baseURL: "https://parseapi.back4app.com/classes/",
  headers: {
    "X-Parse-Application-Id": "oZCIgulMLQeU5mMlRapmJr4jPj7ZuuF67jlguft1",
    "X-Parse-REST-API-Key": "z4EMYbAoYr2PrhuHtwCYA6Bly5vTfWOvq66thGCe",
  },
});

export const getTasks = () => instance.get("Task").then((res) => res.data);

export const updateTask = (task) => {
  return instance.put(`/Task/${task.objectId}`, task, {
    headers: { "Content-Type": "application/json" },
  });
};

export const createTask = (task) => {
  return instance.post("Task", task);
};

  
  export const deleteTask = (taskId) => {
    return instance.delete(`Task/${taskId}`);
  };

