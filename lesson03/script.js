const ul = document.getElementById('js-list');
const imgSrc = ['./img/bookmark.png','./img/message.png'];

const fragment = document.createDocumentFragment();

for (let i= 0; i < imgSrc.length; i++){
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `a${i+1}.html`;
    a.textContent = `a${i+1}`;

    const img = document.createElement('img');
    img.src = imgSrc[i];

    fragment.appendChild(li).appendChild(a).insertBefore(img,a.firstChild);
}

ul.appendChild(fragment);
