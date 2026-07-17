import { useState } from "react"
import Messages from "./Messages"

export default function MessagesBox({ hamMessages, spamMessages, setHamMessages, setSpamMessages }) {
    // opened tab state
    const [openedTab, setOpenedTab] = useState('Messages')

    return (
        <div className="messages-box">
            <div className="tabs">
                <button className={`tab-btn ${openedTab=='Messages'?'selected-tab':''}`} onClick={() => { setOpenedTab('Messages') }}>Messages ({hamMessages.length})</button>
                <button className={`tab-btn ${openedTab=='Spam'?'selected-tab':''}`} onClick={() => { setOpenedTab('Spam') }}>Spam ({spamMessages.length})</button>
            </div>
            
            <Messages 
                messages={openedTab=='Messages'?hamMessages:spamMessages}
                setHamMessages={setHamMessages}
                setSpamMessages={setSpamMessages}
                />
        </div>
    )
}