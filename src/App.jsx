import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  async function fetchData() {
    const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

    const url =
      "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_API_KEY}`;

    const date = new Date().toDateString();
    const localKey = `NASA-${date}`;

    if (localStorage.getItem(localKey)) {
      const apiData = JSON.parse(localStorage.getItem(localKey));
      setData(apiData);
      console.log("Fetched from Cache today");
      return;
    }
    localStorage.clear();

    try {
      const res = await fetch(url);
      const apiData = await res.json();
      localStorage.setItem(localKey, JSON.stringify(apiData));
      setData(apiData);
      console.log("Fetched from API today");
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loading">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <Sidebar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && (
        <Footer
          data={data}
          showModal={showModal}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  );
}

export default App;
