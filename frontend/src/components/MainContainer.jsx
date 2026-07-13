import ClassifierBox from "./ClassifierBox";
import MessagesBox from "./MessagesBox";

export default function MainContainer(){
    return (
        <div className="main-container">
            <ClassifierBox/>
            <MessagesBox/>
        </div>
    )
}