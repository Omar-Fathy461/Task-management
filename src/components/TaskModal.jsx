import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import elipsis from "../assets/icon-vertical-ellipsis.svg"
import EllipsisMenu from "./EllipsisMenu";
import Subtask from "./Subtask";
import { deleteTask, setTaskStatus } from "../store/slices/boardsSlice";
import DeleteModal from './DeleteModal'
import AddOrEditTaskModel from './AddOrEditTaskModel'

const TaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtasks = task.subtasks

    let completed = 0;
    subtasks.forEach((subtask) => {
        if (subtask.isCompleted) {
            completed++
        }
    });

    const [status, setStatus] = useState(task.status)
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

    const setOpenEditModel = () => {
        setIsAddTaskModalOpen(true);
        setElipsisMenuOpen(false)
    };
    const setOpenDeleteModel = () => {
        setIsDeleteModalOpen(true)
        setElipsisMenuOpen(false)
    };

    const onChange = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }

    const onClose = (e) => {
        if (e.target !== e.currentTarget) {
            return
        }
        dispatch(setTaskStatus({ taskIndex, colIndex, newColIndex, status }))
        setIsTaskModalOpen(false)
    }

    const onDeleteButton = () => {
        dispatch(deleteTask({ taskIndex, colIndex }))
        setIsTaskModalOpen(false)
        setIsDeleteModalOpen(false)
    }

    return (
        <div
            onClick={onClose}
            className="fixed left-0 right-0 top-0 bottom-0 px-2 py-4 overflow-scroll scrollbar-hide z-50 flex justify-center items-center bg-[#00000080]"
        >
            {/* Modal Section */}
            <div className="scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-[#2b2c37]
            text-black dark:text-white font-bold shadow-md shadow-[#364e71a] max-w-md mx-auto w-full px-8 py-8 rounded-xl ">
                <div className="relative flex justify-between items-center w-full ">
                    <h1 className="text-lg">
                        {task.title}
                    </h1>
                    <img src={elipsis} className="cursor-pointer h-4" onClick={() => setElipsisMenuOpen(state => !state)} />
                    {elipsisMenuOpen && <EllipsisMenu
                        setOpenEditModel={setOpenEditModel}
                        setOpenDeleteModel={setOpenDeleteModel}
                        type="Task"
                    />}
                </div>
                <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
                    {task.description}
                </p>
                <p className="text-gray-500 font-semibold tracking-wide text-sm pt-6">
                    Suntasks ({completed} of {subtasks.length})
                </p>
                {/* Subtasks Section */}
                <div className="mt-3 space-y-2">
                    {
                        subtasks.map((subtask, index) => {
                            return <Subtask key={index} index={index} taskIndex={taskIndex} colIndex={colIndex} />
                        })
                    }
                </div>

                {/* Current Status Section */}
                <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">
                        Current Status
                    </label>
                    <select className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border border-gray-300 focus:outline-[#635fc7] outline-none" value={status} onChange={onChange}>
                        {
                            columns.map((column, i) => (
                                <option key={i} className="status-option  dark:text-black">{column.name}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {isDeleteModalOpen && <DeleteModal onDeleteButton={onDeleteButton} title={task.title} type="task" setIsDeleteModalOpen={setIsDeleteModalOpen} />}
            {isAddTaskModalOpen && <AddOrEditTaskModel device="mobile" setTaskModalOpen={setIsAddTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} taskIndex={taskIndex} prevColIndex={colIndex} type="edit" />}
        </div>
    )
}

export default TaskModal