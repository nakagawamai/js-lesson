function createLoading(){
    const loading = document.getElementById('js-loading');
    const loadingImg = document.createElement('img');
    loadingImg.src = "loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    loading.appendChild(loadingImg);
}

function removeLoading(){
    document.getElementById('js-loading').remove();
}

function createList(value){
    const fragment = document.createDocumentFragment();
    for(const list of value){
        const li = document.createElement('li');
        const a = document.createElement('a');
        const img = document.createElement('img');
        a.textContent = list.text;
        a.href = `/${list.to}`;
        img.src = list.img;
        img.alt = list.alt;
        fragment.appendChild(li).appendChild(a).appendChild(img);
    }
    const ul = document.getElementById('js-list');
    ul.appendChild(fragment);
}

function getList(){
    return new Promise(resolve => {  
    createLoading();
    const lists = [
        {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
        {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
    ];
    setTimeout(() => resolve(lists),3000);
});
}

getList().then((value) => {
    removeLoading();
    createList(value);
});
