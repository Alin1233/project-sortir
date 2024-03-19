/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import serviceProfile from '../services/serviceProfile';
const UploadImg = (props) => {
    
    const fileInput = useRef();
    const [file, setFile] = useState(null); 

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(file); 

        const formData = new FormData();
        formData.append('file', file);

        // Append another parameter
        formData.append('id', props.user.id);
        
        const response = await serviceProfile.uploadImage(formData)
        console.log(response);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" ref={fileInput} onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}

export default UploadImg;