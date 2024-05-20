interface Person {
    name: string,
    imageId: string
}

function Avatar(obj: { person: Person, size: number }) {
    return (
        <img
            className="avatar"
            src={getImageUrl(obj.person.imageId)}
            alt={obj.person.name}
            width={obj.size}
            height={obj.size}
        />
    )
}

function getImageUrl(imageId: number | string, size: (string | number) = 's') {
    return (
        `https://i.imgur.com/${imageId}${size}.jpg`
    );
}

export function Profile() {
    return (
        <>
            <Avatar
                size={100}
                person={{
                    name: 'Katsuko Saruhashi',
                    imageId: 'YfeOqp2'
                }}
            />
        </>
    )
}