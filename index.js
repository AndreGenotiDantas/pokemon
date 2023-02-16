const pokemonName = document.querySelector(".pokemon_nome");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImg = document.querySelector(".pokemon_img");
const form = document.querySelector(".form");
const input = document.querySelector(".input_seart");
const btn_prev = document.querySelector(".btn-prev");
const btn_next = document.querySelector(".btn-next");


let serchPokemon = 1;


const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    //dentro do fetch colocamos a url que queremos buscar os dados
    //fetch é so uma promese 
    //para fazer o fetch esoerar eu uso await porem ele so funciona com funcoes assincronas
    //para dizer que uma funcao e assincrona usamos async

    if(APIResponse.status == 200){
        const data = await APIResponse.json();//EXTRAINDO OS DADOS EM JASON
        //essa funcao json() tem que ser experada para ser executada logo usamos await
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    //renderPokemon tem que ser async pois dentro dela usa o fetchPokemon
    const poke = await fetchPokemon(pokemon);
    if(poke){
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = poke.name;
        pokemonNumber.innerHTML = poke.id;
        pokemonImg.src = poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        //usamos couchetes para acessar elementos pois é melhor evita erros de reconhecimendo dos elementos
        input.value = "";
        serchPokemon = poke.id;
        return;
    }
    pokemonImg.style.display = 'none';
    pokemonName.innerHTML = "not fund";
    pokemonNumber.innerHTML = "";

}


form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
   

});

btn_prev.addEventListener('click', () =>{

    if(serchPokemon > 1){
        serchPokemon -= 1;
        renderPokemon(serchPokemon);
    }
   

});

btn_next.addEventListener('click', () =>{

    serchPokemon += 1;
    renderPokemon(serchPokemon);
   

});



renderPokemon(serchPokemon);

