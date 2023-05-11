import { ActivityIndicator, FlatList, Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CardTask } from "../components/CardTask";
import { getTasks, updateTask, createTask, deleteTask } from "../api/task";
import React from "react";

export const TaskScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  const [newTaskTitle, setNewTaskTitle] = React.useState("");
  const [newTaskDescription, setNewTaskDescription] = React.useState("");

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleCreateTask = () => {
    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      done: false,
    };

    createTask(newTask)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        setNewTaskTitle("");
        setNewTaskDescription("");
      })
      .catch((error) => {
        console.error("Erro ao criar tarefa:", error);
      });
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      })
      .catch((error) => {
        console.error("Erro ao excluir tarefa:", error);
      });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#eedcf7",
    },
    input: {
      height: 40,
      marginBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: "white",
      width: "100%",
    },
    buttonContainer: {
      backgroundColor: "#2f0147",
      borderRadius: 4,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: "center",
      width: "100%",
    },
    buttonText: {
      color: "white",
      fontWeight: 800,
      textShadowColor: "rgba(0, 0, 0, 0.2)",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      fontSize: 15,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginTop: 20,
      marginBottom: 10,
    },
  });

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <TextInput
          style={styles.input}
          placeholder="Título da tarefa"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Descrição da tarefa"
          value={newTaskDescription}
          onChangeText={setNewTaskDescription}
          multiline
        />
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleCreateTask}
      >
        <Text style={styles.buttonText}>Criar Tarefa</Text>
      </TouchableOpacity>

      {isFetching && <Text>Atualizando</Text>}
      <Text style={styles.title}>Tarefas</Text>
      <FlatList
  style={{ flex: 1 }}
  data={data.results}
  keyExtractor={(item) => item.objectId}
  renderItem={({ item }) => (
    <CardTask
      task={item}
      navigation={navigation}
      taskDoneChange={mutation.mutate}
      onDeleteTask={handleDeleteTask}
    />
        )}
      />
    </View>
  );
};
