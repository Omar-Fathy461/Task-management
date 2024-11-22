import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../components/SideBar';
import Column from '../components/Column';
import Empty from '../components/Empty';
import AddOrEditBoardModal from '../components/AddOrEditBoardModal';

const Center = ({ boardModalOpen, setBoardModalOpen }) => {
    const boards = useSelector((state) => state.boards);
    const board = boards.find((board) => board.isActive === true);
    const columns = board?.columns || [];
    const [isEdit, setIsEdit] = useState(false)
    const [themeLogo, setThemeLogo] = useState(true);
    const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const [isSideBarOpen, setIsSideBarOpen] = useState(true);

    return (
        <div className={
            windowSize[0] >= 768 && isSideBarOpen
                ? 'bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-custom-gradient dark:bg-gray-950 overflow-x-scroll gap-6 ml-[261px]'
                : 'bg-[#f4f7fd]  scrollbar-hide h-screen flex dark:bg-custom-gradient dark:bg-gray-950 overflow-x-scroll gap-6'
        }
        // there is h-screen in true condation
        >
            {windowSize[0] >= 768 && (
                <SideBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} setThemeLogo={setThemeLogo} />
            )}
            {/* Columns Section */}
            {columns.length > 0 ?
                (<>
                    {columns.map((col, index) => (
                        <Column key={index} colIndex={index} />
                    ))}
                    <div
                        onClick={() => {
                            setIsEdit(true)
                        }}
                        className='h-screen bg-[#e9effa] dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635fc7] transition duration-300 cursor-pointer scrollbar-hide mx-5 pt-[90px] min-w-[280px] text-[#828fa3] mt-[135px] rounded-lg'>
                        + New Column
                    </div>
                </>)
                :
                (<>
                    <Empty type='edit' />
                </>)}

            {isEdit && <AddOrEditBoardModal type='edit' setIsEdit={setIsEdit} setBoardModalOpen={setBoardModalOpen} />}
        </div>
    );
}

export default Center;
