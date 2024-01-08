function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function vaiagliannunci() {
  let nome = document.getElementById("inputNome").value;
  let prezzo = document.getElementById("inputPrezzo").value;
  let categoria = document.getElementById("inputCategoria").value;
  console.log(nome, prezzo, categoria);
  window.location.href = `annunci.html?prezzo=${prezzo}&nome=${nome}&categoria=${categoria}`;
}
function aggiungiCard(prodotto) {
  let card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${prodotto.image}" alt="${prodotto.title}">
    <h2>${prodotto.title}</h2>
    <p>${prodotto.description}</p>
    <p>Prezzo: ${prodotto.price}€</p>
    <button>Dettagli</button>
  `;

  document.getElementById("cards-container").appendChild(card);
}

window.addEventListener("load", function () {
  console.log("sono andato in una nuova pagina");

  if (window.location.href.includes("annunci.html")) {
    console.log("sono nella pagina annunci");

    let url = new URL(window.location.href);
    let prezzo = url.searchParams.get("prezzo");
    let nome = url.searchParams.get("nome");
    let categoria = url.searchParams.get("categoria");
    let limiteInferiore;
    let limiteSuperiore;

    if (prezzo == "0-100") {
      limiteInferiore = 0;
      limiteSuperiore = 100;
    } else if (prezzo == "100-200") {
      limiteInferiore = 100;
      limiteSuperiore = 200;
    } else if (prezzo == "200-500") {
      limiteInferiore = 200;
      limiteSuperiore = 500;
    } else if (prezzo == "500") {
      limiteInferiore = 500;
    }

    filtraProdottiCatalogo(nome, limiteInferiore, limiteSuperiore, categoria);
  } else {
    console.log("non sono nella pagina annunci");
  }
});

function filtraProdottiCatalogo(
  nome,
  limiteInferiore,
  limiteSuperiore,
  categoria
) {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      let listafiltrata = data.filter((prodotto) => {
        const prezzoInRange =
          (limiteInferiore === undefined ||
            prodotto.price >= limiteInferiore) &&
          (limiteSuperiore === undefined || prodotto.price < limiteSuperiore);

        const nomeMatches = nome === "" || prodotto.title.startsWith(nome);
        const categoriaMatches =
          categoria === "" || prodotto.category === categoria;

        return prezzoInRange && nomeMatches && categoriaMatches;
      });

      console.log("sono la lista filtrata");
      console.log(listafiltrata);

      listafiltrata.forEach((prodotto) => {
        aggiungiCard(prodotto);
      });
    })
    .catch((error) => console.log(error));
}

function gestisciKeyPress(event) {
  if (event.key === 'Enter') {
    vaiagliannunci();
  }
}