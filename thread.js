onmessage = args => {
    var palindromes = new Array;

    const palindrome = word => {
        if(word.length <= 2 || word[0] == word[1])
            return 0;

        for(let i = 0; i < word.length; i++)
            if(word[i] != word[(word.length - 1) - i])
                return 0;
        
        return 1;
    }
    
    var i = 0;

    while(args.data[i] != null && i < args.data.length) {
        let wordLower = String(args.data[i]).toLowerCase();
        if (palindrome(wordLower))
            palindromes.push(wordLower);
            
        i++;
    }

    postMessage(palindromes);
}

