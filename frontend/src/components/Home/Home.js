import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import './Home.css'

export default function Home() {

    const [file, setFile] = useState()
    const [fileName, setFileName] = useState()
    const [fileType, setFileType] = useState()
    const [fileSize, setFileSize] = useState()
    const [isUploaded, setIsUploaded] = useState(false)
    const [error , setError] = useState()

    const handleChange = (event) => {
        console.log(event.target.files[0])

        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
        setFileSize(event.target.files[0].size)
        setFileType(event.target.files[0].type)

        setIsUploaded(false)
        setError()
    }

    const handleSubmit = async (event) => {

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

        await axios.post(url, formData, config).then((response) => {
            console.log(response.data);
            setIsUploaded(true)
        })
            .catch((error) => {
                if(error.response.data.message==='Could not upload the file: MulterError: File too large'){
                    setError('File size is too large')
                }
                else{
                    setError('Error while uploading file')
                }
            });
    }

    const turncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>

                    <label id="file-upload" for='file-upload'>
                        <input type="file" onChange={handleChange} name='file' id='file-input' />
                        <span id='plus-sign'>+</span> <br /> Browse File
                    </label>
                    <div className='info-container'>
                        {fileName && fileSize && fileType && <div className='file-info'>
                            <p>File Name: {turncate(fileName, 20)}</p>
                            <p>File Size: {fileSize} Kbs</p>
                            <p>File Type: {fileType}</p>
                            {error && <p className='error'>{error}</p>}
                        </div>}
                        <button disabled={!file} type="submit" id='upload-btn'>{isUploaded ? 'Uploaded!' : 'Upload'}</button>
                    </div>
                </form>
            </div>
        </>
    )
}

