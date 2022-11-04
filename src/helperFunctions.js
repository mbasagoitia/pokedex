export function setChoicesList(list, prop) {
    let listOfAllPropValues = [];
    for (let obj of list) {
        listOfAllPropValues.push(...obj[prop]);
    }
    //returns a unique, alphabetized list
    return [...new Set(listOfAllPropValues.sort())];
}

export function filterListByProps (list, prop1, prop2, value1, value2) {
    return list.filter((item) => item[prop1].includes(value1) && item[prop2].includes(value2));
    }

