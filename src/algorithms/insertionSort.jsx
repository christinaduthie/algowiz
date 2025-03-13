/**
 * insertionSortAnimations
 * @param {number[]} arr
 * @returns {Array<{array: number[], highlighted: number | null}>}
 *
 * Returns a series of states (animations) for each key step in insertion sort.
 * Each step is an object with:
 *    {
 *       array: [...currentArrayState],
 *       highlighted: indexBeingActedOn
 *    }
 */
function insertionSortAnimations(arr) {
    const animations = [];
  
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
  
      // Record a step: highlight the current i
      animations.push({
        array: [...arr],
        highlighted: i
      });
  
      // Move elements greater than key to one position ahead
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
        animations.push({
          array: [...arr],
          highlighted: j + 1
        });
      }
      arr[j + 1] = key;
  
      // After placing key in correct spot
      animations.push({
        array: [...arr],
        highlighted: j + 1
      });
    }
  
    // Final "done" step: no highlight
    animations.push({
      array: [...arr],
      highlighted: null
    });
  
    return animations;
  }
  
  export default insertionSortAnimations;
  