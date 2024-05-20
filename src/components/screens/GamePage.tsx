import Button from "../UI/common/Button";
import {ChangeStateDialog, Question} from "../UI/gamePage/OtherMainComponent";
import {LoremIpsum} from 'lorem-ipsum';
import '../../css/bootstrap.min.css'
import Image from "../UI/common/Image";
import Input from "../UI/common/Input";
// Khởi tạo LoremIpsum
const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
const loremText = lorem.generateParagraphs(1);

function TopFrame() {
    return (
        <>
            <div className="top-frame d-flex justify-content-end align-items-center">
                <ul className="heart d-flex text-center">
                    <li className="p-2 mx-2"><i className="fa-solid fa-heart fs-1 text-danger"></i></li>
                    <li className="p-2 mx-2"><i className="fa-solid fa-heart fs-1 text-danger"></i></li>
                    <li className="p-2 mx-2"><i className="fa-solid fa-heart fs-1 text-danger"></i></li>
                </ul>
                <Button className={'menu mx-3 p-3 border border-1 rounded-1'} onClick={() => void {}} disabled={false}
                        type={'button'}>
                    <span><i className="fa-solid fa-bars fs-2"></i></span>
                </Button>
                <Button className={'setting mx-3 p-3 border border-1 rounded-1'} onClick={() => void {}}
                        disabled={false} type={'button'}>
                    <span><i className="fa-solid fa-gear fs-2"></i></span>
                </Button>
            </div>
        </>
    )
}

function MiddleFrame() {
    return (
        <>
            <div className="row">
                <div className="col-10 p-4">
                    <Question
                        className={'question border-warning-subtle fw-bold p-3 fs-5 mb-2 mx-5 border border-3 rounded-1'}
                        question={{
                            className: 'fs-6', text: `${loremText}`
                        }}/>
                    <div className="d-flex justify-content-center align-item-center">
                        <ImageAndSquare/>
                        <ImageAndSquare/>
                    </div>
                    <ChangeStateDialog />
                </div>
                <div className="col-3 p-2">
                    <div className="time-line"></div>
                </div>
            </div>
        </>
    )
}

function ImageAndSquare() {
    return (
        <>
            <div className="p-3 d-flex flex-column justify-content-center align-items-center">
                <Image className={'image__question border border-3 rounded-1 border-black object-fit-fill'}
                       src={'https://i.pinimg.com/236x/b7/3d/2c/b73d2c8c455074a76f4b8964a6bcf732.jpg'} alt={'test'}
                       dataId={'1'}/>
                <Input className={'square__input p-2 rounded-1 my-3 ps-2 border border-0 '} type={'text'} dataId={'1'}/>
            </div>
        </>
    )
}

export default function GamePage() {
    return (
        <>
            <div className="game-page rounded-1 container mt-4 p-3">
                <TopFrame/>
                <MiddleFrame/>

            </div>
        </>
    )
}
