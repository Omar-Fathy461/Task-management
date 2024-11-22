import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBoardActive } from "../store/slices/boardsSlice";
import Header from "../layout/header/Header";
import Center from "../layout/Center";
import Empty from "./Empty";


const Test = () => {

    const [boardModalOpen, setBoardModalOpen] = useState(false);
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const activeBoard = boards.find((board) => board.isActive);
    if (!activeBoard && boards.length > 0) {
        dispatch(setBoardActive({ index: 0 }))
    }
    return (
        <div className="overflow-hidden scrollbar-hide overflow-x-scroll dark:bg-[#20212c] ">
            <>
                {boards.length > 0 ?
                    <>
                        <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
                        <Center boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen} />
                    </> :
                    <>
                        <Empty type='add' />
                    </>
                }
            </>
        </div>
    )
}

export default Test;