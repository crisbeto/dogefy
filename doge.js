var getRandomIndex = function(arr){
    return Math.floor(Math.random()*arr.length);
};

var popRandomItem = function(arr){
    return arr.length ? arr.splice(getRandomIndex(arr), 1)[0] : null;
};

module.exports = function(text){
    if(!text) return;

    var wow = [
    '           ▄              ▄',
    '          ▌▒█           ▄▀▒▌',
    '          ▌▒▒█        ▄▀▒▒▒▐',
    '         ▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐',
    '       ▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐',
    '     ▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌',
    '    ▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌',
    '    ▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐',
    '   ▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌',
    '   ▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌',
    '  ▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐',
    '  ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌',
    '  ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐',
    '   ▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌',
    '   ▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐',
    '    ▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌',
    '      ▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀',
    '        ▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀',
    '           ▒▒▒▒▒▒▒▒▒▒▀▀'
    ];
    var blankChar = ' ';
    var cleaned = text.replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' ').split(' ');
    var pool = [];
    var prefixes = ['such', 'much', 'very', 'many'];
    var maxWords = Math.min(Math.round(wow.length/3), cleaned.length);
    var availableRows = wow.map(function(item, index){ return index; });

    while(cleaned.length && pool.length < maxWords){
        pool.push(
            (Math.random() < 0.7 ? prefixes[getRandomIndex(prefixes)] + ' ' : '') +
            popRandomItem(cleaned)
        );
    }

    pool.push('wow');
    pool = pool.sort(function(a, b){ return b.length - a.length; });
    var extra = new Array(pool[0].length + 1).join(blankChar);

    wow.forEach(function(item, index){
        wow[index] = extra + item + extra;
    });

    (function addToRow(){
        var wowRow = popRandomItem(availableRows);
        var word = popRandomItem(pool);
        var wowRowText = wow[wowRow];

        if(Math.random() > 0.5){
            wowRowText = word + wowRowText.substring(word.length, wowRowText.length);
        }else{
            wowRowText = wowRowText.substring(0, wowRowText.length - word.length) + blankChar + word;
        }

        wow[wowRow] = wowRowText;

        if(pool.length){
            addToRow();
        }
    })();

    return wow.join('\n');
};
