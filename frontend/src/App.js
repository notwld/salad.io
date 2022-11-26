import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import axios from 'axios'
import { useState } from 'react'
function App() {
  const [file, setFile] = useState()
  const handleChange = (event) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  const handleSubmit = (event) => {

    event.preventDefault()
    const url = 'http://localhost:3000/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        "Allow-Control-Allow-Origin": "*",
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }
    return (
      <>
        <h1>Hy</h1>
        <Nav />
        <div>
          <form onSubmit={handleSubmit}>
            <h1>React File Upload</h1>
            <input type="file" onChange={handleChange} />
            <button type="submit">Upload</button>
          </form>
        </div>
      </>
    );
  }

export default App;
