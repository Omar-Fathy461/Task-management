import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import HeaderDropdown from './HeaderDropdown';
import AddOrEditBoardModal from '../../components/AddOrEditBoardModal';
import AddOrEditTaskModel from '../../components/AddOrEditTaskModel';
import EllipsisMenu from '../../components/EllipsisMenu';

// style
import '../../sass/header.scss'
import darkLogo from '../../assets/icons8-alpha-67.png';
import whiteLogo from '../../assets/icons8-alpha-67(1).png';
import iconUp from '../../assets/icon-chevron-up.svg';
import iconDown from '../../assets/icon-chevron-down.svg';
import ellipsis from '../../assets/icon-vertical-ellipsis.svg';
import DeleteModal from '../../components/DeleteModal';
import { deleteBoard, setBoardActive } from '../../store/slices/boardsSlice';

function Header({ boardModalOpen, setBoardModalOpen }) {
    const dispatch = useDispatch();
    const boards = useSelector((state) => state.boards);
    const board = boards.find((el) => el.isActive);
    const [dropDown, setDropDown] = useState(false);
    const [themeLogo, setThemeLogo] = useState(false);
    const [taskModalOpen, setTaskModalOpen] = useState(false);
    const [boardType, setBoardType] = useState('add');
    const [isElipsIsOpen, setIsElipsIsOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


    const setOpenEditModel = () => {
        setBoardModalOpen(true);
        setIsElipsIsOpen(false);
    };

    const setOpenDeleteModel = () => {
        setIsDeleteModalOpen(true);
        setIsElipsIsOpen(false);
    };

    const onDeleteButton = () => {
        dispatch(deleteBoard());
        dispatch(setBoardActive({ index: 0 }));
        setIsDeleteModalOpen(false);
    };

    return (
        <div className=' cover'>
            <div className='mx-auto px-2 fixed left-0 bg-white dark:bg-[#0A0A0A] z-50 right-0'>
                <header className='px-2 relative'>
                    <div className='head-content'>
                        {/* <img src={themeLogo ? darkLogo : whiteLogo} alt="logo" style={{ width: '30px', height: '30px' }} /> */}
                        <h1 className="heading md:text-2xl text-3xl hidden md:inline-block font-bold mr-4 ">Alpha</h1>
                        <h1 className='boardTitle dark:text-white'>{board ? board.name : 'Loading...'}</h1>
                        <img className='dropdown-icon cursor-pointer' src={dropDown ? iconUp : iconDown} alt="dropdown icon"
                            onClick={() => {
                                setBoardType('add');
                                setDropDown(state => !state);
                                setBoardModalOpen(false);
                                setIsElipsIsOpen(false);
                            }} />
                    </div>
                    <div className="head-btns">
                        <button className='addNewTask hidden md:block' onClick={() => {
                            setTaskModalOpen(state => !state);
                            setDropDown(false);
                        }}>+ Add New Task</button>
                        <button className='addBtn flex justify-center items-center md:hidden' onClick={() => {
                            setTaskModalOpen(state => !state);
                            setDropDown(false);
                        }}>+</button>
                        <img src={ellipsis} alt="ellipsis icon" className='cursor-pointer' onClick={() => {
                            setBoardType('edit');
                            setDropDown(false);
                            setIsElipsIsOpen(state => !state);
                        }} />
                        {isElipsIsOpen && <EllipsisMenu type='Board' setIsElipsIsOpen={setIsElipsIsOpen} setOpenEditModel={setOpenEditModel} setOpenDeleteModel={setOpenDeleteModel} />}
                    </div>
                </header>

                {dropDown && <HeaderDropdown setDropDown={setDropDown} setBoardModalOpen={setBoardModalOpen} setThemeLogo={setThemeLogo} />}
                {boardModalOpen && <AddOrEditBoardModal setBoardModalOpen={setBoardModalOpen} type={boardType} />}
                {taskModalOpen && <AddOrEditTaskModel device='mobile' setTaskModalOpen={setTaskModalOpen} type="add" />}
                {isDeleteModalOpen && <DeleteModal type='Board' title={board.name} onDeleteButton={onDeleteButton} setIsDeleteModalOpen={setIsDeleteModalOpen} />}
            </div>
        </div>
    );
}

export default Header;
