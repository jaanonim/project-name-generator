export function shuffle(array: Array<any>): Array<any> {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}

export function crop(input: Array<string>, len: number) {
    const arr = input.map((ele) => ele.replace("_", " "));
    if (arr.length > len) {
        return (
            arr.slice(0, len).join(", ") + ` and ${arr.length - len} more...`
        );
    } else {
        return arr.join(", ");
    }
}
