function createLoading(){
    const loadingImg = document.createElement('img');
    loadingImg.src = "loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    document.getElementById('js-loading').appendChild(loadingImg);
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
    document.getElementById('js-list').appendChild(fragment);
}

function getList(){
    createLoading();
    return new Promise((resolve,reject) => {
    const lists = [
        {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
        {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
    ];
    setTimeout(() => reject(Error('エラーです')),3000);
});
}

getList().then((value) =>{
    removeLoading();
    createList(value);
})
.catch((error) => {
    console.error(error);
});
