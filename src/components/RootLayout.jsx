import { Outlet } from "react-router-dom";
import Header from "../layout/header/header";

function RootLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default RootLayout
