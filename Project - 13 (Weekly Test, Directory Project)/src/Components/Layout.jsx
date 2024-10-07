import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return(
        <>
            <Header />
            {/* Dynamic Content Part */}
            <Outlet />
        </>
    );

}

export default Layout;