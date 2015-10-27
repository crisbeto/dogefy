Array.prototype.getRandomItem = function(){
    return this[this.getRandomIndex()];
};

Array.prototype.getRandomIndex = function(){
    return Math.floor(Math.random()*this.length);
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
    var blankSpaceBeforeRegex = new RegExp(blankChar + '*');
    var blankSpaceAfterRegex = new RegExp(blankChar + '*$');
    var padding = 1;
    var pool = ['wow'];
    var prefixes = ['such', 'much', 'very', 'many'];

    (function(){
        var i = Math.min(cleaned.length, Math.round(wow.length/3));

        while(i-- && cleaned.length){
            var currentIndex = cleaned.getRandomIndex();
            pool.push((Math.random() < 0.7 ? (prefixes.getRandomItem() + ' ') : '') + cleaned[currentIndex]);
            cleaned.splice(currentIndex, 1);
        }
    })();

    pool = pool.sort(function(a, b){
        return b.length - a.length;
    });

    var extra = new Array(pool[0].length + padding).join(blankChar);

    wow.forEach(function(item, index){
        wow[index] = extra + item + extra;
    });

    pool.forEach(function(item){
        var dogeIndex = wow.getRandomIndex();
        var isInfront = Math.random() > 0.5;
        var value = wow[dogeIndex];
        var availableBefore = value.match(blankSpaceBeforeRegex)[0].length - padding;
        var availableAfter = value.match(blankSpaceAfterRegex);

        if(isInfront && availableBefore >= item.length){
            value = item + value.substring(item.length, value.length);
        }else if(availableAfter && availableAfter[0].length - padding >= item.length){
            value = value.substring(0, value.length - item.length) + blankChar + item;
        }

        wow[dogeIndex] = value;
    });

    return wow.join('\n');
};

