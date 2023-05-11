import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const CardTask = ({ task, taskDoneChange, onDeleteTask }) => {
  const handleChange = () => {
    taskDoneChange({ objectId: task.objectId, done: !task.done });
  };

  const handleDelete = () => {
    onDeleteTask(task.objectId);
  };

  const containerStyle = task.done
    ? [styles.container, styles.containerDone]
    : styles.container;

  return (
    <View style={containerStyle}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {task.description} - {task.done ? "feita" : "a fazer"}
        </Text>
      </View>
      <Switch value={task.done} onValueChange={handleChange} style={styles.switch} />
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#A570FF",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  containerDone: {
    backgroundColor: "#D8B4FE", 
  },
  textContainer: {
    flex: 1,
    margin: 10,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
  switch: {
    marginLeft: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
});