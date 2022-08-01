import '../css/style.css'
import * as loading from "./module/loading";
import { createAttributedElements} from "./utils/createAttributedElements";

const endPointURL = {
    usersData: "https://myjson.dit.upm.es/api/bins/i55y"
}

const createErrorMessage = (error,element) => {
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
        createErrorMessage("Communication with the server is broken.",element);
        return;
    }
    const json = await response.json();
    return json.data;
}

const fetchContentsData = (endPointURL,element,ms) => new Promise(resolve => setTimeout(() => resolve(fetchData(endPointURL,element)),ms));

const table = document.getElementById("js-table");

const initUsersData = async () => {
    loading.showLoading(table);
    try{
        const usersData = await fetchContentsData(endPointURL.usersData,table,3000);
        if (!usersData.length) {
            createErrorMessage("No user.",table);
            return;
        }
        sortUsersDataByIdAsc(usersData);
        renderTableContents(usersData);
    }catch(error){
        console.error(error);
    }finally{
       loading.removeLoading(table);
    }
}

const sortUsersDataByIdAsc = (usersData) =>  usersData.sort((a,b) => a.id - b.id); 

const renderTableContents = (usersData) => {
    renderTableHedaer();
    renderTabelBody(usersData);
}
const UsersTableColumn = {
    "id"     : "ID",
    "name"   : "名前",
    "gender" : "性別",
    "age"    : "年齢",
}

const renderTableHedaer = () => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    thead.className = "bg-slate-500";

    Object.values(UsersTableColumn).forEach((column) => {
        const th = createAttributedElements({
            tag:"th",
            valuesByAttributes:{
                class:"text-sm text-white px-6 py-4",
            },
            str:column
        })
        tr.appendChild(th);
    });

    table.appendChild(thead).appendChild(tr);
}

const renderTabelBody = (usersData) => {
    const tbody = document.createElement("tbody");

    for(const user of usersData){
        const fragment = document.createDocumentFragment();
        const tr = document.createElement("tr");

        Object.keys(UsersTableColumn).forEach((column) => {
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

initUsersData();
