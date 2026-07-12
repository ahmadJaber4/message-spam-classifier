
export default function ClassifierBox(){
    return (
        <div className="classifier-box">
            <h1>Classify Message</h1>

            <textarea className="input-area" placeholder="Enter message...">
            </textarea>

            <div className="button-box">
                <button className="classify-btn">Classify</button>
                <button className="clear-btn">Clear</button>
            </div>
        </div>
        
    )
}