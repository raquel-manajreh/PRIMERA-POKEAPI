const getPokemons = async () => {
    const responses = [];

    for(let i = 1; i <= 150; i++) {
        const uri = 'https://pokeapi.co/api/v2/pokemon/' + i;
        const response = await fetch(uri);
        const info = await response.json();
        responses.push(info);
    }
    return  responses;
    // console.log(responses);
};

// Objetos - NO MAP
// Array - si map
//Lo que está fuera lo cojo tal cual
const mapPokemons = ({name, id, sprites, types}) => {
    
    const image = sprites['front_default'];
    const shinyImage = sprites['front_shiny'];
    const mapTypes = types.map((type) => type.type.name.toLowerCase());
    // const allMoves = moves.map((move) => move.move.name.toLowerCase());
    return {
        image,
        name,
        id,
        mapTypes,
        shinyImage
        // allMoves + añadirlo en const mapPokemons 
    }
};


//Creamos un evento para que el botón de menú nos despliegue o guarde los elementos del mismo
const menuButton$ = document.querySelector('button');
const menuList$ = document.querySelector('.menu-list');

menuButton$.addEventListener('click', function() {
    if(menuList$.style.display === 'none') {
        menuList$.style.display = 'block';
    } else {
        menuList$.style.display = 'none';
    }
});

// Creamos la función para "dibujar" los pokemons
const drawPokemons = (pokemons) => {
    const container$ = document.querySelector('.gran-pokedex');
    container$.innerHTML = '';

    for(const pokemon of pokemons) {
       
        // Primero CREAMOS los DIV para cada ELEMENTO
        const pokemonDiv$ = document.createElement('div');
        pokemonDiv$.classList.add('pokemon');

        const pokemonImage$ = document.createElement('img');
        pokemonImage$.src = pokemon.image;
        pokemonImage$.classList.add('pokemon-img');

        const pokemonName$ = document.createElement('p');
        pokemonName$.textContent = pokemon.name;
        pokemonName$.classList.add('pokemon-name');

        const pokemonId$ = document.createElement('p');
        pokemonId$.textContent = pokemon.id;
        pokemonId$.classList.add('pokemon-id');

        const pokemonShiny$ = document.createElement('img');
        pokemonShiny$.src = pokemon.shinyImage;
        pokemonShiny$.classList.add('pokemon-img-shiny');

        const pokemonTypes$ = document.createElement('p');
        pokemonTypes$.textContent = pokemon.mapTypes.join(', ');
        pokemonTypes$.classList.add('pokemon-type');

        // if (pokemon.mapTypes.includes('water')) {
        //     const waterImg$ = document.querySelector('#agua-img');
        //     if(waterImg$){
        //         waterImg$.style.display = 'inline-block';
        //         pokemonTypes$.appendChild(waterImg$);
        //     }
        // } else {
        //     pokemonTypes$.textContent = pokemon.mapTypes.join(', ')
        // }




        // Después, añadimos los ELEMENTOS de cada pokemon al POKEMONDIV
        pokemonDiv$.appendChild(pokemonImage$);
        pokemonDiv$.appendChild(pokemonName$);
        pokemonDiv$.appendChild(pokemonId$);
        pokemonDiv$.appendChild(pokemonShiny$);
        pokemonDiv$.appendChild(pokemonTypes$);

        // Después, añadimos cada POKEMON al div CONTAINER para que esté en el DOM
        container$.appendChild(pokemonDiv$);
    }
};


//Creo un evento para que dentro del menú, se desplieguen o no los pokémons, según lo que seleccione
const pokedexButton$ = document.querySelector('.pokedex');
const pokemonContainer$ = document.querySelector('.gran-pokedex');

pokedexButton$.addEventListener('click', function(){
    if(pokemonContainer$.style.display === '' || pokemonContainer$.style.display === 'none') {
        pokemonContainer$.style.display = 'flex';
    } else {
        pokemonContainer$.style.display = 'none';
    }
});




const input$ = document.querySelector('.divSearch input');

input$.addEventListener('input', function() {
    const searchElement = input$.value.toLowerCase();
    const filteredPokemons = pokemonsMapped.filter(pokemon => {
        return pokemon.name.toLowerCase().includes(searchElement);
    });
    drawPokemons(filteredPokemons);
});



// creo un evento para mostrar los shinys
// const shinyButton$ = document.querySelector('.shiny');

// shinyButton$.addEventListener('click', function() {
//     const shinyImages = document.querySelectorAll('.pokemon-img-shiny');
//     for(const shinyImage of shinyImages) {
//         if(shinyImage.style.display === '' || pokemonContainer$.style.display === 'none') {
//             shinyImage.style.display = 'flex';
//             pokemon-img;
//         } else {
//             shinyImage.style.display = 'none';
//         }
//     }
// });




// Agregamos cada elemento o función creada a Init para ejecutarlo, y si tenemos algun error, detectarlo más visual y rápidamente
const init = async () => {
    const pokemonsSinMapear = await getPokemons();
    console.log('Pokemons sin mapear', pokemonsSinMapear);

    const pokemonsMapped = pokemonsSinMapear.map(mapPokemons);
    // console.log('Pokemons mapeados', pokemonsMapped);

    drawPokemons(pokemonsMapped);
    //Llamamos a la función creada para mostrar los pokemons mapeados en la web


}

init();