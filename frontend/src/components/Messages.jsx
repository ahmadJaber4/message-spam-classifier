
export default function Messages({ messages, setHamMessages, setSpamMessages }) {
    // delete message function
    function deleteMsg(msg){
        if (msg.class == 'Ham'){
            setHamMessages(prev => prev.filter((message) => message !== msg))
        } else {
            setSpamMessages(prev => prev.filter((message) => message !== msg))
        }
    }

    return (
        <div className="messages">
            {
                messages.map((message, index) => {
                    return (
                        <div key={index} className="message">
                            <div className="message-header">
                                <div>
                                    <i className="fa-regular fa-circle-user fa-xl" style={{ color: 'white', paddingRight: '10px' }}></i>
                                    {message.sender}
                                </div>
                                <button className="delete-msg-btn" onClick={()=>deleteMsg(message)}>
                                    <i className="fa-solid fa-trash-can" style={{color: 'red', paddingRight: '7px'}}></i>
                                    Delete
                                </button>
                            </div>
                            <div className="message-body">{message.message}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}