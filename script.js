console.log("JS starts!");

const displayDetails = (details) => {
    document.getElementById('character-fullname').innerText = details.fullName;
    document.getElementById('character-title').innerText = details.title;
    document.getElementById('character-image').src = details.imageUrl;
    document.getElementById('character-family').innerText = details.family;
    
    
}

const fetchCharacterDetails = async(id) => {
    try{
        const response = await fetch("https://thronesapi.com/api/v2/Characters/" + id);
        if(!response.ok){
            
        }
        const details = await response.json();
        console.log(details);

        displayDetails(details);

    }catch (error){
        console.log(error);
    }
}

const createCharacterListItem = (id, charName, imageSrc) => {
    console.log(id + " " + charName + " " + imageSrc);
    const listItemContainer = document.createElement('div'); // adding the elements with js
    listItemContainer.className = "list-item-container";

    let fullNameItem = document.createElement("div");
    fullNameItem.className = "list-item-fullname";
    const fullName = document.createElement('p');
    fullName.innerText = charName;
    fullNameItem.append(fullName);

    let imageItem = document.createElement('div');
    imageItem.className = "list-item-image";
    const image = document.createElement('img');
    image.src = imageSrc;
    imageItem.append(image);

    listItemContainer.append(fullNameItem);
    listItemContainer.append(imageItem);

    listItemContainer.onclick = () => {
        fetchCharacterDetails(id);
    }

    return listItemContainer;
}
const fetchCharacters = async() => {
    try{
        const response = await fetch("https://thronesapi.com/api/v2/Characters");
        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        const listContainer = document.getElementById("list-container");
        data.map((item) => {
            const listItem = createCharacterListItem(item.id, item.fullName, item.imageUrl);
            listContainer.append(listItem);
            

        })
    }catch (error){
        console.log(error);
    }
}
fetchCharacters();