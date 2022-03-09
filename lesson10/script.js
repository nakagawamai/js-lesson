function showLoadingImg(){
    const loadingImg = document.createElement('img');
    loadingImg.src = "loading-circle.gif";
    loadingImg.alt = "ローディング画像";
    document.getElementById('js-loading').appendChild(loadingImg);
}

function removeLoadingImg(){
    document.getElementById('js-loading').remove();
}

function getData(){
    return new Promise(resolve => {
        const categriesData = [
            {to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
            {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}
        ];
        setTimeout(() => {
                resolve(categriesData);
        },3000);
    });
}

async function getDataProcess(){
    showLoadingImg();
    try{
        return await getData();
    }catch(e){
        console.error(e.message);
    }finally{
        removeLoadingImg();
    }
}

async function  showCategoriesList(){
    const result = await getDataProcess();
    const fragment = document.createDocumentFragment();
    for(const list of result){
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

showCategoriesList();
