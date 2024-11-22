import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import crossIcon from '../assets/icon-cross.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../store/slices/boardsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AddOrEditTaskModel = ({ type, device, setTaskModalOpen, setIsTaskModalOpen, taskIndex, prevColIndex = 0 }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subtasks, setSubtasks] = useState([
        { title: '', isCompleted: false, id: uuidv4() },
        { title: '', isCompleted: false, id: uuidv4() }
    ]);

    const [isFirstLoad, setIsFirstLoad] = useState(true)




    const [isValid, setIsValid] = useState(true);

    const validate = () => {
        setIsValid(false)
        if (!title.trim()) {
            return false;
        }

        for (let i = 0; i < subtasks.length; i++) {
            if (!subtasks[0].title.trim()) {
                return false
            }
        }
        setIsValid(true)
        return true
    }
    const board = useSelector((state) => state.boards).find((el) => el.isActive);
    const columns = board.columns;
    const col = columns.find((col, index) => index === prevColIndex);
    const task = col ? col.tasks.find((task, index) => index === taskIndex) : ["hhhh"]




    if (type === 'edit' && isFirstLoad) {
        setSubtasks(
            task.subtasks.map((subtask) => {
                return { ...subtask, id: uuidv4() }
            })
        )
        setTitle(task.title)
        setDescription(task.description)
        setIsFirstLoad(false)
    }


    const [status, setStatus] = useState(columns[prevColIndex].name)
    const [newColIndex, setNewColIndex] = useState(prevColIndex);

    const onChangeStatus = (e) => {
        setStatus(e.target.value);
        setNewColIndex(e.target.selectedIndex)

    }
    const onChange = (id, newValue) => {
        setSubtasks((prevState) => {
            const newState = [...prevState];
            const subtask = newState.find((el) => el.id === id)
            subtask.title = newValue;
            return newState;
        })
    }

    const onDelete = (id) => {
        setSubtasks((prevState) => prevState.filter((el) => el.id !== id))
    }

    const onsubmit = (type) => {
        if (type === 'add') {
            dispatch(addTask({
                title,
                description,
                subtasks,
                status,
                newColIndex
            }))
        } else {
            dispatch(editTask({
                title,
                description,
                subtasks,
                status,
                taskIndex,
                prevColIndex,
                newColIndex
            }))
        }
    }

    return (
        <div
            className={device === 'mobile' ?
                'py-6 px-6 pb-40 absolute   flex left-0 right-0 bottom-[-100vh] top-0 bg-[#00000080]'
                : 'py-6 px-6 pb-40 absolute overflow-y-scroll flex left-0 right-0 bottom-0 top-0 bg-[#000000]'
            }

            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setTaskModalOpen(false)
            }}
        >
            {/* Modal Section */}
            <div className=" animate__animated animate__fadeIn overflow-y-scroll scrollbar-hide h-[600px] bg-white dark:bg-custom-gradient dark:bg-gray-800 text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full p-8 rounded-xl"
            >
                <h3 className='text-lg'>{type === 'edit' ? 'Edit' : 'Add New'} Task</h3>
                {/* Task Name */}

                <div className='mt-8 flex flex-col space-y-1'>
                    <label className='text-sm dark:text-white text-gray-500'>Task Name</label>
                    <input type="text"
                        className="bg-transparent  flex flex-grow px-4 py-2 rounded-md text-sm border font-medium border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
                        value={title}
                        placeholder='Your Task'
                        onChange={(e) => setTitle(e.target.value)} />
                </div>

                {/* Description */}

                <div className='mt-8 flex flex-col space-y-1'>
                    <label className='text-sm dark:text-white text-gray-500'>Description</label>
                    <textarea type="text"
                        className="bg-transparent  flex flex-grow px-4 py-2 rounded-md text-sm border font-medium border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0 min-h-[150px]"
                        value={description}
                        placeholder='Your Description'
                        onChange={(e) => setDescription(e.target.value)} />
                </div>

                {/* Subtasks */}
                <div className='mt-8 flex flex-col space-y-1'>
                    <label className='text-sm dark:text-white text-gray-500'>Subtasks</label>
                    {
                        subtasks.map((el, i) => {
                            return (
                                <div key={i}
                                    className='flex items-center w-full gap-3'
                                >
                                    <input type="text"
                                        className="bg-transparent  flex flex-grow px-4 py-2 rounded-md text-sm border font-medium border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0 my-2"
                                        value={el.title}
                                        placeholder='Your Task'
                                        onChange={(e) => {
                                            onChange(el.id, e.target.value)
                                        }}
                                    />
                                    <FontAwesomeIcon icon={faX} className='cursor-pointer' onClick={() => onDelete(el.id)} />
                                </div>
                            )
                        })
                    }
                </div>
                <button
                    className="bg-black text-white dark:bg-white dark:text-black text-center rounded-full py-2 w-full font-medium mt-5 shadow-md shadow-[#364e7e1a] "
                    onClick={() => {
                        setSubtasks((prevState) => [...prevState, { title: '', isCompleted: false, id: uuidv4() }])
                    }}>
                    + Add New Subtask
                </button>

                {/* Current Status Section */}
                <div className='mt-8 flex flex-col space-y-3'>
                    <label className='text-sm dark:text-white text-gray-500 '>Current Status</label>
                    <select value={status} onChange={(e) => onChangeStatus(e)} className='select-status text-black flex flex-grow px-4 py-2 rounded-md text-sm border-gray-300'>
                        {
                            columns.map((el, i) => {
                                return (
                                    <option className='dark:text-white text-black dark:bg-black' value={el.name} key={i}>{el.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button
                    className="bg-black text-white dark:bg-white dark:text-black text-center rounded-full py-2 w-full font-medium mt-5 shadow-md shadow-[#364e7e1a] "
                    onClick={() => {
                        const valid = validate();
                        if (valid === true) onsubmit(type)
                        setTaskModalOpen(false)
                    }}
                >
                    {type === 'edit' ? 'Save Edit' : 'Create Task'}
                </button>
            </div>
        </div>
    )
}

export default AddOrEditTaskModel