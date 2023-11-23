import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/chat/chat";
import Sidebar from "./components/sidebar/Sidebar";
import Pusher from "pusher-js";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/LoginPage.js/Login";
import { Provider } from "react-redux";
import store from "./store";

/**
 * 
 * @returns // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 */
function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:9001/fetchMessages").then((response) => {
      console.log("response", response);
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("85a7d6e4d29721e6049a", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unsubscribe();
      channel.unbind_all();
    };
  }, [messages]);

  const options = "This is JavaScript code";
  function odd() {
    for(let i = 0;i<options?.length;i++){
      return 
    }
  }
  const res = odd();
  console.log("reeeeeeeeeeeee", res);

  return (
    <Provider store={store}>
      <div className="app">
        <div className="app__body">
          {/* <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route
                path="/chat"
                element={
                  <>
                    <Sidebar />
                    <Chat messages={messages} />
                  </>
                }
              ></Route>
            </Routes>
          </BrowserRouter> */}
        </div>
      </div>
    </Provider>
  );
}

export default App;
