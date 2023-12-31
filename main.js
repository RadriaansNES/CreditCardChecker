// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9] 
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3] 
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3] 
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3] 

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]

// Add your functions below:

function ValidateCred(parray) {
    let array = parray.slice();
    for (let i = array.length; i >= 1; i--) {
        if (i < array.length && array.length % 2 === 1) { //odd array number check
            if (i % 2 === 0) { //double every other digit 
                array[i - 1] = array[i - 1] * 2;
                if (array[i - 1] > 9) { //subtract 9 if above 9
                    array[i - 1] = array[i - 1] - 9;
                }
            }
        }
        else if (i < array.length && array.length % 2 === 0) { //even array number check
            if (i % 2 === 1) { //double every other digit 
                array[i - 1] = array[i - 1] * 2;
                if (array[i - 1] > 9) { //subtract 9 if above 9
                    array[i - 1] = array[i - 1] - 9;
                }
            }
        }
    }
    const sum = array.reduce((partialSum, a) => partialSum + a, 0); //sum across array
    if (sum % 10 === 0) {
        return true //valid
    }
    else { return false }
}

function findInvalidCards(NestedArray) { 
    let newray = [];
    for (let i = 0; i < NestedArray.length; i++) {
        if (ValidateCred(NestedArray[i]) === false){  //if invalid pass to a new array, return
            newray.push(NestedArray[i]);
        }
    }
    return newray;
}

console.log(findInvalidCards(batch));

function idInvalidCardCompanies(NestedArray) { //would be a nested array of invalid numbers, but for testing purposes this is how its outlined
    let newray = findInvalidCards(NestedArray); //if passing invalid array, you'd pass the invalid array and remove line 67
    let kray = [0,0,0,0,0]; //add array since they want the company check in array form (not blank since were using as counter)

    for (let i = 0; i < newray.length; i++) { //cycle through nested
        for (let j = 0; j < 1; j++) {
            if (newray[i][j] === 3) { //check first digit of invalid numbers
                kray[0] += 1;
            }
            else if (newray[i][j] === 4) {
                kray[1] += 1;
            }
            else if (newray[i][j] === 5) {
                kray[2] += 1;
            }
            else if (newray[i][j] === 6) {
                kray[3] += 1;
            }
            else {kray[4] += 1;}
        }
    }
    if (kray[0] > 0) { //print company name to array
        kray[0] = 'Amex';
    }
    if (kray[1] > 0) { 
        kray[1] = 'Visa';
    }
    if (kray[2] > 0) { 
        kray[2] = 'Mastercard';
    }
    if (kray[3] > 0) { 
        kray[3] = 'Discover';
    }
    if (kray[4] > 0) { 
        kray[4] = 'Unknown companies found';
    }
    return kray;
}

console.log(idInvalidCardCompanies(batch));