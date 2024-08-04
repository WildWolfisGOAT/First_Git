document.addEventListener('DOMContentLoaded', () => {
    let loginPage = document.querySelector('#login-Page');
    let dashPage = document.querySelector('#dashboard');
    let enterBut = document.querySelector('.sub button');
    let enterName = document.querySelector('#enter_name');
    let enterPass = document.querySelector('#enter_pass');
    let nameError = document.querySelector('.nameError');
    let passError = document.querySelector('.passError');
    let logOut = document.querySelector('#logout button');
    let pokemonPart = document.querySelector('.pokemon_part');
    let searchInput = document.querySelector('#searchBar');
    const PokeList = 'https://pokeapi.co/api/v2/pokemon?limit=151';
    const PokeInfo = 'https://pokeapi.co/api/v2/pokemon/'; 
    let pokemonDetails = document.querySelector('.pokemon-details');
    let allPokemons = []; 

    dashPage.style.display = 'none';

    if (localStorage.getItem('Username') && localStorage.getItem('PokePassword')) {
        loginPage.style.display = 'none';
        dashPage.style.display = 'flex';
        fetchPokemons();
    }

    enterBut.addEventListener('click', () => {
        if (enterName.value === "MegaCharizard" && enterPass.value === '123') {
            localStorage.setItem('Username', enterName.value);
            localStorage.setItem('PokePassword', enterPass.value);
            nameError.style.display = 'none';
            passError.style.display = 'none';
            loginPage.style.display = 'none';
            dashPage.style.display = 'flex';
            fetchPokemons();
        } else {
            if (enterName.value !== 'MegaCharizard') {
                nameError.style.display = 'flex';
                passError.style.display = 'none';
            } else if (enterPass.value !== '123') {
                passError.style.display = 'flex';
                nameError.style.display = 'none';
            } else {
                passError.style.display = 'none';
                nameError.style.display = 'none';
            }
        }
    });

    logOut.addEventListener('click', () => {
        localStorage.removeItem('Username');
        localStorage.removeItem('PokePassword');
        dashPage.style.display = 'none';
        loginPage.style.display = 'flex';
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredPokemons = allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(query));
        displayPokemons(filteredPokemons);
    });

    async function fetchPokemons() {
        try {
            let response = await fetch(PokeList);
            let data = await response.json();
            allPokemons = data.results;
            displayPokemons(allPokemons);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    }

    async function displayPokemons(pokemons) {
        pokemonPart.innerHTML = '';
        for (const pokemon of pokemons) {
            try {
                let response = await fetch(pokemon.url);
                let data = await response.json();
                let pokemonItem = document.createElement('div');
                pokemonItem.className = 'pokemon-item';

                let pokemonName = document.createElement('div');
                pokemonName.className = 'pokemon-name';
                pokemonName.innerText = data.name.toUpperCase(); // Display name in uppercase

                let pokemonImage = document.createElement('img');
                pokemonImage.className = 'pokemon-image';
                pokemonImage.src = data.sprites.other['official-artwork'].front_default; // Use high-res image

                pokemonItem.appendChild(pokemonImage);
                pokemonItem.appendChild(pokemonName);
                pokemonPart.appendChild(pokemonItem);

                pokemonItem.addEventListener('click', () => togglePokemonDetails(data.id));
            } catch (error) {
                console.error('Error fetching individual Pokémon data:', error);
            }
        }
    }

    async function togglePokemonDetails(pokemonId) {
        if (pokemonDetails.style.display === 'block' && pokemonDetails.dataset.pokemonId == pokemonId) {
            pokemonDetails.style.display = 'none';
            pokemonDetails.dataset.pokemonId = '';
        } else {
            try {
                let response = await fetch(`${PokeInfo}${pokemonId}`);
                let data = await response.json();
                displayPokemonDetails(data);
            } catch (error) {
                console.error('Error fetching Pokémon details:', error);
            }
        }
    }

    function displayPokemonDetails(pokemon) {
        pokemonDetails.innerHTML = `
            <div class="pokemon-details-content">
                <h1>Pokedex</h1>
                <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name.toUpperCase()}</h3>
                <p>Height: ${pokemon.height}</p>
                <p>Weight: ${pokemon.weight}</p>
                <p>Type: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            </div>
        `;
        pokemonDetails.style.display = 'block';
        pokemonDetails.dataset.pokemonId = pokemon.id;
    }
});
