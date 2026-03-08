
let allIssues = [];


const treesContainer = document.getElementById("treesContainer")
const tree_details = document.getElementById("tree_details")
const loadingSpinner = document.getElementById("loadingSpinner");

// modal
const modalTitle = document.getElementById("modalTitle")
const modalDescription = document.getElementById("modalDescription")
const modalAuthor = document.getElementById("modalAuthor");
const modalStatus = document.getElementById("modalStatus");
const modalDate = document.getElementById("modalDate");
const modalLabels = document.getElementById("modalLabels");
const modalAssignee = document.getElementById("modalAssignee");
const modalPriority = document.getElementById("modalPriority");

// button container
const allBtnContainer = document.getElementById("allBtnContainer")
const openBtnContainer = document.getElementById("openBtnContainer")
const closedBtnContainer = document.getElementById("closedBtnContainer")




// showLoading
function showLoading() {
    loadingSpinner.classList.remove("hidden");
    treesContainer.innerHTML = ''
}

// hideLoading
function hideLoading() {
    loadingSpinner.classList.add("hidden")
}

// count 
function updateCount(num){
    const count = document.getElementById("count");
    if(count){
        count.innerText= `${num} Issues `
    }
}



// active Btn 
function selectActiveBtn(activeBtn) {

    const buttonContainer = [allBtnContainer, openBtnContainer, closedBtnContainer];

    buttonContainer.forEach(btn => {
        btn.classList.remove("bg-[#4A00FF]", "text-white");
        btn.classList.add("bg-white");
    })
    activeBtn.classList.add("bg-[#4A00FF]", "text-white");
    activeBtn.classList.remove("bg-white");

}

// all button container
allBtnContainer.addEventListener("click", () => {

    selectActiveBtn(allBtnContainer);
    updateCount(allIssues.length)
    // treesContainer.innerHTML = "";
    displayTrees(allIssues);
})
// open btn container
openBtnContainer.addEventListener("click", () => {
    selectActiveBtn(openBtnContainer);
    const openStatus = allIssues.filter(item => item.status === "open");
    updateCount(openStatus.length)
    // treesContainer.innerHTML = "";
    displayTrees(openStatus);

})
// close btn container
closedBtnContainer.addEventListener("click", () => {
    selectActiveBtn(closedBtnContainer);
    const closeStatus = allIssues.filter(item => item.status === "closed");
    updateCount(closeStatus.length)
    treesContainer.innerHTML = "";
    displayTrees(closeStatus)
})

// Tree Load

async function loadTrees() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

    const data = await res.json();
    // console.log(data);
    allIssues = data.data

    updateCount(allIssues.length)
    displayTrees(allIssues);

    hideLoading()
}
// display Trees

function displayTrees(trees) {

    treesContainer.innerHTML = ""

    trees.forEach(tree => {
        // console.log(tree);

        // labels lop
        const labels = tree.labels.map(label => {
            let color = ""
            let icon = ""
            if (label === "bug") {
                color = "text-red-500 bg-red-100";
                icon = 'fa-bug'
            } else if (label === "help wanted") {
                color = "text-[#D97706] bg-[#FDE68A]";
                icon = 'fa-life-ring'
            } else if (label === "enhancement") {
                color = "text-gray-600 bg-gray-100";
                icon = 'fa-tag';
            } else {
                color = "text-gray-600 bg-gray-100";
                icon = 'fa-tag';
            }

            return `
        <span class="text-[10px] ${color} rounded-full px-3 py-1">
            <i class="fa-solid ${icon}"></i> ${label}
        </span>
    `;
        }).join('');


        const card = document.createElement('div');
        card.innerHTML =
            `
            <!-- card item -->

            <div class="max-w-sm w-full bg-white rounded-xl cursor-pointer
                        shadow-md border-t-4 
                        ${tree.status == "open" ? "border-green-500" : "border-purple-600"}" >

            <!-- top section -->
            <div class="p-5  " onclick="openTreeModal(${tree.id})" >
                <div class="flex justify-between items-start mb-4">
            <!-- icon -->
                    <div class="w-8 h-8 flex items-center justify-center
                                        bg-green-100 rounded-full">
                        <img src="${tree.status == "open" ? "../assets/Open-Status.png" : "../assets/Closed- Status .png"}" alt="">
                    </div>
            <!-- priority -->
                        <span class="px-4 py-1 text-sm font-semibold 
                            text-red-500 bg-red-100 rounded-full">
                            ${tree.priority}
                        </span>
                </div>
            <!-- title -->
                <h2 class="text-xl font-semibold text-gray-800 mb-2">
                    ${tree.title}
                </h2>
                <!-- description -->
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">
                    ${tree.description}
                </p>
                <!-- tags -->
                <div class="flex items-center justify-between gap-2">
                ${labels}
                </div> 
            </div>
             <div class="border-t px-5 py-3 text-sm text-gray-500">
                <p>#${tree.id} by ${tree.author}</p>
                <p>${new Date(tree.createdAt).toLocaleDateString()}</p>
            </div>

        </div>
                            <!-- card item -->

        `;

        treesContainer.append(card)

    })

}

loadTrees()

// modal
async function openTreeModal(id) {

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

    const data = await res.json();

    console.log(data, "data");

    displayDetails(data.data);

    tree_details.showModal();

}

function displayDetails(issue) {

    // console.log(issue);

    modalTitle.innerText = issue.title;

    modalDescription.innerText = issue.description;

    modalAssignee.innerText = issue.assignee;

    modalAuthor.innerText = issue.author;

    modalPriority.innerText = issue.priority;

    modalDate.innerText = new Date(issue.createdAt).toLocaleDateString();

    modalStatus.innerHTML = `
                <span class="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                            ${issue.status}
                </span>`;

    // labels lop
    const labels = issue.labels.map(label => {
        let color = ""
        let icon = ""
        if (label === "bug") {
            color = "text-red-500 bg-red-100";
            icon = 'fa-bug'
        } else if (label === "help wanted") {
            color = "text-[#D97706] bg-[#FDE68A]";
            icon = 'fa-life-ring'
        } else if (label === "enhancement") {
            color = "text-gray-600 bg-gray-100";
            icon = 'fa-tag';
        } else {
            color = "text-gray-600 bg-gray-100";
            icon = 'fa-tag';
        }

        return `
        <span class="text-[10px] ${color} rounded-full px-3 py-1">
            <i class="fa-solid ${icon}"></i> ${label}
        </span>
    `;
    }).join('');

    modalLabels.innerHTML = labels;


}

// =====================Search======
// document.getElementById("btn-search")
//     .addEventListener("click", () => {
        
//         const inputSearch = document.getElementById("input-search");

//         const searchValue = inputSearch.value.trim().toLowerCase();

//         // console.log(searchValue);

//         fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications")
//             .then(res => res.json())
//             .then(data => {

//                 const allWords = data.data;
//                 // console.log(allWords);

//                 const filterWords = allWords.
//                     filter((word) => word.word.toLowerCase().includes(searchValue));
//                 // console.log(filterWords);

//                 displayLevelWord(filterWords)

//             })

//     })




