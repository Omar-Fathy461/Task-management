import { useDispatch } from "react-redux"
const DeleteModal = ({ type, title, onDeleteButton, setIsDeleteModalOpen }) => {

    const dispatch = useDispatch()


    return (
        <div className='py-4 px-2 fixed  left-0 right-0 scrollbar-hide bottom-0 top-0 z-50 bg-[#000000ab] overflow-scroll flex justify-center items-center'
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setIsDeleteModalOpen(false)
            }}
        >
            <div className="scrollbar-hide overflow-scroll max-h-[95vh] bg-white  dark:bg-gray-900 text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full p-8 rounded-2xl">
                <h3 className="text-red-600">Delete This {type} ?</h3>
                {type === 'task' ? (
                    <p className="text-gray-500  font-semibold tracking-wide text-sm pt-3">
                        Are you want to delete the "{title}" task and its subtasks? This action cannot be reversed.
                    </p>
                ) : (
                    <p className="text-gray-500 dark:text-gray-300 font-semibold tracking-wide text-sm pt-3">
                        Are you want to delete the "{title}" board? this action remove all columns and tasks and cannot be reversed
                    </p>
                )}
                <div className="flex gap-2 mt-4">
                    <button className="bg-red-600 w-full text-white rounded-full py-2 px-3" onClick={() => onDeleteButton()}>Delete</button>
                    <button className="bg-gray-300 w-full text-gray-700 rounded-full" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal