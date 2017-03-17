/**
 * 将promises串联起来
 *
 * @param {Array} srcArray  来源数组
 * @param {Function} promiseFactory Promise工厂函数，依次传入srcArray的元素，工厂函数应返回一个promise
 * @returns {*}
 */
export function trainPromises(srcArray, promiseFactory) {
	const results = [];
	return new Promise((resolve, reject) => {
		srcArray.reduce((promise, src) => promise.then((result) => {
				results.push(result);
				return promiseFactory(src);
			}), Promise.resolve())
			.then(() => resolve(results))
			.catch(error => reject(error));
	});
}

export function groupArray(array, groupLength) {
	const groupedArray = [[]];

	let currentIndex = 0;

	array.forEach((row) => {
		if (groupedArray[currentIndex].length >= groupLength) {
			groupedArray.push([]);
			currentIndex++;
		}

		groupedArray[currentIndex].push(row);
	});

	return groupedArray;
}

const promiseFactories = gitAddrArr.map((addrInfo, index) => () => importArticle(addrInfo, index));

// 5个为一组
const groupedPromises = groupArray(promiseFactories, 2);

return trainPromises(groupedPromises, (promises) => Promise.all(promises.map(row => row())));

import { groupArray, trainPromises } from './app/utils';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function makePromise(number) {
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log(number);
			resolve();
		}, 3000);
	});
}

const promiseFactories = array.map(number => () => makePromise(number));

// 5个为一组
const groupedPromises = groupArray(promiseFactories, 2);

console.log('start');

trainPromises(groupedPromises, (promises) => Promise.all(promises.map(row => row())));