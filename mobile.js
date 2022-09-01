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
    mobiles.forEach(mobile => {
        // console.log(mobile);
        const mobileDiv = document.createElement('div');
        mobileDiv.classList.add('col');
        mobileDiv.innerHTML = `
        <div class="card p-4">
            <img src="${mobile.image}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">${mobile.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
             </div>
        </div>
        `;
        phoneContainer.appendChild(mobileDiv);
    });
}


document.getElementById('search-phone').addEventListener('click', function () {
    // console.log('click');
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    getMobileApi(searchText);
});


getMobileApi('a');