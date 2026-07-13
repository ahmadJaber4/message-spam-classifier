
export default function ClassifierBox() {
    return (
        <div className="classifier-box">
            <div className="input-box">
                <span className="sender">Sender</span>
                <textarea className="input-area sender-input">
                </textarea>
            </div>

            <div className="input-box">
                <span className="sender">Message</span>
                <textarea className="input-area message-input">
                </textarea>
            </div>

            <div className="button-box">
                <button className="classify-btn">Classify</button>
                <button className="clear-btn">Clear</button>
            </div>
        </div>

    )
}