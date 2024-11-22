import { useState } from 'react'
import useDarkMode from '../../Hooks/useDarkMode'
import { useSelector } from 'react-redux'

//style
import boardIcon from '../../assets/icon-board.svg'
import darkIcon from '../../assets/icon-dark-theme.svg'
import lightIcon from '../../assets/icon-light-theme.svg'
import { Switch } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { setBoardActive } from '../../store/slices/boardsSlice'

function HeaderDropdown({ setDropDown, setBoardModalOpen, setThemeLogo }) {
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


    return (
        <div className='py-10 elemnt px-6 absolute left-0 right-0 bottom-[-100vh]  top-20 bg-[#00000080]' onClick={
            (e) => {
                if (e.target !== e.currentTarget) {
                    return
                }
                setDropDown(false)
            }
        }>
            <div className='bg-white dark:bg-black shadow-md shadow-black w-full py-4 rounded-xl max-w-2xl mx-auto '>
                <h3 className='dark:text-gray-300 text-gray-600 mx-4 mb-8 font-semibold'>All Boards({boards?.length}) </h3>
                <div>
                    {boards.map((el, index) => (
                        <div className={`flex items-baseline space-x-2 cursor-pointer px-5 py-4 
                            ${el.isActive && 'bg-[#635fc7] rounded-r-full text-white mr-8'}`}
                            key={index} onClick={() => dispatch(setBoardActive({ index }))} >
                            <img src={boardIcon} alt="Board Icon" className='h-4' />
                            <p className='text-lg font-bold dark:text-white '>{el.name}</p>
                        </div>
                    ))}
                    <div className='flex items-baseline space-x-2 px-5 py-4 text-[#635fc7] text-lg font-bold cursor-pointer '
                        onClick={() => {
                            setBoardModalOpen(true)
                            setDropDown(false)
                        }}
                    >
                        <img src={boardIcon} alt="Board Icon" className='h-4' />
                        <p>Create New Board</p>
                    </div>
                    <div className='flex justify-center items-center rounded-xl  bg-slate-600 dark:bg-gray-300 py-3 space-x-2 mx-2 '>
                        <img src={lightIcon} alt="" />
                        <Switch checked={darkMode} onChange={toggleDarkMode} onClick={() => setThemeLogo(state => !state)} className={`${darkMode ? 'bg-[#635fc7]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}>
                            <span className={` ${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 rounded-full bg-white transition`} />
                        </Switch>
                        <img src={darkIcon} alt="" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HeaderDropdown;
