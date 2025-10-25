// 代码生成时间: 2025-10-26 00:34:16
class SortAlgorithmService {
  
  /**
   * Bubble Sort algorithm.
   *
   * @param {Array} array - The array to be sorted.
   * @returns {Array} - The sorted array.
   */
  bubbleSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }
    let len = array.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }
      }
    }
    return array;
  }

  /**
   * Quick Sort algorithm.
   *
   * @param {Array} array - The array to be sorted.
   * @returns {Array} - The sorted array.
   */
  quickSort(array) {
    if (array.length <= 1) {
      return array;
    }
    let pivotIndex = Math.floor(array.length / 2);
    let pivot = array.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    return this.quickSort(left).concat([pivot], this.quickSort(right));
  }

  /**
   * Merge Sort algorithm.
   *
   * @param {Array} array - The array to be sorted.
   * @returns {Array} - The sorted array.
   */
  mergeSort(array) {
    if (array.length <= 1) {
      return array;
    }
    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return this.merge(this.mergeSort(left), this.mergeSort(right));
  }

  /**
   * Helper function to merge two sorted arrays.
   *
   * @param {Array} left - The left part of the array.
   * @param {Array} right - The right part of the array.
   * @returns {Array} - The merged sorted array.
   */
  merge(left, right) {
    let result = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }
    return result.concat(left.slice(), right.slice());
  }

  /**
   * Insertion Sort algorithm.
   *
   * @param {Array} array - The array to be sorted.
   * @returns {Array} - The sorted array.
   */
  insertionSort(array) {
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }
    for (let i = 1; i < array.length; i++) {
      let current = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > current) {
        array[j + 1] = array[j];
        j--;
      }
      array[j + 1] = current;
    }
    return array;
  }

}

// Example of using the service
const sortService = new SortAlgorithmService();

try {
  let arrayToSort = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  let sortedArray = sortService.bubbleSort(arrayToSort);
  console.log('Sorted Array:', sortedArray);
} catch (error) {
  console.error(error.message);
}