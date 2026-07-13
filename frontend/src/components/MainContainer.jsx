import { useState } from "react";
import ClassifierBox from "./ClassifierBox";
import MessagesBox from "./MessagesBox";

export default function MainContainer(){
    // input data state
    const [inputData, setInputData] = useState({
        sender: '',
        message: ''
    })

    // spam and ham messages states (lists)
    const [spamMessages, setSpamMessages] = useState([])
    const [hamMessages, setHamMessages] = useState([])

    return (
        <div className="main-container">
            <ClassifierBox inputData={inputData} setInputData={setInputData}/>
            <MessagesBox/>
        </div>
    )
}