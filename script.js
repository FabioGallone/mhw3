

function ChooseImage(event) {
const selected = event.currentTarget;
const image = selected.querySelector(".checkbox"); 



const area_selezione = document.querySelectorAll(".choice-grid div");



for(const box of area_selezione){
    if(box.dataset.questionId === selected.dataset.questionId){
        const image = box.querySelector(".checkbox"); 
        image.src= "images/unchecked.png";  




         if(box.dataset.choiceId !== selected.dataset.choiceId){
            box.classList.remove("selected");
            box.classList.add("unselected");
            selected.classList.remove("unselected");
     
        }
        else{        
            selected.classList.add("selected");
            image.src= "images/checked.png";
              
        }

      
    }
}
risposteprese[selected.dataset.questionId]=selected.dataset.choiceId;





if(GameOver()){
    RimuoviScelta();
    DefinisciPersonalita();
    
   
}

}



function GameOver(){

    if(Object.keys(risposteprese).length==3){
    return true;
    }

    else
    return false;
}



function RimuoviScelta(){

    if(GameOver()){
        for(const box of selected){
            box.removeEventListener("click", ChooseImage);
          }
                  
        for(const box of form){
        box.removeEventListener('submit', search)

        }

    }
    results.classList.remove("hidden");
    
}

function RicominciaQuiz(){
    ResettaObject();

    
    const area_selezione = document.querySelectorAll(".choice-grid div");
    for(const box of area_selezione){
        const image = box.querySelector(".checkbox"); 
        image.src= "images/unchecked.png"; 
        box.classList.remove("selected");
        box.classList.remove("unselected");
    }
    results.classList.add("hidden");


    for(const box of selected){
        box.addEventListener("click", ChooseImage);
        
    }

    one.classList.add("hidden");
    two.classList.add("hidden");
    three.classList.add("hidden");

    for(const box of form){
      box.addEventListener('submit', search)
    }


    window.scrollTo(0, 0);

}



function ResettaObject(){
    risposteprese = {};
}

function DefinisciPersonalita(){
    
    if(risposteprese["one"]!==risposteprese["two"] && risposteprese["two"]!==risposteprese["three"]){
    stampaPersonalita("one");
    }

    else if(risposteprese["two"]===risposteprese["three"])
    stampaPersonalita("two");

    else if(risposteprese["one"]===risposteprese["two"])
    stampaPersonalita("one");
    
    else if(risposteprese["one"]===risposteprese["three"])
    stampaPersonalita("one");


}


function stampaPersonalita(numero){
 
  const titleContainer = document.querySelector("#results h1");
  const paragraphContainer = document.querySelector("#results p");



  titleContainer.textContent= RESULTS_MAP[risposteprese[numero]].title;
  paragraphContainer.textContent= RESULTS_MAP[risposteprese[numero]].contents;

}



   


const selected= document.querySelectorAll(".choice-grid div")
let risposteprese = {};



const reset = document.querySelector("#results button");
reset.addEventListener("click", RicominciaQuiz);



for(const box of selected){
    box.addEventListener("click", ChooseImage);

}


/*--------------------------------------------PRIMA API--------------------------------------------*/


 function onJson(json){
    console.log('JSON ricevuto');



    if((Object.keys(choice_id).length!==9))
    riempivettore(); 

  
    let num_results = json.pokemon.length;
    let num=0;
    
    for(let i=0; i<9; i++){
  
      num=generanumerocasuale(i, num_results);
  
      // Leggi il documento
      const doc = json.pokemon[num];
      // Leggiamo info

   
     img_url= costruisci_url(doc);
     CostruisciImmagini(img_url, i);  

    
  
    }
    nodoppioni=[];
  }


  function riempivettore(){
    const area_selezione = document.querySelectorAll(".choice-grid div");
    let i=0;
   
    
    for(const box of area_selezione){
        
            choice_id[i]=box.dataset.choiceId;
            i++;
            if(i>8)
            break;
           
    }
  }

  function generanumerocasuale(index, max){

    num = Math.round(Math.random() * (max-1));
    if(index!==0){
    for(let j=0; j<index; j++){
  
      if(nodoppioni[j]===num){
      console.log("Ho trovato un doppione, lo sostituisco");
      generanumerocasuale(index, max);
      }  
       
    }
    nodoppioni[index]=num;
  }
   
   
    return num;

}



  function costruisci_url(doc){

    let result=0;
    let immagine_url=0;
    const link = doc.pokemon.url;  
   

    result = link.replace("https://pokeapi.co/api/v2/pokemon/",""); 
    result = result.replace("/",""); 
  
    immagine_url = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + result + '.png';

    return immagine_url;

  }

    
  

  function CostruisciImmagini(url, index){
  let num= choice_id[index];

    
   if(questionid==1){  
   container= document.querySelector("#one");
   posizionaimmagini(container, num, url);  
   }
   if(questionid==2){
    container= document.querySelector("#two");
    posizionaimmagini(container, num, url);  
    }
   if(questionid==3){
        container= document.querySelector("#three");
        posizionaimmagini(container, num, url);   
    }

  }
    
     function posizionaimmagini(container, num, url){
     
    let library=0;

    
    if(num=="blep")
    library= container.querySelector('[data-choice-id="blep"] img');
    else if(num=="happy")
    library= container.querySelector('[data-choice-id="happy"] img');
    else if(num=="sleeping")
    library= container.querySelector('[data-choice-id="sleeping"] img');
    else if(num=="dopey")
    library= container.querySelector('[data-choice-id="dopey"] img');
    else if(num=="burger")
    library= container.querySelector('[data-choice-id="burger"] img');
    else if(num=="cart")
    library= container.querySelector('[data-choice-id="cart"] img');
    else if(num=="nerd")
    library= container.querySelector('[data-choice-id="nerd"] img');
    else if(num=="shy")
    library= container.querySelector('[data-choice-id="shy"] img');
    else if(num=="sleepy")
    library= container.querySelector('[data-choice-id="sleepy"] img');
    
    

    library.src=url;
  
  }
  

  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
 function search(event){
  
    
 let selected = event.currentTarget;

  // Impedisci il submit del form
  event.preventDefault();

  questionid= selected.dataset.formId;
    let cont=0;
    let anime_input=0;
    let titleContainer=0;


  if(questionid==0){
    /*--------------------------------------------SECONDA API, OAuth2 --------------------------------------------*/
    anime_input = document.querySelector('[data-form-id="0"] .anime');

    const anime_value = encodeURIComponent(anime_input.value);
    console.log('Eseguo ricerca: ' + anime_value);
    // Esegui la richiesta
    fetch("https://kitsu.io/api/edge/anime?filter[text]=" + anime_value,
      {
        headers:
        {
          'Authorization': 'Bearer ' + token
        }
      }
    ).then(onResponse).then(onJsonAuth);
  }

  else{ 
  if(questionid==1){
    cont=document.querySelector('[data-form-id="1"]')
    titleContainer = document.querySelector("#one .question-name h1");
    one.classList.remove("hidden");
  }
  else if(questionid==2){
    cont=document.querySelector('[data-form-id="2"]') 
    titleContainer = document.querySelector("#two .question-name h1");
    two.classList.remove("hidden");
  }
  else if(questionid==3){
    cont=document.querySelector('[data-form-id="3"]')
    titleContainer = document.querySelector("#three .question-name h1");
    three.classList.remove("hidden");
  }
  anime_input = cont.querySelector('.anime');

  const anime_value = encodeURIComponent(anime_input.value);

   
  titleContainer.textContent= "Quale Pokémon di tipo " + anime_value + " ti piace di più?";

  console.log('Eseguo ricerca: ' + anime_value);
  rest_url = 'https://pokeapi.co/api/v2/type/' + anime_value;

  console.log('URL: ' + rest_url);

 
  fetch(rest_url).then(onResponse).then(onJson);
   }
  }


/*--------------------------------------------SECONDA API, OAuth2 --------------------------------------------*/
 function onJsonAuth(json) {
  console.log(json);
  console.log('JSON ricevuto');

  // Svuotiamo la libreria
  const library = document.querySelector('#album-view');
  library.innerHTML = '';
  // Leggi il numero di risultati

    const doc = json.data[0];
    console.log(doc);

    const descrizione= doc.attributes.description;
    const title =doc.attributes.canonicalTitle;
    const immagine_url=doc.attributes.posterImage.medium;


    const imgContainer = document.querySelector("#informazioni img");
    const titleContainer= document.querySelector("#informazioni span");
    const descriptionContainer=document.querySelector("#informazioni p");
    imgContainer.classList.add("layout");
   


    imgContainer.src= immagine_url;
    titleContainer.textContent=title;
    descriptionContainer.textContent=descrizione;
   
  }


function onTokenJson(json)
{
  console.log(json)
  token = json.access_token;
}

function onTokenResponse(response)
{
  return response.json();
}


const email= "fabiopromo27@gmail.com";
const password = escape("newapimhw3");


let token;

fetch("https://kitsu.io/api/oauth/token",
	{
   method: "post",
   body: 'grant_type=password&username=' + email+ '&password=' +password,
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
   }
  }
).then(onTokenResponse).then(onTokenJson);


const form = document.querySelectorAll("[data-form-id]");


for(const box of form){
   
    box.addEventListener('submit', search)
}

const text = document.querySelectorAll("input[type=text]")
for(const eliminatext of text)
eliminatext.addEventListener("focus", onFocus);

function onFocus(event)
{
  const eliminatext = event.currentTarget;
 
  eliminatext.value = '';
  

}


let questionid;
let nodoppioni = [];
let choice_id = {};
