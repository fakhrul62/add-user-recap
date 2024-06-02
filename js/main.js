let storeAllData = [];
let showAll = false;
const startEngine = async () => {
    const res = await fetch(`https://randomuser.me/api/`);
    const resData = await res.json();
    const data = resData.results[0];
    storeAllData.push(data);
    getData();
};
const getData = (filteredData = storeAllData) => {
    let tempContainer;
    const allCardDiv = document.getElementById("card-box");
    allCardDiv.innerHTML = "";
    // showing 4
    if (showAll) {
        tempContainer = filteredData;
    } else {
        tempContainer = filteredData.slice(0, 4);
    }
    //==========================
    //creating and appending users to the card
    tempContainer.forEach((element) => {
        const singleCard = document.createElement("div");
        singleCard.classList = `card bg-white p-5 border-2 border-zinc-700 rounded-md shadow-[4px_4px_#3f454f] hover:shadow-[0px_0px_#3f454f] transition-all  text-center`;
        singleCard.innerHTML = `
        <img src="${element.picture.large}" class="rounded-md mx-auto">
        <h1 class="font-bold text-zinc-700 text-lg mt-5">${
          element.name.first
        } ${element.name.last}</h1>
        <h2>${capitalize(element.gender)}</h2>
        <h2>${element.dob.age}</h2>
        <h2>DoB: ${new Date(element.dob.date).toLocaleDateString()}</h2>
        <h2>${element.location.state} ${element.location.country}</h2>
        <h2>Timezone: ${element.location.timezone.description}</h2>`;
        allCardDiv.appendChild(singleCard);
        //===============================================================
    });
    // making show more button work
    const showMoreBtn = document.getElementById("show-more");
    if (storeAllData.length > 4 && !showAll) {
        showMoreBtn.removeAttribute("hidden");
    } else {
        showMoreBtn.setAttribute("hidden", true);
    }
    //================================
};

//show more function
const showMore = () => {
    showAll = true;
    getData();
};
//=========================

//making sort work
const sortBtn = () => {
    storeAllData.sort((a, b) => new Date(b.dob.date) - new Date(a.dob.date));
    getData();
};
//====================


//making search work
const searchInput = () => {
    const searchInputString = document.getElementById("search-input").value.toLowerCase();
    const searchInputValue = document.getElementById("search-input").value;
    document.getElementById("search-input").value = '';
    const searchInputGender = searchInputString.toString().slice(0, 2);

    const filteredData = storeAllData.filter(user =>
        user.name.first.toLowerCase().includes(searchInputString) || 
        user.name.last.toLowerCase().includes(searchInputString) || 
        user.gender.slice(0, 2).includes(searchInputGender) || 
        user.dob.age.toString().includes(searchInputValue) ||
        user.location.state.toLowerCase().includes(searchInputString) ||
        user.location.country.toLowerCase().includes(searchInputString) ||
        user.location.timezone.description.toLowerCase().includes(searchInputString)
    );
    getData(filteredData);
};

// capitalizing function
function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}
//=====================