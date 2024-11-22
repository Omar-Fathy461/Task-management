import { useDispatch, useSelector } from "react-redux";
import { setSubtaskCompleted } from "../store/slices/boardsSlice";
const Subtask = ({ colIndex, taskIndex, index }) => {

    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive);
    const columns = board.columns;
    const col = columns.find((col, i) => i === colIndex);
    const task = col.tasks.find((task, i) => i === taskIndex);
    const subtask = task.subtasks.find((subtask, i) => i === index);
    const checked = subtask.isCompleted;

    const onchange = () => {
        dispatch(setSubtaskCompleted({ index, taskIndex, colIndex }))
    }

    return (
        <div className="w-full hover:bg-[#635fc740] dark:hover:bg-[#635fc740] rounded-md flex items-center justify-start relative dark:bg-[#20212c] p-3 gap-4 bg-[#f4f7fd]">
            <input type="checkbox" onChange={onchange} className="w-4 h-4 accent-[#635fc7] cursor-pointer" checked={checked} />
            <p className={checked ? 'line-through opacity-30' : undefined}>
                {subtask.title}
            </p>
        </div>
    )
}

export default Subtask