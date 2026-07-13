
export default function ClassifierBox({inputData, setInputData}) {
    // handle sender change function
    function handleSenderChange(e){
        setInputData(prev=>({
            ...prev,
            sender: e.target.value
        }))
    }

    // handle message change function 
    function handleMessageChange(e){
        setInputData(prev=>({
            ...prev,
            message: e.target.value
        }))
    }

    return (
        <div className="classifier-box">
            <div className="input-box">
                <span className="sender">Sender</span>
                <textarea className="input-area sender-input" value={inputData.sender || ''} onChange={handleSenderChange}>
                </textarea>
            </div>

            <div className="input-box">
                <span className="sender">Message</span>
                <textarea className="input-area message-input" value={inputData.message || ''} onChange={handleMessageChange}>
                </textarea>
            </div>

            <div className="button-box">
                <button className="classify-btn">Classify</button>
                <button className="clear-btn">Clear</button>
            </div>
        </div>

    )
}