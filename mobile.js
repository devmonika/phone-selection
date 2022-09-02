const getMobileApi = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMobiles(data.data);
    // console.log('getMobileApi');
}

const displayMobiles = mobiles => {
    // console.log('displayMobiles');
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    //display all phone if grater than 10
    const showAll = document.getElementById('show-all');

    if (mobiles.length > 9) {
        mobiles = mobiles.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }


    //display no phone msg
    const noPhoneFound = document.getElementById('not-phound');
    if (mobiles.length === 0) {
        noPhoneFound.classList.remove('d-none');
        // alert('No Phone Have Been Found');
    } else {
        noPhoneFound.classList.add('d-none');
        // console.log(mobiles);
    }

    mobiles.forEach(mobile => {
        // console.log(mobile);
        const mobileDiv = document.createElement('div');
        mobileDiv.classList.add('col');
        mobileDiv.innerHTML = `
        <div class="card p-4 shadow-md">
            <img src="${mobile.image}" class="card-img-top" alt="...">
             <div class="card-body">
                <h3 class="card-title text-danger">${mobile.phone_name}</h3>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="getPhoneDetails('${mobile.slug}')" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#mobileModal">Show Details</button>
                
            </div>
        </div>
        `;
        phoneContainer.appendChild(mobileDiv);
    });
    //hide loader
    toggleSpinner(false);
}


document.getElementById('search-phone').addEventListener('click', function () {
    // console.log('click');
    //start loader
    toggleSpinner(true);
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    getMobileApi(searchText);
});


//enterkey work
document.getElementById('search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        // displayMobiles(data.data);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}
const getPhoneDetails = async id => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayEachPhoneDetails(data.data);
}

const displayEachPhoneDetails = mobile => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = mobile.name;
    const modalBodyy = document.getElementById('modal-dtl');
    modalBodyy.innerHTML = `
    <p class="ml-5">Release Date: ${mobile.releaseDate ? mobile.releaseDate : 'No Release Date Found'}</p>
    <ol>
        <h4>Main Features</h4>
        <li>Chipset: ${mobile.mainFeatures.chipSet}</li>
        <li>DisplaySize: ${mobile.mainFeatures.displaySize}</li>
        <li>Memory: ${mobile.mainFeatures.memory}</li>
    </ol>
    `
}

getMobileApi('a');