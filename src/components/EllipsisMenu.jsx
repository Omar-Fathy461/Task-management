import { useState, useEffect } from 'react';
import { auth, db } from '../auth/firebase';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const EllipsisMenu = ({ type, setOpenEditModel, setOpenDeleteModel }) => {

    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("User not logged in");
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            window.location.href = '/login';
            toast.success("User Logged Out Successfully", { position: "top-center" });
        } catch (error) {
            toast.error(`Logout failed: ${error.message}`, { position: "top-center" });
        }
    };


    return (
        <div className={type === "Board" ? 'absolute top-16 right-5' : 'absolute top-6 right-4'} >
            <div className="flex justify-end items-center">
                <div className="w-40 mt-0 text-sm z-50 font-medium shadow-md shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-lg h-auto pr-12"
                >
                    <p className="cursor-pointer dark:text-gray-400 text-gray-700" onClick={() => setOpenEditModel()}>
                        Edit {type}
                    </p>
                    <p className="cursor-pointer text-red-500" onClick={() => setOpenDeleteModel()}>
                        Delete {type}
                    </p>

                    {type === 'Board' ? (
                        <div>
                            {
                                userDetails ? (
                                    <>
                                        <button onClick={handleLogout} className='text-black font-semibold dark:text-white flex items-center gap-1'><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
                                    </>
                                ) : (
                                    <button onClick={handleLogout} className='text-black font-semibold dark:text-white flex items-center gap-1'><FontAwesomeIcon icon={faRightFromBracket} /> Logout</button>
                                )
                            }
                        </div>
                    ) : ''}

                </div>
            </div>
        </div>
    )
}

export default EllipsisMenu