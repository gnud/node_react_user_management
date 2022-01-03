export function filterByCols(item, columns) {
    return columns.includes(item[0]);
}

export function skipId(item) {
    return item[0] !== 'id';
}

export function randomString() {
    return btoa(Math.random().toString()).substr(10, 20)
}
