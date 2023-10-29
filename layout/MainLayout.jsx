import { Box, CssBaseline, ThemeProvider } from "@mui/material";
// import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Children, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import GlobalLoading from "@/components/layoutComponents/GlobalLoading";
import Footer from "@/components/layoutComponents/Footer";
import Topbar from "@/components/layoutComponents/Topbar";
import AuthModal from "@/components/layoutComponents/AuthModal";
import { setListFavorites, setUser } from "@/redux/features/userSlice";
import themeConfigs from "@/configs/theme.configs";


const MainLayout = ({ children }) => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const dispatch = useDispatch();


  const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const authUser = async () => {
  //     const { response, err } = await userApi.getInfo();

  //     if (response) dispatch(setUser(response));
  //     if (err) dispatch(setUser(null));
  //   };

  //   authUser();
  // }, [dispatch]);

  // useEffect(() => {
  //   const getFavorites = async () => {
  //     const { response, err } = await favoriteApi.getList();

  //     if (response) dispatch(setListFavorites(response));
  //     if (err) toast.error(err.message);
  //   };

  //   if (user) getFavorites();
  //   if (!user) dispatch(setListFavorites([]));
  // }, [user, dispatch]);

  return (
    <>

      <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme={themeMode}
        />
        {/* mui reset css */}
        <CssBaseline />

        {/* global loading */}
        <GlobalLoading />
        {/* global loading */}

        {/* login modal */}
        <AuthModal />
        {/* login modal */}

        <Box display="flex" minHeight="100vh">
          {/* header */}
          <Topbar />
          {/* header */}

          {/* main */}
          <Box
            component="main"
            flexGrow={1}
            overflow="hidden"
            minHeight="100vh"
          >
            {children}
          </Box>
          {/* main */}
        </Box>

        {/* footer */}
        <Footer />
        {/* footer */}
      </ThemeProvider>
    </>
  );
};

export default MainLayout;