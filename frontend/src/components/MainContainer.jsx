import axios from 'axios'
import { useState, useEffect } from "react";
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

    // spam and ham messages states (lists), initialized from localStorage
    const [spamMessages, setSpamMessages] = useState(() => {
        try { 
            return JSON.parse(localStorage.getItem('spamMessages')) || [] 
        } 
        catch { 
            return [] 
        }
    })
    const [hamMessages, setHamMessages] = useState(() => {
        try { 
            return JSON.parse(localStorage.getItem('hamMessages')) || [] 
        } catch { 
            return [] 
        }
    })

    // persist messages to localStorage on change
    useEffect(() => { 
        localStorage.setItem('spamMessages', JSON.stringify(spamMessages)) 
    }, [spamMessages])

    useEffect(() => { 
        localStorage.setItem('hamMessages', JSON.stringify(hamMessages)) 
    }, [hamMessages])

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
            const result = await axios.post('https://message-spam-classifier-backend.onrender.com/predict', {
                message: inputData.message
            })

            setResult(result.data.class)

            // add message to corresponding list (normal or spam)
            if (result.data.class == 'Ham') {
                setHamMessages(prev => ([
                    {
                        ...inputData,
                        class: result.data.class
                    },
                    ...prev
                ]))
            } else {
                setSpamMessages(prev => ([
                    {
                        ...inputData,
                        class: result.data.class
                    },
                    ...prev
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
            <MessagesBox 
                hamMessages={hamMessages}
                spamMessages={spamMessages}
                setHamMessages={setHamMessages}
                setSpamMessages={setSpamMessages}/>
        </div>
    )
}