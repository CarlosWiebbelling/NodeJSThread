const fs = require("fs");

const palindromos = new Array;
var totalPalindromos = 0;

const start = Date.now();                  

const text = fs.readFileSync("book.txt", 'utf8');
let word = text.split(/[ \.,!\?:;\(\)0-9\[\]\{\}#]/);

const palindrome = word => {
    for(let i = 0; i < word.length; i++){
        if(word[i] != word[(word.length - 1) - i])
            return 0;
    }
    return 1;
}

word.forEach(element => {
    element = element.toLowerCase();
    if(element.length > 1 && element[0] != element[1])
        if(palindrome(element)) {
            totalPalindromos++;
            if(palindromos.indexOf(element) == -1) 
                palindromos.push(element);
        }
});

const end = Date.now();

console.log(`Total: ${totalPalindromos}\nPalindromes uniques: ${palindromos.length}\nAt: ${end- start}ms`);
