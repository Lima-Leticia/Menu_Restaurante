import menu from "./foods.js";

  const sectionCenter = document.querySelector(".section-center");
  const btnContainer = document.querySelector(".btn-container");
  
  var CONTADOR = menu.length + 1;

  // Mostra todos os itens quando a Página é carregada
  window.addEventListener("DOMContentLoaded", function () {
    displayMenuItems(menu);
    displayMenuButtons();
    

  });
  //Função que preenche os cards com as respectivas comidas do arquivo foods.js
  function displayMenuItems(menuItems) {
    sectionCenter.innerHTML = ''; // Inserido
        
    let displayMenu = menuItems.map(function(item) {
      
      
      return `<article class="menu-item">
            <img src=${item.img} alt=${item.title} class="photo" />
            <div class="item-info">
              <header>
                <h4>${item.title}</h4>
                <h4 class="price">$${item.price}</h4>
              </header>
              <p class="item-text">
                ${item.desc}
              </p>
            </div>
          </article>`;
    });
    displayMenu = displayMenu.join("");
    
  
    sectionCenter.innerHTML = displayMenu;
  }
  //Função que filtra as buscas ao clicar no botão
  function displayMenuButtons() {
    const categories = menu.reduce(
      function (values, item) {
        if (!values.includes(item.category)) {
          values.push(item.category);
        }
        return values;
      },
      ["tudo"]
    );
    const categoryBtns = categories
      .map(function (category) {
        return `<button type="button" class="filter-btn" data-id=${category}>
            ${category}
          </button>`;
      })
      .join("");
  
    btnContainer.innerHTML = categoryBtns;
    const filterBtns = btnContainer.querySelectorAll(".filter-btn");
    console.log(filterBtns);
  
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        const category = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(function (menuItem) {
          
          if (menuItem.category === category) {
            return menuItem;
          }
        });
        if (category === "tudo") {
          displayMenuItems(menu);
        } else {
          displayMenuItems(menuCategory);
        }
      });
    });
  }
  
  //Habilita a Tecla ESC para fechar o formulario
  document.addEventListener('keydown', function (event) {
    if (event.key == 'Escape') {
      document.querySelector('#modal-foods').style.display = 'none';
    }
  });

//Função para abrir o formulario
function openForm() {
  const openModal = document.querySelector('#modal-foods');
  openModal.style.display = 'block';
}
//Função para fechar o formulario
function exitForm(){
  const exitModal = document.querySelector('#modal-foods');
    exitModal.style.display = 'none';
}
//Função para salvar o que foi digitado no formulario
function saveFood() {
  const arrayInputs = document.querySelectorAll('form input');
  const select = document.querySelector('form select');

  const title = arrayInputs[0].value;
  const category = select.value;
  const price = arrayInputs[1].value;
  const img = arrayInputs[2].value;
  const desc = arrayInputs[3].value;

  const newFood = {
    id: CONTADOR++,
    title: title, 
    category: category,
    price: price,
    img: img,
    desc: desc,
  };


  arrayInputs[0].value = ''
  select.value = ''
  arrayInputs[1].value = ''
  arrayInputs[2].value = ''
  arrayInputs[3].value = ''

  menu.push(newFood); // Inserido

  const modal = document.querySelector('#modal-foods');
  modal.style.display = 'none';

  displayMenuItems(menu); 
}

window.openForm = openForm;
window.exitForm = exitForm;
window.saveFood = saveFood;

