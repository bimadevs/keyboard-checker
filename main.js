function getKey(e) {
    const code = e.keyCode || e.which;
    const location = e.location === KeyboardEvent.DOM_KEY_LOCATION_RIGHT ? '-R' : '';
    const selector = `[data-key="${code}${location}"], [data-char*="${encodeURIComponent(String.fromCharCode(code))}"]`;
    return document.querySelector(selector);
}

function pressKey(char) {
    const key = document.querySelector(`[data-char*="${char.toUpperCase()}"]`);
    if (!key) return console.warn('No key for', char);

    key.setAttribute('data-pressed', 'on');
    setTimeout(() => key.removeAttribute('data-pressed'), 200);
}

const h1 = document.querySelector('h1');
let queue = h1.innerHTML;
const originalQueue = queue;

function next() {
    const [c, ...rest] = queue;
    queue = rest.join('');
    h1.innerHTML = originalQueue.slice(0, originalQueue.length - queue.length);
    pressKey(c);
    if (queue.length) setTimeout(next, Math.random() * 200 + 50);
}

h1.innerHTML = "&nbsp;";
setTimeout(next, 500);

document.body.addEventListener('keydown', (e) => {
    const key = getKey(e);
    if (!key) return console.warn('No key for', e.keyCode);
    
    // Ganti warna tombol saat ditekan
    key.style.backgroundColor = 'lightblue'; // Ubah warna sesuai keinginan
    key.setAttribute('data-pressed', 'on');
});

// document.body.addEventListener('keyup', (e) => {
//     const key = getKey(e);
//     if (key) {
//         // Kembalikan warna tombol setelah dilepas
//         key.style.backgroundColor = ''; // Kembali ke warna default
//         key.removeAttribute('data-pressed');
//     }
// });

const keyboard = document.querySelector('.keyboard');

function size() {
    keyboard.style.fontSize = `${keyboard.parentNode.clientWidth / 90}px`;
    console.log(keyboard.style.fontSize);
}

window.addEventListener('resize', size);
size();
