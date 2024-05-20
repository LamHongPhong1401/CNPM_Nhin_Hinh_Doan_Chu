interface ImageProps{
    className: string,
    src: string,
    alt: string,
    dataId?: string | number
}

export default function (props: ImageProps){
    return (
        <img className={props.className} src={props.src} alt={props.alt} data-id={props.dataId}/>
    )
}