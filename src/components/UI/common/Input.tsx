interface InputProps{
    className: string,
    type: string,
    dataId?: string | number,
    placeholder?: string,
    value?: string
}
export default function Input(props: InputProps) {
    return <input className={props.className} type={props.type} placeholder={props.placeholder} value={props.value} data-id = {props.dataId}/>;
}