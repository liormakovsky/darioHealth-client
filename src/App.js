import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Protected } from "./components";
import { Login, Register, DisplayTotalMessages, Profile } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Header />;
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route
              path="/total-messages"
              element={
                <Protected
                  Cmp={() => {
                    return (
                      <>
                        <DisplayTotalMessages />
                      </>
                    );
                  }}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Protected
                  Cmp={() => {
                    return (
                      <>
                        <Profile />
                      </>
                    );
                  }}
                />
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
