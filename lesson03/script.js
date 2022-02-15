const ul = document.getElementById('js-list');
const aHref = ['a1.html','a2.html'];
const aText = ['a1','a2'];
const imgSrc = ['./img/bookmark.png','./img/message.png'];

for (let i= 0; i < aHref.length; i++){
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = aHref[i];
    a.textContent = aText[i];

    const img = document.createElement('img');
    img.src = imgSrc[i];

    ul.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin',img);
}
