import React, { useState, useEffect } from "react";
import Header from './components/header/Header';
import MainContent from './components/mainContent/MainContent';
import Footer from './components/common/footer/Footer';
import { useTranslation } from "react-i18next";
import useLink from "./hooks/useLink";
import authStorage from "./auth/authStorage";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./components/Home/Home";
import Container from '@mui/material/Container';

function App() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  useLink(
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  );

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (!user) return setReady(true);
    dispatch(loginAction(user));
    setReady(true);
  };

  useEffect(() => {
    restoreUser();
    document.title = t("app_title");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //-------Notification ----------------
  const notification = useSelector((state) => state.notification.notificationText);

  useEffect(() => {
    if (notification !== "") {
      toast.info(notification)
    }
  }, [notification]);
  //---END---Notification--------------

  //get page from local storage
  const updatePage = useSelector((state) => state.pages.update);

  let page = localStorage.getItem('page');

  useEffect(() => {
    /* console.log('updatePage') */
  }, [updatePage]);

  const toHomePage = () => {
    localStorage.setItem('page', 'home');
    dispatch(updatePage());
  };

  return (
    <>
      {!ready && <>Loading....</>}
      {ready &&
        <Container maxWidth="lg">
          <div className="app">
            < ToastContainer position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light" />
            <Header />
            <Home page={page} />
            <MainContent page={page} />
            <Footer />
          </div>
        </Container>
      }
    </>
  );
}

export default App;
