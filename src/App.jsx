import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./components/pages/HomePage.jsx";
import {NavBar} from "./components/navigation/NavBar";
import HallsPage from "./components/pages/HallsPage.jsx";
import AboutUs from "./components/pages/AboutUs";
import {ProfilePage} from "./components/pages/ProfilePage.jsx";
import {OrdersPage} from "./components/pages/OrdersPage.jsx";
import {TablesPage} from "./components/pages/TablesPage.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getProfile} from "./api/user.js";
import {setUser} from "./redux/reducers/userSlice.js";
import {setAuthButtonsLoading} from "./redux/reducers/appSlice.js";
import {PageWrapper} from "./components/common/PageWrapper.jsx";


function App() {
    const dispatch = useDispatch();
    const {authButtonsLoading, pageLoading} = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(setAuthButtonsLoading(true));
        const access_token = localStorage.getItem('access_token');

        if (!access_token) return;

        getProfile().then(resp => {
            if (resp) {
                dispatch(setUser(resp.user));
            }
        })

        dispatch(setAuthButtonsLoading(false));
    }, [])

    return (
        <Router>
            <NavBar authLoading={authButtonsLoading}/>
            <PageWrapper isLoading={pageLoading}>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/halls" element={<HallsPage/>}/>
                    <Route path="/tables" element={<TablesPage/>}/>
                    <Route path="/about" element={<AboutUs/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                </Routes>
            </PageWrapper>
        </Router>
    );
}

export default App;
