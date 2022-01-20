export const groupBy = <K, V>(
    array: Array<V>,
    keyGetter: (input: V) => K
): Map<K, Array<V>> => {
    const map = new Map<K, Array<V>>()
    array.forEach((item) => {
        const key = keyGetter(item)
        const collection = map.get(key)
        if (!collection) {
            map.set(key, [item])
        } else {
            collection.push(item)
        }
    })

    return map
}
