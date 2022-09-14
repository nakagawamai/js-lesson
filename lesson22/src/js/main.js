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
    return await response.json();
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

const tableColumnConfig = {
    id: {
      value: "ID",
      hasSort: true
    },
    name: {
      value: "名前",
      hasSort: false
    },
    gender: {
      value: "性別",
      hasSort: false
    },
    age: {
      value: "年齢",
      hasSort: true
    }
  };

const renderTableHeader = () => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    thead.className = "bg-slate-500";

    for (const [columnKey, columnValue] of Object.entries(tableColumnConfig)) {
        const th = createAttributedElements({
            tag:"th",
            valuesByAttributes:{
                class:"text-sm text-white px-6 py-4",
            },
            str:columnValue.value
        });

        tr.appendChild(th);

        if (columnValue.hasSort) {
            th.appendChild(createSortButtons(columnKey));
        }
    };

    table.appendChild(thead).appendChild(tr);
}

const renderTableBody = usersData => {
    const tbody = document.createElement("tbody");
    tbody.id = "js-usersTableBody";

    for(const user of usersData){
        const fragment = document.createDocumentFragment();
        const tr = document.createElement("tr");

        Object.keys(tableColumnConfig).forEach((column) => {
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
    {state:"asc",src:"../img/asc.svg", alt:"asc-image"},
    {state:"desc",src:"../img/desc.svg",alt:"desc-image"},
    {state:"both",src:"../img/both.svg",alt:"both-image"}
]

const createSortButtons = (columnKey) => {
    const sortButtonsBox = createAttributedElements ({
        tag:"div",
        valuesByAttributes:{
            id:`js-${columnKey}Buttons-Box`,
            class: "w-10 inline-block align-middle js-sortButtons-Box"
        }
    })

    const fragment = document.createDocumentFragment();

    for(const button of sortButtonAttributes){
        const sortButton = createAttributedElements({
            tag:"button",
            valuesByAttributes:{
                class: `js-sortButtons-Item`,
                'data-state':button.state
            }
        });

        button.state !== "both" && sortButton.classList.add("hidden");

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

const toggleHiddenClassForSortButton = (currentButton,nextButton) => {
    currentButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
}

const updateTableBody = usersData =>  {
    document.getElementById("js-usersTableBody").remove();
    renderTableBody(usersData);
};

const sortUsersData = (category, usersData, state) => {
    const cloneUsersData = [...usersData];

    switch (state) {
        case "asc":
            cloneUsersData.sort((a, b) => a[category] - b[category]);
            updateTableBody(cloneUsersData);
            break;
        case "desc":
            cloneUsersData.sort((a, b) => b[category] - a[category]);
            updateTableBody(cloneUsersData);
            break;
        default:
            updateTableBody(usersData);
    }
}

const changeState = (currentState) => {
    switch (currentState) {
      case "asc":
        return "desc";
      case "desc":
        return "both";
      default:
        return "asc";
    }
}

const addIsNotClickedForSortButtonsBox = (currentTarget) => {
    const sortButtons = document.querySelectorAll(".js-sortButtons-Box");
    for(const button of sortButtons){
        button.classList.add("is-not-clicked");
    }

    currentTarget.classList.remove("is-not-clicked");
}

const resetStatusForSortButton = () => {
    const sortButtons = document.querySelectorAll(".is-not-clicked > .js-sortButtons-Item");
    sortButtons.forEach((button) => {
        const state = button.getAttribute("data-state");
        (state !== "both") ? button.classList.add("hidden") : button.classList.remove("hidden");
    });
}

const filterSortCategories = () =>{
    const column = Object.entries(tableColumnConfig).map(([key,value])=>({key, value}));
    const sortCategories = column.filter((a) => a.value.hasSort );
    return sortCategories;
}

const sortTableBody = usersData => {
    const sortCategories = filterSortCategories();

    sortCategories.forEach((category) => {
        const sortButtonsBox = document.getElementById(`js-${category.key}Buttons-Box`);

        sortButtonsBox.addEventListener("click", (e) => {
            if(e.currentTarget === e.target) return;

            addIsNotClickedForSortButtonsBox(e.currentTarget);
            resetStatusForSortButton();
            
            const currentState = e.target.getAttribute("data-state");
            const nextState  = changeState(currentState);
            const nextButton = sortButtonsBox.querySelector(`[data-state=${nextState}]`);

            toggleHiddenClassForSortButton(e.target,nextButton);
            sortUsersData(category.key, usersData, nextState);
        });
    });
} 


initUsersData();
