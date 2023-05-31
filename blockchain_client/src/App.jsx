import { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const App = () => {

    const [blockchain, setBlockchain] = useState([]);
    const url = 'http://localhost:5001/1/blocks';

    const loadBlockchain = async () => {
        const { data } = await axios.get(url);
        const lol = await axios.get(url);
        console.log(lol);
        console.log(data);
        setBlockchain(data);
    };

    useEffect(() => {
        loadBlockchain();
      }, []);

    const html = blockchain.map((block) => {
        return (
            <div key={block.hash}>
                <ul className='list'>
                    <li>Time: {new Date(block.timestamp).toLocaleString()}</li>
                    <li>Data: {block.data}</li>
                    <li>Hash: {block.hash}</li>
                    <li>Previous Hash: {block.lastHash}</li>
                </ul>
            </div>
        );
    });

    const handleAddBlock = async (e) => {
        e.preventDefault();
        const data = e.target.data.value;
        const newBlock = { data };
        // console.log(newBlock);
        const response = await axios.post(url, newBlock);
        console.log(response);
        loadBlockchain();
    }
    

    return (
        <div className='App'>
            <div className='title'>
                <h1>Blockchain Site</h1>
            </div>
            <div className='form'>
                <form onSubmit={handleAddBlock}>
                    <input type="text" name='data' />
                    <button>Add</button>
                </form>
            </div>
            <div>
                {html}
            </div>
        </div>
    );
}

export default App;