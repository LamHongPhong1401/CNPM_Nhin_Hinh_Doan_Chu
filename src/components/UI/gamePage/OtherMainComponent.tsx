import React from "react";
import DialogShowResult from "../common/DialogShowResult";
import Button from "../common/Button";

export interface IQuestionFrame {
    className: string,
    question: {
        className: string,
        text: string
    }
}

export function Question(props: IQuestionFrame) {
    return (
        <>
            <div className={props.className}> Câu Hỏi:
                <p className={props.question.className}>{props.question.text}</p>
            </div>
        </>
    )
}

export function TimeLine(prop: string) {
    return (
        <>
            <div className={prop}/>
        </>
    )
}

export const ChangeStateDialog: React.FC = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const handlerShowDialog = () => {
        setShowDialog(true)
    }
    const handlerCloseDialog = () => {
        setShowDialog(false)
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <Button className={'check-answer  fw-bold btn btn-primary rounded-1'} type={'submit'}
                        onClick={handlerShowDialog} disabled={false}>
                    <span>Kiểm Tra</span>
                </Button>
            </div>
            <div className="container notification">
                <DialogShowResult className={''} title={'Thông báo'} body={'Đáp án chính xác'} show={showDialog}
                                  handleClose={handlerCloseDialog}/>
            </div>
        </>

    )
}