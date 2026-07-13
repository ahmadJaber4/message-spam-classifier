import axios from 'axios'
import { useState } from "react";
import ClassifierBox from "./ClassifierBox";
import MessagesBox from "./MessagesBox";

export default function MainContainer() {
    // input data state
    const [inputData, setInputData] = useState({
        sender: '',
        message: ''
    })

    // result state
    const [result, setResult] = useState()

    // spam and ham messages states (lists)
    const [spamMessages, setSpamMessages] = useState([])
    const [hamMessages, setHamMessages] = useState([])

    // handle classify function
    async function handleClassify() {
        const result = await axios.post('http://127.0.0.1:8000/predict', {
            message: inputData.message
        })

        setResult(result.data.class)

        if (result.data.class == 'Ham') {
            setHamMessages(prev => ([
                ...prev,
                {
                    ...inputData,
                    class: result.data.class
                }
            ]))
        } else {
            setSpamMessages(prev => ([
                ...prev,
                {
                    ...inputData,
                    class: result.data.class
                }
            ]))
        }
    }

    // handle clear function
    function handleClear(){
        setInputData({
            sender: '',
            message: ''
        })

        setResult()
    }

    return (
        <div className="main-container">
            <ClassifierBox 
                inputData={inputData} 
                setInputData={setInputData} 
                handleClassify={handleClassify}
                handleClear={handleClear} 
                result={result}/>
            <MessagesBox />
        </div>
    )
}