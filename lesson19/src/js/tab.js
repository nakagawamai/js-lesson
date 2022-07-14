import { differenceInDays } from "date-fns";
import { createAttributedElements } from "./utils/createAttributedElements";

const topicsList = document.getElementById("js-topics-list");

const showContentsArea = () => {
    const contentsArea = createAttributedElements({
        tag:"section",
        valuesByAttributes:{id:"js-contents-area",class:"contents-area"}
    });

    const contentsBox = createAttributedElements({
        tag:"div",
        valuesByAttributes:{id:"js-contents-box",class:"contents-box"}
    });
    
    topicsList.insertAdjacentElement("afterend",contentsArea).appendChild(contentsBox);
}

const renderTopics = (newsData) => {
    const fragmentTopics = document.createDocumentFragment();
    for (const topics of newsData){
        const category = createAttributedElements({
            tag:"li",
            valuesByAttributes:{class:"js-topics-list__item topics-list__item"},
            str:topics.category
        });
        fragmentTopics.appendChild(category);
    }
    topicsList.appendChild(fragmentTopics);
}

const renderImages = (newsData) => {
    const contentsBox = document.getElementById("js-contents-box");
    const imageArea = createAttributedElements({
        tag:"div",
        valuesByAttributes:{class:"contents-item topics-img"}
    });

    const fragmentTopicImg = document.createDocumentFragment();
    for (const topics of newsData){
        const topicsImg = createAttributedElements({
            tag:"img",
            valuesByAttributes:{class:"js-topics-img__item topics-img__item", src:topics.picture
        }});
        fragmentTopicImg.appendChild(topicsImg);
    }

    contentsBox.appendChild(imageArea).appendChild(fragmentTopicImg);
}

const renderArticlesSection = (newsData) => {
    const contentsBox = document.getElementById("js-contents-box");
    const articleArea = createAttributedElements({
        tag:"div",
        valuesByAttributes:{class:"contents-item articles"}
    });

    const fragmentArticle = document.createDocumentFragment(); 
    for (const topics of newsData){
        const articleList = createAttributedElements({
            tag:"ul",
            valuesByAttributes:{class:"js-article-list article-list"}
        });
        fragmentArticle.appendChild(articleList)
        .appendChild(createArticleTitleFragment(topics));
    }

    contentsBox.appendChild(articleArea).appendChild(fragmentArticle); 
}

const createArticleTitleFragment = ({articles}) => {
    const articleTitleFragment = document.createDocumentFragment(); 

    for(const article of articles ){
        const articleItem = createAttributedElements({
            tag:"li",
            valuesByAttributes:{class:"js-article-list__item article-list__item"}
        });

        const articleLink = createAttributedElements({
            tag:"a",
            valuesByAttributes:{class:"js-article-link"},
        });
        
        const articleTitle = createAttributedElements({
            tag:"p",
            valuesByAttributes:{class:"article-title"},
            str:article.title
        });

        articleTitleFragment.appendChild(articleItem).appendChild(articleLink).appendChild(articleTitle);

        isNewArticle(article.date) && showNewIcon(articleItem);
        (article.comment.length) && showCommentIconWithNumber(articleItem, article.comment.length);
    }

    return articleTitleFragment;
}

const isNewArticle = (articleDate) => {
    const SpecificPeriod = 3;
    const dateDifferencial = differenceInDays(new Date(), new Date(articleDate));

    return (SpecificPeriod > dateDifferencial);
}

const showNewIcon = (articleLink) => {
    const newIcon = createAttributedElements({
        tag:"span",
        valuesByAttributes:{class:"new-icon"},
        str:"New"
    });

    articleLink.appendChild(newIcon);
}

const showCommentIconWithNumber = (articleLink,commentLength) => {
    const commentIcon = createAttributedElements({
        tag:"img",
        valuesByAttributes:{class:"comment-icon", src:"img/comment.svg"}
    });

    const commentNumber = createAttributedElements({
        tag:"span",
        valuesByAttributes:{class:"comment-number"},
        str:commentLength
    });

    articleLink.appendChild(commentIcon);
    articleLink.appendChild(commentNumber);
}

const tabItems = [ "js-topics-list__item", "js-topics-img__item", "js-article-list" ];

const activateFirstTab = (newsData) => {
    const index = newsData.findIndex((value) => value.isActive );
    if (index) {
        tabItems.forEach(function(item) {
            document.getElementsByClassName(item)[index].classList.add("is-active");
        });
    }
}

const changeActiveTab = () => {
    topicsList.addEventListener("click",function (e){
        if(e.currentTarget === e.target){
            return;
        }

        const arrayTopics = [...document.getElementsByClassName("js-topics-list__item")];
        const index = arrayTopics.indexOf(e.target);

        tabItems.forEach(function(item){
            document.querySelector(`.${item}.is-active`).classList.remove("is-active");
            document.getElementsByClassName(item)[index].classList.add("is-active");
        });
    });
}

const renderTabContents = (newsData) => {
    showContentsArea();
    renderTopics(newsData);
    renderArticlesSection(newsData);
    renderImages(newsData);
}

const changeTabContents = (newsData) => {
    activateFirstTab(newsData)
    changeActiveTab();
}

export { topicsList,renderTabContents, changeTabContents };
