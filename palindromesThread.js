var Worker = require('webworker-threads').Worker;
const fs = require("fs");

const nThreads = 4;
var palindromesOfThreads = new Array;
var palindromes = new Array;

var currentThread = 0;
var totalPalindromes = 0;

const start = Date.now();

var chunk = 0;
var section = 0;

let text = fs.readFileSync("book.txt", 'utf8');
const word = text.split(/[ \.,!\?:;\(\)0-9\[\]\{\}#]/);

chunk = word.length / nThreads;

const mountPalindromes = args => {
    for(let i = 0; i < nThreads; i++){
        args[i].forEach(element => {
            if(palindromes.indexOf(element) == -1)
                palindromes.push(element);

            totalPalindromes++;
        });
    }
}

const newThread = args => {
    const thread = new Worker('thread.js');

    thread.postMessage(args);

    thread.onmessage = event => {
        palindromesOfThreads.push(event.data);
        currentThread++;
        if(currentThread == nThreads) {
            mountPalindromes(palindromesOfThreads);
            const end = Date.now();
            console.log(`Threads: ${nThreads}\nTotal: ${totalPalindromes}\nPalindromes unique: ${palindromes.length}\nAt: ${end- start}ms`);
        }
    }
}

for(let i = 0; i < nThreads; i++) {
    newThread(word.slice(section, (section + chunk)));
    section += chunk;
}
