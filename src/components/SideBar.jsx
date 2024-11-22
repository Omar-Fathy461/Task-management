import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useDarkMode from "../Hooks/useDarkMode"
import { setBoardActive } from "../store/slices/boardsSlice"
import darkIcon from '../assets/icon-dark-theme.svg'
import lightIcon from '../assets/icon-light-theme.svg'
import { Switch } from '@headlessui/react'
import showSidebarIcon from '../assets/icon-show-sidebar.svg'
import hideSidebarIcon from '../assets/icon-hide-sidebar.svg'
import AddOrEditBoardModal from "./AddOrEditBoardModal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import '../sass/sidebar.scss'

const SideBar = ({ setIsSideBarOpen, isSideBarOpen, setThemeLogo }) => {

    const dispatch = useDispatch()
    const [colorTheme, setColorTheme] = useDarkMode()
    const [darkMode, setDarkMode] = useState(
        colorTheme === 'light' ? true : false
    )

    const toggleDarkMode = (checked) => {
        setColorTheme(colorTheme);
        setDarkMode(checked)
    }
    const boards = useSelector((state) => state.boards);

    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false)

    return (
        <div className={isSideBarOpen ? 'min-w-[261px] bg-white dark:bg-[#0A0A0A] fixed top-[72px] left-0 h-screen z-20 items-center ' : 'bg-[#635fc7] dark:bg-[#2b2c37] dark:hover:bg-[#635fc7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer p-0 transition duration-300 transform fixed w-[56px] h-[48px] rounded-r-full'}>
            <div>
                {/* Rewrite Modal */}
                {isSideBarOpen && (
                    <div className="bg-white dark:bg-[#0A0A0A] py-4 w-full rounded-xl">
                        <h3 className="dark:text-gray-300 text-gray-500 font-semibold mx-4 mb-8">
                            ALL BOARDS ({boards?.length})
                        </h3>
                        <div className="flex flex-col h-[70vh] justify-between ">
                            <div>
                                {boards.map((board, index) => (
                                    <div key={index} onClick={() => dispatch(setBoardActive({ index }))} className={`boards flex items-baseline space-x-2  px-5 mr-8 rounded-r-full duration-500 ease-in-out py-3 cursor-pointer  dark:text-white ${board.isActive && "bg-[#635fc7] rounded-r-full text-white mr-8"}`}>
                                        <FontAwesomeIcon icon={faPencil} />
                                        <p className="text-lg font-bold ">{board.name}</p>
                                    </div>
                                ))}

                                <div onClick={() => {
                                    setIsBoardModalOpen(true)
                                }} className="boards flex items-baseline space-x-2 mr-8 rounded-r-full duration-500 ease-in-out cursor-pointer text-[#635fc7] px-5 py-3 hover:bg-[#2b2c371a] hover:text-[#2b2c37] dark:hover:bg-white">
                                    {/* <FontAwesomeIcon icon={faPen} /> */}
                                    <p className="text-lg font-bold ">+ Create New Board</p>
                                </div>
                            </div>

                            <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
                                <img src={lightIcon} alt="" />
                                <Switch checked={darkMode} onChange={toggleDarkMode} onClick={() => setThemeLogo(state => !state)} className={`${darkMode ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                                    <span className={` ${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 rounded-full bg-white transition`} />
                                </Switch>
                                <img src={darkIcon} alt="" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar hide/show */}
                {isSideBarOpen ? (
                    <div onClick={() => setIsSideBarOpen(state => !state)} className="flex items-center mt-2 absolute bottom-16 font-bold rounded-r-full hover:text-[#635fc7] transition ease-in-out cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white space-x-2 justify-center my-4 text-gray-500 ">
                        <img src={hideSidebarIcon} className="min-w-[20px]" alt="hideSidebarIcon" />
                        {isSideBarOpen && <p>Hide Sidebar</p>}
                    </div>
                ) : <div onClick={() => setIsSideBarOpen(state => !state)} className="absolute transition ease-in-out pt-5">
                    <img src={showSidebarIcon} className="min-w-[20px]" alt="showSidebarIcon" />
                </div>}
            </div>
            {
                isBoardModalOpen && <AddOrEditBoardModal type='add' setBoardModalOpen={setIsBoardModalOpen} />
            }
        </div>
    )
}

export default SideBar