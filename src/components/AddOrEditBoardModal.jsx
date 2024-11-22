import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import crossIcon from '../assets/icon-cross.svg';
import { addBoard, editBoard } from '../store/slices/boardsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const AddOrEditBoardModal = ({ setBoardModalOpen, type, setIsEdit }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [newColumns, setNewColumns] = useState([
        { name: 'Todo', tasks: [], id: uuidv4() },
        { name: 'Doing', tasks: [], id: uuidv4() }
    ]);
    const [isValid, setIsValid] = useState(true);


    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const board = useSelector((state) => state.boards).find((board) => board.isActive);
    if (type === 'edit' && isFirstLoad) {
        setNewColumns(board.columns.map((col) => {
            return { ...col, id: uuidv4() }
        })
        )
        setName(board.name)
        setIsFirstLoad(false)
    }

    const onChange = (id, newValue) => {
        setNewColumns((prevState) => {
            const newState = [...prevState];
            const column = newState.find((el) => el.id === id);
            if (column) {
                column.name = newValue;
            }
            return newState;
        });
    };

    const onDelete = (id) => {
        setNewColumns((perState) => perState.filter((el) => el.id !== id));
    };

    const validate = () => {
        setIsValid(false);
        if (!name.trim()) {
            return false;
        }

        for (let i = 0; i < newColumns.length; i++) {
            if (!newColumns[i].name.trim()) {
                return false;
            }
        }

        setIsValid(true);
        return true;
    };

    const onsubmit = (type) => {
        setBoardModalOpen(false);
        if (type === 'add') {
            dispatch(addBoard({ name, newColumns }));
        } else {
            dispatch(editBoard({ name, newColumns }));
        }
    };


    return (
        <div className='py-4 px-2 fixed  left-0 right-0 scrollbar-hide bottom-0 top-0 z-50 bg-[#000000ab] overflow-scroll flex justify-center items-center'
            onClick={(e) => {
                if (e.target !== e.currentTarget) return;
                setBoardModalOpen(false);
                if (typeof setIsEdit === 'function') {
                    setIsEdit(false);
                }
            }}

        >
            <div className="animate__animated animate__fadeIn scrollbar-hide overflow-scroll max-h-[95vh] bg-white dark:bg-custom-gradient dark:bg-gray-800 text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full p-8 rounded-xl">
                <h3>
                    {type === 'edit' ? 'Edit' : 'Add New'} Board
                </h3>
                <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">Board Name</label>
                    <input type="text" className="bg-transparent px-4 py-2 rounded-md text-sm border  border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0" placeholder="border title"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </div>
                <div className="mt-8 flex flex-col space-y-3">
                    <label className="text-sm dark:text-white text-gray-500">Board Columns</label>
                    {newColumns.map((el, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <input type="text"
                                className="bg-transparent  flex flex-grow px-4 py-2 rounded-md text-sm border font-medium border-gray-600 outline-none focus:outline-[#635fc7] outline-1 ring-0"
                                value={el.name}
                                onChange={(e) => {
                                    onChange(el.id, e.target.value);
                                }} />
                            <FontAwesomeIcon icon={faX} className='cursor-pointer' onClick={() => onDelete(el.id)} />
                        </div>
                    ))}
                </div>
                <button className="bg-black text-white dark:bg-white dark:text-black text-center rounded-full py-2 w-full font-medium mt-5 shadow-md shadow-[#364e7e1a] "
                    onClick={() => {
                        setNewColumns((state) => [
                            ...state,
                            { name: 'Your Task', tasks: [], id: uuidv4() }
                        ]);
                    }}
                >+ Add New Column</button>
                <button className="bg-black text-white dark:bg-white dark:text-black text-center rounded-full py-2 w-full font-medium mt-5 shadow-md shadow-[#364e7e1a] "
                    onClick={() => {
                        const isValid = validate();
                        if (isValid === true) onsubmit(type);
                    }}
                >
                    {type === 'add' ? '+ Create New Board' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default AddOrEditBoardModal;
