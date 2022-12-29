import { excludedDropDownValues } from "../data/excludedDropDownValues";

export const filterItems = (mainArray) => {
    let res;
    res = mainArray.filter(item => !excludedDropDownValues.includes(item));
    return res
}