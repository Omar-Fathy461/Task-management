import { createSlice } from "@reduxjs/toolkit";
import data from '../../data/data.json'
import { toast } from "react-toastify";

const boardsSlice = createSlice({
    name: 'boards',
    initialState: data.boards,
    reducers:{
      addBoard: (state, action) => {
        const isActive = state.length > 0 ? false : true;
        const payload = action.payload;
        const board = {
            name: payload.name,
            isActive,
            columns: payload.newColumns,
        };
        toast.success("A new board has been added successfully!", { position: "top-right", theme: "dark" })
        state.push(board);
      },
      editBoard: (state, action) => {
        const payload = action.payload;
        const board = state.find((board) => board.isActive);
        board.name = payload.name;
        board.columns = payload.newColumns;
        toast.success("Board updated successfully!", { position: "top-right", theme: "dark" })
      },
      deleteBoard: (state) => {
        const board = state.find((el) => el.isActive);
        state.splice(state.indexOf(board), 1)
        toast.success("Board deleted successfully!", { position: "top-right", theme:'dark' });
      }
      ,
      setBoardActive: (state, action) => {
        const payload = action.payload;
        state.map((el, index) => {
          index === payload.index ?
          (el.isActive = true) :
          (el.isActive = false) ;
          return el ;
        })
      },
      addTask: (state, action) => {
        const payload = action.payload;
        const task = {
          title: payload.title,
          description: payload.description,
          subtasks: payload.subtasks,
          status: payload.status
        };
        
        const board = state.find((board) => board.isActive);
        
        if (board) { // تأكد أن `board` موجود
          const column = board.columns.find((col, i) => i === payload.newColIndex);
          
          if (column) { // تأكد أن `column` موجود
            if (!column.tasks) {
              column.tasks = []; // تهيئة `tasks` إذا لم تكن موجودة
            }
            column.tasks.push(task);
          } else {
            console.error("Column not found at index:", payload.newColIndex);
          }
        } else {
          console.error("Active board not found");
        }
        toast.success("A new task has been added successfully!", { position: "top-right",theme: "dark" })
      },
      editTask: (state, action) => {
        const {
          title,
          status,
          description,
          subtasks,
          prevColIndex,
          newColIndex,
          taskIndex,
        } = action.payload;
        const board = state.find((board) => board.isActive);
        const column = board.columns.find((col, index) => index === prevColIndex);
        const task = column.tasks.find((task, index) => index === taskIndex);
        task.title = title;
        task.status = status;
        task.description = description;
        task.subtasks = subtasks;
        if (prevColIndex === newColIndex) return;
        column.tasks = column.tasks.filter((task, index) => index !== taskIndex);
        const newCol = board.columns.find((col, index) => index === newColIndex);
        newCol.tasks.push(task);
        toast.success("Task updated successfully!", { position: "top-right", theme: "dark" })
      },
      deleteTask: (state, action) => {
        const payload = action.payload;
        const board = state.find((board) => board.isActive);
        const col = board.columns.find((col, i) => i === payload.colIndex);
        col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
        toast.success("Task deleted successfully!", { position: "top-right" ,theme: "dark"});
      },
      setSubtaskCompleted: (state, action) => {
        const payload = action.payload;
        const board = state.find((board) => board.isActive);
        const col = board.columns.find((col, i) => i === payload.colIndex);
        const task = col.tasks.find((task, i) => i === payload.taskIndex);
        const subtask = task.subtasks.find((subtask, i) => i === payload.index);
        subtask.isCompleted = !subtask.isCompleted;
      },
      setTaskStatus: (state, action) => {
        const payload = action.payload;
        const board = state.find((board) => board.isActive);
        const columns = board.columns;
        const col = columns.find((col, i) => i === payload.colIndex);
        if (payload.colIndex === payload.newColIndex) return;
        const task = col.tasks.find((task, i) => i === payload.taskIndex);
        task.status = payload.status;
        col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
        const newCol = columns.find((col, i) => i === payload.newColIndex);
        newCol.tasks.push(task);
      },
      dragTask: (state, action) => {
        const { colIndex, prevColIndex, taskIndex } = action.payload;
        const board = state.find((board) => board.isActive);
        const prevCol = board.columns.find((col, i) => i === prevColIndex);
        const task = prevCol.tasks.splice(taskIndex, 1)[0];
        board.columns.find((col, i) => i === colIndex).tasks.push(task);
      },
    }
})
export const { addBoard, editBoard, setBoardActive, addTask, editTask, deleteBoard, deleteTask, setSubtaskCompleted, setTaskStatus, dragTask} = boardsSlice.actions;
export default boardsSlice.reducer;