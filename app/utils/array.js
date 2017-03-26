/**
 * Randomize array element order in-place using
 * Durstenfeld (based on Fisher–Yates') algorithm.
 * http://stackoverflow.com/a/12646864/7627609
 *
 * @param      {Array}  array   Input array
 * @return     {Array}  { Shuffled array }
 */
export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
