const API_URL_RANDOM= `https://api.thedogapi.com/v1/images/search
?limit=2`;

const API_URL_FAVOURITES= `https://api.thedogapi.com/v1/favourites
?api_key=live_pjh5sZb2bvaOUwYPc5GYfX6vGd0clqDo86K1scJacQUDlgoEZKEAq12wfBnMiUiX`;

const API_URL_FAVOURITES_DELETE= (id) =>`https://api.thedogapi.com/
v1/favourites/${id}?api_key=live_pjh5sZb2bvaOUwYPc5GYfX6vGd0clqDo86K1scJacQUDlgoEZKEAq12wfBnMiUiX`;

const API_URL_UPLOAD = `https://api.thedogapi.com/v1/images/upload?api_key=live_pjh5sZb2bvaOUwYPc5GYfX6vGd0clqDo86K1scJacQUDlgoEZKEAq12wfBnMiUiX`


const spanError = document.getElementById('error');


async function loadRamdonDogos(){
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();

    if(response.status !== 200) {
        spanError.innerText = "Hubo un error: " + response.status;
    }
    
    else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        img1.src = data[0].url;
        img2.src = data[1].url;


        btn1.onclick = () => saveFavouriteDogo(data[0].id);
        btn2.onclick = () => saveFavouriteDogo(data[1].id);
    }
    
}

async function loadFavoritesDogos(){
    const response = await fetch(API_URL_FAVOURITES,{
        method: 'GET',
        headers:{
            'X-API-KEY': 'live_pjh5sZb2bvaOUwYPc5GYfX6vGd0clqDo86K1scJacQUDlgoEZKEAq12wfBnMiUiX'
        },
    });
    const data = await response.json();
    console.log(data);

    if (response.status !== 200){
        spanError.innerText = "Hubo un error: " + response.status + data.message;
        
    }
    
    else{
        const section = document.getElementById('favoritesDogo');
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Dogo favorito')
        section.innerHTML = "";
        h2.appendChild(h2Text);
        section.appendChild(h2);
        data.forEach(dogo =>{
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al dogo de favoritos');
            
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouritMichi(dogo.id);

            
            img.src = dogo.image.url;

            article.appendChild(img);
            article.appendChild(btn);
            
            section.appendChild(article);
            

        });
    }
    
    
}

async function saveFavouriteDogo(id){
    const response = await fetch(API_URL_FAVOURITES,{
        method: 'POST',
        headers: { 'Content-Type':'application/json'} ,
        body: JSON.stringify({
           image_id: id
        })
    });
    const data = await response.json();
    if (response.status !== 200){
        spanError.innerText = "Hubo un error:" + response.status + data.message;
    }else{
        console.log('michi agregado a favoritos')
        loadFavoritesDogos()
    }

    console.log(response);
}

async function deleteFavouritMichi(id){
    const response = await fetch(API_URL_FAVOURITES_DELETE(id),{
        method: 'DELETE',    
    });
    const data = await response.json();
    
    if (response.status !== 200){
        spanError.innerText = "Hubo un error:" + response.status + data.message;
    }
    else{
        console.log('michi borrado de favoritos');
        loadFavoritesDogos();
    }
    console.log(response);
}

async function uploadDogoPhoto(){
    const form = document.getElementById('uploadForm')
    const formData = new FormData(form);

    console.log(formData.get('file'));

    const response = await fetch(API_URL_UPLOAD,{
        method: 'POST',
        headers:{
            //'Content-Type' : 'multipart/form-data',
            'X-API-KEY' : 'live_pjh5sZb2bvaOUwYPc5GYfX6vGd0clqDo86K1scJacQUDlgoEZKEAq12wfBnMiUiX',
        },
        body: formData,
    });

}

loadRamdonDogos();
loadFavoritesDogos()