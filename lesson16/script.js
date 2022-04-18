const showLoading = () => {
    const loadingArea     = document.createElement('div');
    const loadingImg      = document.createElement('img');
    loadingArea.id        = "js-loading";
    loadingArea.className = "loading-area";
    loadingImg.src        = "img/loading-circle.gif";
    loadingImg.alt        = "ローディング画像";

    document.body.insertAdjacentElement('afterbegin',loadingArea).appendChild(loadingImg);
}

const removeLoading = () => document.getElementById('js-loading').remove();

const createErrorMessage = (error) => {
    const errMsg       = document.createElement('li');
    errMsg.className   = "error-msg";
    errMsg.textContent = error;
    document.getElementById('js-topics-list').appendChild(errMsg);
    return errMsg;
}

const fetchData = async () => {
    const requestURL = "https://api.json-generator.com/templates/kuSXIyw7OJla/data?access_token=hu4bc7qh9znx2m8f53mn4mz2hryvdntkavwbw8j0";
    try{
        const response   = await fetch(requestURL);
        if(!response.ok){
            console.error(`${response.status}:${response.statusText}`);
            createErrorMessage('現在、サーバーの通信が壊れています');
        }
        const json = await response.json();
        return json;
    }catch(error){
        console.error(error);
    }
}

const init = async () => {
    showLoading();
    try{
        const newsData = await fetchData();
        if(!newsData){
            return;
        }
        showContentsArea();
        renderTopics(newsData);
        renderArticlesSection(newsData);
        renderImages(newsData);

        activateFirstTopic(newsData);
        switchTabTopics();
    }catch(error){
        console.error(error);
    }finally{
        removeLoading();
    }
}

const showContentsArea = () =>{
    const contentsArea      = document.createElement('section');
    contentsArea.id         = "js-contents-area";
    contentsArea.className  = "contents-area";

    document.getElementById('js-topics-list')
    .insertAdjacentElement('afterend',contentsArea);
}

const renderTopics = (newsDate) => {
    const topicsArea     = document.getElementById('js-topics-list');
    const fragmentTopics = document.createDocumentFragment();
    for (const topics of newsDate){
        const category     = document.createElement('li');
        const categroyLink = document.createElement('a');
        category.classList.add('topics-list__item');
        categroyLink.textContent = topics.categories;
        fragmentTopics.appendChild(category).appendChild(categroyLink);
    }
    topicsArea.appendChild(fragmentTopics);
}

const renderImages = (newsDate) => {
    const contentsArea  = document.getElementById('js-contents-area');
    const imageArea     = document.createElement('div');
    imageArea.className = "contents-item topics-img";

    const fragmentTopicImg = document.createDocumentFragment();
    for (const topics of newsDate){
        const topicsImg = document.createElement('img');
        topicsImg.id    = `${topics.categories + '-img' }`;
        topicsImg.src   = topics.picture;
        topicsImg.classList.add('topics-img__item');
        fragmentTopicImg.appendChild(topicsImg);
    }
    contentsArea.appendChild(imageArea).appendChild(fragmentTopicImg);
}

const showSpecificPeriodNewIconToArticles = (articleDate,articleLink) => {
    const newIcon       = document.createElement('span');
    newIcon.className   = "new-icon";
    newIcon.textContent = "New";

    const SpecificPeriod = 3;
    const dateDifferencial  = dateFns.differenceInDays(new Date(), new Date(articleDate));
    
    if(SpecificPeriod > dateDifferencial){
        articleLink.appendChild(newIcon);
    }
    return dateDifferencial;
}

const showCommentIconWithNumber = (commentLength,articleLink) => {
    const commentIcon     = document.createElement('img');
    commentIcon.src       = "img/comment-dots-solid.svg";
    commentIcon.className = "comment-icon";

    const commentNumber       = document.createElement('span');
    commentNumber.textContent = commentLength;
    commentNumber.className   = "comment-number";

    if(commentLength > 0 ){
        articleLink.appendChild(commentIcon);
        articleLink.appendChild(commentNumber);
    }
    return commentNumber;
}

const renderArticlesSection = (newsDate) => {
    const contentsArea    = document.getElementById('js-contents-area');
    const articleArea     = document.createElement('div');
    articleArea.className = "contents-item articles";

    const fragmentAritcle = document.createDocumentFragment(); 
    for (const topics of newsDate){
        const articleList = document.createElement('ul');
        articleList.id    = `${topics.categories + "-articles"}`;
        articleList.classList.add('article-list');
        
        fragmentAritcle.appendChild(articleList).appendChild(renderArticlesItem(topics));
    };
    contentsArea.appendChild(articleArea).appendChild(fragmentAritcle);    
}

const renderArticlesItem = ({articles}) => {
    const articleTitleFlagment = document.createDocumentFragment(); 
    for(const article of articles ){
        const articleItem   = document.createElement('li');
        const articleLink   = document.createElement('a'); 
        articleItem.classList.add('article-list__item');
        articleLink.textContent  = article.title;

        const articleDate   = article.date;
        const commentLength = article.comment.length; 
        showSpecificPeriodNewIconToArticles(articleDate,articleLink);
        showCommentIconWithNumber(commentLength,articleLink);

        articleTitleFlagment.appendChild(articleItem).appendChild(articleLink);
    };
    return articleTitleFlagment;
}

const activateFirstTopic = (newsData) => {
  const tabTopics   = document.getElementsByClassName("topics-list__item");
  const topicsImg   = document.getElementsByClassName("topics-img__item");
  const articleList = document.getElementsByClassName("article-list");

  const index = newsData.findIndex((value) => value.isActive === true);
  if (index) {
    tabTopics[index].classList.add("is-active");
    topicsImg[index].classList.add("is-active");
    articleList[index].classList.add("is-active");
  }
}

const switchTabTopics = () => {
    const tabTopics   = document.getElementsByClassName('topics-list__item');
    const topicsImg   = document.getElementsByClassName('topics-img__item');
    const articleList = document.getElementsByClassName('article-list');

    for (const topic of tabTopics ){
        topic.addEventListener('click',function (){
        const tabTopicsIsActive = document.getElementsByClassName('topics-list__item is-active');
        const topicsImgIsActive = document.getElementsByClassName('topics-img__item is-active');
        const articleIsActive   = document.getElementsByClassName('article-list is-active');

        const arrayTabs = Array.from(tabTopics);
        const index = arrayTabs.indexOf(this);

        tabTopicsIsActive[0].classList.remove('is-active');
        this.classList.add('is-active');

        topicsImgIsActive[0].classList.remove('is-active');
        topicsImg[index].classList.add('is-active');

        articleIsActive[0].classList.remove('is-active');
        articleList[index].classList.add('is-active');
        });
    }
}

init();
