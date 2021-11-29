function randomPass(letters, numbers, either) {
    let chars = [
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // letters
        "0123456789", // numbers
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // either
    ];

    return [letters, numbers, either].map(function(len, i) {
        return Array(len).fill(chars[i]).map(function(x) {
        return x[Math.floor(Math.random() * x.length)];
        }).join('');
    }).concat().join('').split('').sort(function(){
        return 0.5-Math.random();
    }).join('')
}

export { randomPass }