export default convertToMatrix = (obj, x, y) => {
    let matrix = [];

    for(let i = 0; i < x; i++){
        matrix[i] = [];
        for(let j = 0; j < y; j++){
            matrix[i][j] = obj[`${i}\${j}`];
        }
    }

    return matrix;
}