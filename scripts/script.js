var pokeUrl = 'https://pokeapi.co/api/v2/'
const container = document.getElementById('container')
const pokeModal = document.getElementById('pokedex')
let pokeNum = 0

const imgTypeBug = 'assets/type-bug.png', imgTypeDark = 'assets/type-dark.png', imgTypeDragon = 'assets/type-dragon.png', imgTypeElectric = 'assets/type-electric.png',
    imgTypeGhost = 'assets/type-ghost.png', imgTypeGrass = 'assets/type-grass.png', imgTypeGround = 'assets/type-ground.png', imgTypeIce = 'assets/type-ice.png',
    imgTypeNormal = 'assets/type-normal.png', imgTypePoison = 'assets/type-poison.png', imgTypePsychic = 'assets/type-psychic.png', imgTypeRock = 'assets/type-rock.png',
    imgTypeFairy = 'assets/type-fairy.png', imgTypeFighting = 'assets/type-fighting.png', imgTypeFire = 'assets/type-fire.png', imgTypeFlying = 'assets/type-flying.png',
    imgTypeSteel = 'assets/type-steel.png', imgTypeWater = 'assets/type-water.png';

const createPokeCard = async () => {
    try {
        const res = await fetch(pokeUrl + 'pokemon/?limit=151')
        const data = await res.json()
        let pokeCards = ``

        for (const pokemon of data.results) {
            pokeNum += 1;
            let pokeInfo = await getPokeInfo(pokemon.url);
            let pokeType = '';
            for (const pokeTypes of pokeInfo.types) {
                pokeType += capitalizarPrimeraLetra(pokeTypes.type.name) + ' '
            }

            pokeCards += `
            <div class="poke-container">
                <a href="#openModal" onclick="getPokeDetail(`+ pokeNum + `)">
                    <div class="poke-card">
                        <div class="poke-img">
                        <div class="poke-num"><b>`+ pokeNum + `</b></div>
                            <img
                                src="`+ pokeInfo.img + `">
                        </div>
                        <div class="poke-info">
                            <p>
                                Name: `+ capitalizarPrimeraLetra(pokemon.name) + ` <br>
                                Type: `+ pokeType + `
                            </p>
                        </div>
                    </div>
                </a>
            </div>`
        }
        container.innerHTML = pokeCards;


    } catch (error) {
        console.log(error);
    }
}

onload = startPage();

const getPokeInfo = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json()

        pokeInfo = {
            name: data.forms[0].name,
            types: data.types,
            weight: data.weight,
            height: data.height,
            img: data.sprites.other.dream_world.front_default
        }

        return pokeInfo

    } catch (error) {
        console.log(error);
    }
}

function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function startPage() {
    let locatio = window.location.pathname
    switch (locatio) {
        case "/":
        case "/index.html":
            createPokeCard();

    }
}

const getPokeDetail = async (num) => {
    try {
        const url = "https://pokeapi.co/api/v2/pokemon/" + num
        const pokeInfo = await getPokeInfo(url);
        const name = pokeInfo.name, height = pokeInfo.height, weight = pokeInfo.weight, img = pokeInfo.img;
        let pokeType = '', pokeTypeImg = '';

        for (const pokeTypes of pokeInfo.types) {

            pokeType += capitalizarPrimeraLetra(pokeTypes.type.name) + ' '
        }

        pokeTypeImg = getPokeTypeImg(pokeInfo.types)
        const html = `
        <div class="pokedex-img">
            <img src="`+ img + `" alt="">
        </div>
        <div class="pokedex-info">
            <div class="pokedex-text">
                <h2>Name: `+ capitalizarPrimeraLetra(name) + `</h2>
                <p>
                    Weight: `+ weight + ` Kg <br>
                    Height: `+ height + ` Mts<br>
                    Type: `+ pokeType + ` <br>

                </p>
            </div>
            <div class="pokedex-type">
                `+ pokeTypeImg + `
            </div>
        </div>`;
        pokeModal.innerHTML = html;

    } catch (error) {
        console.log(error);
    }

}

function getPokeTypeImg(pokeTypes) {
    html = '';


    for (const pokeType of pokeTypes) {
        console.log(pokeType);
        switch (pokeType.type.name) {
            case 'bug':
                html += `<img src="` + imgTypeBug + `" alt="">`
                break;
            case 'dark':
                html += `<img src="` + imgTypeDark + `" alt="">`
                break;
            case 'dragon':
                html += `<img src="` + imgTypeDragon + `" alt="">`
                break;
            case 'electric':
                html += `<img src="` + imgTypeElectric + `" alt="">`
                break;
            case 'fairy':
                html += `<img src="` + imgTypeFairy + `" alt="">`
                break;
            case 'fighting':
                html += `<img src="` + imgTypeFighting + `" alt="">`
                break;
            case 'fire':
                html += `<img src="` + imgTypeFire + `" alt="">`
                break;
            case 'flying':
                html += `<img src="` + imgTypeFlying + `" alt="">`
                break;
            case 'ghost':
                html += `<img src="` + imgTypeGhost + `" alt="">`
                break;
            case 'grass':
                html += `<img src="` + imgTypeGrass + `" alt="">`
                break;
            case 'ground':
                html += `<img src="` + imgTypeGround + `" alt="">`
                break;
            case 'ice':
                html += `<img src="` + imgTypeIce + `" alt="">`
                break;
            case 'normal':
                html += `<img src="` + imgTypeNormal + `" alt="">`
                break;
            case 'poison':
                html += `<img src="` + imgTypePoison + `" alt="">`
                break;
            case 'psychic':
                html += `<img src="` + imgTypePsychic + `" alt="">`
                break;
            case 'rock':
                html += `<img src="` + imgTypeRock + `" alt="">`
                break;
            case 'steel':
                html += `<img src="` + imgTypeSteel + `" alt="">`
                break;
            case 'water':
                html += `<img src="` + imgTypeWater + `" alt="">`
                break;

        }
    }
    return html;
}



