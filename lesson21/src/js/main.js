import '../css/style.css'
import * as loading from "./module/loading";
import { createAttributedElements} from "./utils/createAttributedElements";

const endPointURL = {
    usersData: "https://myjson.dit.upm.es/api/bins/i55y"
}

const renderErrorMessage = (error,element) => {
    const errorMessage = createAttributedElements({
        tag:"p",
        valuesByAttributes:{
            class:"error-message"
        },
        str:error
    });
    element.appendChild(errorMessage);
}

const fetchData = async (endpointURL,element) => {
    const response = await fetch(endpointURL);
    if(!response.ok){
        console.error(`${response.status}:${response.statusText}`);
        renderErrorMessage("Communication with the server is broken.",element);
        return;
    }
    const json = await response.json();
    return json;
}

const fetchContentsData = (endPointURL,element,ms) => new Promise(resolve => setTimeout(() => resolve(fetchData(endPointURL,element)),ms));

const table = document.getElementById("js-table");

const initUsersData = async () => {
    loading.showLoading(table);
    try{
        const json = await fetchContentsData(endPointURL.usersData,table,500);
        const usersData = json.data;

        if (!usersData.length) {
            renderErrorMessage("No user.",table);
            return;
        }
        renderTableElements(usersData);
        sortTableBody(usersData);
    }catch(error){
        console.error(error);
    }finally{
       loading.removeLoading(table);
    }
}

const renderTableElements = usersData => {
    renderTableHeader();
    renderTableBody(usersData);
}

const usersTableColumn = {
    "id"     : "ID",
    "name"   : "名前",
    "gender" : "性別",
    "age"    : "年齢"
}

const renderTableHeader = () => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    thead.className = "bg-slate-500";

    for (const [userKey, userValue] of Object.entries(usersTableColumn)) {
        const th = createAttributedElements({
            tag:"th",
            valuesByAttributes:{
                class:"text-sm text-white px-6 py-4",
            },
            str:userValue
        });

        tr.appendChild(th);

        addSortButtons(userKey,userValue,th);
    };

    table.appendChild(thead).appendChild(tr);
}

const renderTableBody = usersData => {
    const tbody = document.createElement("tbody");
    tbody.id = "js-usersTableBody";

    for(const user of usersData){
        const fragment = document.createDocumentFragment();
        const tr = document.createElement("tr");

        Object.keys(usersTableColumn).forEach((column) => {
            const td = createAttributedElements({
                tag:"td",
                valuesByAttributes:{
                    class:"border border-gray-300 px-4 py-2"
                },
                str:user[column]
            })
            fragment.appendChild(tr).appendChild(td);
        });

        table.appendChild(tbody).appendChild(fragment);
    }
}

const sortButtonAttributes = [
    {dataOrder:"asc",src:"../img/asc.svg", alt:"asc-image"},
    {dataOrder:"desc",src:"../img/desc.svg",alt:"desc-image"},
    {dataOrder:"both",src:"../img/both.svg",alt:"both-image"}
]

const sortByUsersTableColumn = {
    "id" : "ID"
}

const addSortButtons = (userKey,userValue,th) => {
    for(const value of Object.values(sortByUsersTableColumn)){
        userValue === value && th.appendChild(createSortButtons(userKey));
    }
}

const createSortButtons = (columnKey) => {
    const sortButtonsBox = createAttributedElements ({
        tag:"div",
        valuesByAttributes:{
            id:`js-${columnKey}Buttons-Box`,
            class: "w-10 inline-block align-middle"
        }
    })

    const fragment = document.createDocumentFragment();

    for(const button of sortButtonAttributes){
        const sortButton = createAttributedElements({
            tag:"button",
            valuesByAttributes:{
                class: `js-${columnKey}SortButton`,
                'data-order':button.dataOrder
            }
        });

        button.dataOrder !== "both" && sortButton.classList.add("hidden");

        const sortButtonImage = createAttributedElements({
            tag:"img",
            valuesByAttributes:{
                class:"pointer-events-none",
                src:button.src,
                alt:button.alt
            }
        })

        fragment.appendChild(sortButton).appendChild(sortButtonImage);
    }

    sortButtonsBox.appendChild(fragment);
    return sortButtonsBox;
}

const toggleHiddenClassSortButton = (sortButtons,index) => {
    sortButtons[index].classList.add("hidden");
    (index === sortButtons.length -1) ? index = 0 : index++;
    sortButtons[index].classList.remove("hidden");
}

const upDateTableBody = usersData =>  {
    document.getElementById("js-usersTableBody").remove();
    renderTableBody(usersData);
};

const sortUsersData = (key, usersData, dataOrder) => {
    const cloneUsersData = [...usersData];

    const sortButtonsFunc = {
        "both": () => {
            cloneUsersData.sort((a,b) => a[key] - b[key]);
            upDateTableBody(cloneUsersData);
        },
        "asc" : () => {
            cloneUsersData.sort((a,b) => b[key] - a[key]);
            upDateTableBody(cloneUsersData);
        },
        "desc": () => {
            upDateTableBody(usersData);
        }
    }

    Object.keys(sortButtonsFunc).forEach((button) => dataOrder === button && sortButtonsFunc[button]() );
}

const sortTableBody = usersData => {
    for(const key of Object.keys(sortByUsersTableColumn)){
        const sortButtons = [...document.getElementsByClassName(`js-${key}SortButton`)];
        const sortButtonsBox = document.getElementById(`js-${key}Buttons-Box`);
        
        let dataOrder;
        sortButtonsBox.addEventListener("click", (e) => {
            const index = sortButtons.indexOf(e.target);
            dataOrder = e.target.getAttribute("data-order");

            if(e.currentTarget === e.target){
                return;
            }

            toggleHiddenClassSortButton(sortButtons,index);
            sortUsersData(key, usersData, dataOrder);
        });
    }
} 

initUsersData();
