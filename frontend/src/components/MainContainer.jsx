import axios from 'axios'
import { useState } from "react";
import ClassifierBox from "./ClassifierBox";
import MessagesBox from "./MessagesBox";

export default function MainContainer() {
    // input data state
    const [inputData, setInputData] = useState({
        sender: null,
        message: null
    })

    // result state
    const [result, setResult] = useState()

    // spam and ham messages states (lists)
    const [spamMessages, setSpamMessages] = useState([])
    const [hamMessages, setHamMessages] = useState([])

    // error and loading states
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // handle classify function
    async function handleClassify() {
        setError(null)
        setResult()

        // check if there are any empty fields
        if (!inputData.sender?.trim() || !inputData.message?.trim()) {
            setError('No empty fields are allowed')
            return
        }

        setLoading(true)

        try {
            // POST request to send data and receive class
            const result = await axios.post('http://127.0.0.1:8000/predict', {
                message: inputData.message
            })

            setResult(result.data.class)

            // add message to corresponding list (normal or spam)
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
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }

    }

    // handle clear function
    function handleClear() {
        setInputData({
            sender: null,
            message: null
        })

        setResult()
        setError(null)
        setLoading(false)
    }

    return (
        <div className="main-container">
            <ClassifierBox
                inputData={inputData}
                setInputData={setInputData}
                handleClassify={handleClassify}
                handleClear={handleClear}
                result={result}
                loading={loading}
                error={error} />
            <MessagesBox />
        </div>
    )
}