export interface IQuestionFrame {
    className: string,
    question: {
        className: string,
        text: string
    }
}
export  function Question(props: IQuestionFrame) {
    return (
        <>
            <div className={props.className}> Câu Hỏi:
                <p className={props.question.className}>{props.question.text}</p>
            </div>
        </>
    )
}
export function TimeLine(prop: string){
    return (
        <>
            <div className={prop}/>
        </>
    )
}