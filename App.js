import React, { useState } from "react";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

export default function App(){
  const[task, setTask] = useState([]);
  const[newTask, setNewTask] = useState("");

  async function addTask(){
    if (newTask == ""){
      return;
    }
  }


  async function addTask(){
    //verificação se existe duas tarefas com o mesmo nome
    const search = task.filter(task => task == newTask);
    if(search.length !=0){
      Alert.alert("Atenção","Nome da tarefa repetido!");
      return;
    }

    setTask([...task, newTask]);
    setNewTask(""); //limpar a caixa de input após o submit

    Keyboard.dismiss();//para descer o teclado após a digitação
}
    //função remover
    async function removeTask(item){
      Alert.alert(
        "Deletar Tarefa",
        "Deseja mesmo apagar essa tarefa?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
            style: "cancel"
          },
          {
            text: "Ok",
            onPress: () => setTask(task.filter(tasks => tasks != item))
          }
        ],
        {cancelable: false}
      )
    }

    return (
      <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behaviour="padding"
        style={{ flex: 1}}
        enable={ Platform.OS == 'ios'}
      >
        <View style={styles.container}>
            <View style={styles.Body}>
              <FlatList 
              style={styles.FlatList} 
              data={task}
              keyExtractor={item => item.toString()} //identificação da tarefa
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <Text style={styles.Texto}>{item}</Text>
                  <TouchableOpacity onPress={() => removeTask(item)}>
                    <MaterialIcons 
                    name="delete"
                    size={25}
                    color={"#f60c70"}
                    />
                    </TouchableOpacity>  
                </ View>
                )}
              />
            </View>
          <View style={styles.Form}>
              <TextInput style={styles.Input}
              placeholderTexColor='#999'
              autoCorrect={true}
              placeholder="Adicione uma tarefa"
              maxLength={25}
              onChangeText={text => setNewTask(text)}
              value={newTask}
              />
              <TouchableOpacity style={styles.Button} onPress={() => addTask()}>
                <Ionicons name="add" size={24} color="#FFF" />
              </TouchableOpacity>
          </View>
        </View>
        </KeyboardAvoidingView>
      </>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 20,
    },
    Body: {
      flex: 1
    },
    Form: {
      padding: 0,
      height: 60,
      justifyContent: 'center',
      alignSelf: 'stretch',
      flexDirection: 'row',
      paddingTop: 13,
      borderTopWidth: 1,
      borderColor: '#eee',
      // backgroundColor: '#777'
    },
    Input: {
      flex: 1,
      height: 40,
      backgroundColor: '#eee',
      borderRadius: 4,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor: '#eee',
    },
    Button: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#1c6cce',
      borderRadius: 4,
      marginLeft: 10
    },
    FlatList: {
      flex:1,
      marginTop: 5,
    },
    ContainerView: {
      marginBottom: 15,
      padding: 15,
      borderRadius: 4,
      backgroundColor: "#eee",

      display: 'flex',
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#eee"
    },
    Texto:{
      fontSize: 14,
      color: "#333",
      fontWeight: "bold",
      marginTop: 4,
      textAlign: "center"
    }
});