const createList = new Promise(resolve => {
    const lists = [
        {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
        {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
    ];

    setTimeout(() => resolve(lists),3000);
});

createList.then((value) => {
    const fragment = document.createDocumentFragment();
    for(const list of value){
     const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        a.textContent = list.text;
        a.href = `/${list.to}`;
        img.src = list.img;
        img.alt = list.alt;

        fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin',img);
    }
    const ul = document.getElementById('js-list');
    ul.appendChild(fragment);
});
