const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll) => {


    // 1. find the parent element
    const cardContainer = document.getElementById('card_container');


    // clear phone container cards before adding new cards 
    cardContainer.textContent = '';

    // bonus part
    if (phones.length === 0) {
        alert('i have not found');
    }


    // display show all button if there more than 12 phone
    const btnHidden = document.getElementById('btn_hidden');
    if (phones.length > 12 && !isShowAll) {
        btnHidden.classList.remove('hidden');
    } else {
        btnHidden.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);

    // display only first 12 phones if not show all


    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }



    phones.forEach((phone) => {
        // 2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card  bg-gray-200 shadow-xl';


        //3. set inner html
        phoneCard.innerHTML = `
        
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h4 class="text-2xl font-semibold">$999</h4>
            <div class="card-actions">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
             </div>
        </div>
        `;

        // 4. append chile elements
        cardContainer.appendChild(phoneCard)
    });
    // hide loading spinner
    toggleLoadingSpinner(false);
}



// handle show details function
const handleShowDetail = async(id) =>{

    // load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)

}

// showPhoneDetails function

const showPhoneDetails = (phone) =>{
    console.log(phone);
    show_details_modal.showModal();

    const modal_container = document.getElementById('modal_container');

    modal_container.innerHTML = `
    <img class="mx-auto" src="${phone.image}" alt="">
    <h3 class="text-2xl font-semibold">${phone?.name || 'no name'}</h3>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p><span class="text-[20px] font-medium">Storage : </span>${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'no memory' }</p>
    <p><span class="text-[20px] font-medium">Display Size : </span>${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'no available' }</p>
    <p><span class="text-[20px] font-medium">Chipset : </span>${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'no available' }</p>
    <p><span class="text-[20px] font-medium">Memory : </span>${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'no available' }</p>
    <p><span class="text-[20px] font-medium">Slug : </span>${phone.slug ? phone.slug : 'no available'}</p>
    <p><span class="text-[20px] font-medium">Release data : </span>${phone.releaseDate ? phone.releaseDate : 'no available'}</p>
    <p><span class="text-[20px] font-medium">Brand : </span>${phone.brand ? phone.brand : 'no available'}</p>
    <p><span class="text-[20px] font-medium">GPS : </span>${phone.others.GPS ? phone.others.GPS : 'no available'}</p>
    `

}





// handle search button

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchFiled = document.getElementById('search_filed');
    const searchText = searchFiled.value;
    if (searchText === '') {
        alert('give me valid text')
    } else {
        loadPhone(searchText, isShowAll);
    }
}


// spinner_loader

const toggleLoadingSpinner = (isLoading) => {
    const spinnerLoader = document.getElementById('loading_spinner');
    if (isLoading) {
        spinnerLoader.classList.remove('hidden');
    } else {
        spinnerLoader.classList.add('hidden');
    }
}



// handle show all button

const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();