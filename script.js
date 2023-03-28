const menu = document.querySelectorAll(".menu__list--item");
const menuTitle = document.querySelectorAll(".menu__list--title");
const menuContent = document.querySelectorAll(".menu__content");
const hamburger = document.querySelector(".tab__hamburger");
const tabMenu = document.querySelector(".tabmenu");
const tabmenuItems = document.querySelectorAll(".tabmenu__title");
const tabSubcontainer = document.querySelectorAll(".tabmenu__subcontainer");
const tabMenuIcon = document.querySelectorAll(".tabmenu__title--icon");
const subcontainerItems = document.querySelectorAll(".accordion-items");
const accordion = document.querySelectorAll(".tabmenu__accordion");
const accordionIcon = document.querySelectorAll(".accordion-icon");
const suggestions = document.querySelector('.suggestions');
const tags = document.querySelectorAll(".tags__item");
const search = document.querySelectorAll(".navbar__search--icon");
const searchContainer = document.querySelector(".search__container");
const closebtn = document.querySelector(".search__container--icon");
const searchinput = document.querySelector(".search__container--text");
const header = document.querySelector(".tcsheader");
let selected = 0,
  opened = 0,
  display = 0;

menu.forEach((item, index) => {
  item.addEventListener("mouseover", () => {
    menu[selected].classList.remove("back");
    item.classList.add("back");
    menuTitle[selected].classList.remove("colorchange");
    menuTitle[index].classList.add("colorchange");
    menuContent[selected].classList.remove("show");
    menuContent[index].classList.add("show");
    selected = index;
  });
});


tabmenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {

    if (opened != index) {
      tabSubcontainer[opened].classList.remove("autoheight");
      tabMenuIcon[opened].classList.remove("fa-chevron-up");
      tabMenuIcon[opened].classList.add("fa-chevron-down");
    }
    tabSubcontainer[index].classList.toggle("autoheight");
    tabMenuIcon[index].classList.toggle("fa-chevron-down");
    tabMenuIcon[index].classList.toggle("fa-chevron-up");
    opened = index;
  });
});

subcontainerItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    if (display != index) {
      accordion[display].classList.remove("autoheight");
      accordionIcon[display].classList.remove("fa-minus");
      accordionIcon[display].classList.add("fa-plus");
    }
    accordion[index].classList.toggle("autoheight");
    accordionIcon[index].classList.toggle("fa-plus");
    accordionIcon[index].classList.toggle("fa-minus");
    display = index;
  });
});

hamburger.addEventListener("click", () => {
  tabMenu.classList.toggle("tabshow");
  hamburger.children[0].classList.toggle("upper");
  hamburger.children[1].classList.toggle("hide");
  hamburger.children[2].classList.toggle("lower");
});

// addEventListener('click', (e) => {
// console.log(e.target);
// })

search.forEach(item => {
    item.addEventListener("click", () => {
        searchContainer.classList.add("translate");
        header.classList.remove("fixed");
        searchinput.focus();
        searchinput.value = "";
    })
})

//   addEventListener("click", () => {
//     console.log("kyu nhi chal rha");
//     searchContainer.classList.add("translate");
//     header.classList.remove("fixed");
    
//   });
  
  closebtn.addEventListener("click", () => {
    searchContainer.classList.remove("translate");
    header.classList.add("fixed");
    suggestions.classList.remove('block');
  });

const rawTemplate = document.querySelector("#template").innerHTML;
const compiledTemplate = Handlebars.compile(rawTemplate);
const cardList = document.querySelector(".cards__list");
const container = document.querySelector(".container");
let dataArray = [];
let data;
let end = 3;
let newdataArray = [];

function generatecards(res) {
    if(res.data.length==0){
        const element = {
            "title": "No Result Found...Ye acha bat nahi hai!!!",
        }
        res.data.push(element);
    }
    const generatedHTML = compiledTemplate(res);
    cardList.innerHTML = generatedHTML;
}
  
fetch("data.json")
  .then((response) => response.json())
  .then((res) => {
    data = res;
    dataArray = res.data; 
    let arr=dataArray;
    generatecards({ data: arr });

    newdataArray = dataArray;
    tags.forEach((tag) => {
        tag.addEventListener("click", () => {
          newdataArray = [];
          if (tag.children[0].innerHTML == "All") {
            tags.forEach((tag) => {
              tag.classList.remove("activetag");
            });
            tags[0].classList.add("activetag");
      
            newdataArray = dataArray;
          } else {
            tags[0].classList.remove("activetag");
            if (tag.classList.contains("activetag")) {
              tag.classList.remove("activetag");
              let count = 0;
              tags.forEach((tagitem) => {
                if (tagitem.classList.contains("activetag")) {
                  count++;
                }
              });
              if (count == 0) {
                tags[0].classList.add("activetag");
                newdataArray = dataArray;
              }
            } else {
              tag.classList.add("activetag");
            }
      
            tags.forEach((tagitem) => {
              if (tagitem.classList.contains("activetag")) {
                dataArray.forEach((item) => {
                  if (item.tag == tagitem.children[0].innerHTML)
                    newdataArray.push(item);
                });
              }
            });
          }
      
          generatecards({ data: newdataArray });
        });
      });
      
      let cardArray = [];
      const input = document.querySelector('.search__container--text');
      
      input.addEventListener('keyup', (e) => {
          
          if(e.key == 'Enter'){
            suggestions.classList.remove('block');
              cardArray=[];
              newdataArray.forEach(item => {
                  if(item.title.toLowerCase().indexOf(e.target.value.toLowerCase())>-1){
                      cardArray.push(item);
                      
                  }
              })
              generatecards({ data: cardArray });
          }    
      })
      let titleArray = [];
      const suggestionsList = document.querySelector('.suggestions__list');
      input.addEventListener('keyup', (e) => {
             if(e.key == 'Backspace' && e.target.value == ''){
                suggestions.classList.remove('block');
             }
              titleArray=[];
              newdataArray.forEach(item => {
                  if(item.title.toLowerCase().indexOf(e.target.value.toLowerCase())>-1){
                      titleArray.push(item.title);
                      
                  }
              })
              suggestionsList.innerHTML = '';
              if(titleArray.length == 0){
                const li = `<li class="suggestions__item"><p class="suggestions__item--text">No Result Found!</p></li>`;
                suggestionsList.innerHTML += li;
              }
              else{
                titleArray.forEach((title, index) => {
                    const li = `<li class="suggestions__item" tabindex="0"><p class="suggestions__item--text">${title}</p></li>`;
                    suggestionsList.innerHTML += li;
                });
            }
            if(e.key!='Enter' && (e.key != 'Backspace' && e.target.value != ''))
            suggestions.classList.add('block');
            for(let i=0;i<suggestionsList.children.length;i++){
                suggestionsList.children[i].addEventListener('click', () => {
                    suggestions.classList.remove('block');
                    const temparr = [];
                    dataArray.forEach(element => {
                        if(suggestionsList.children[i].children[0].innerHTML == element.title){
                            temparr.push(element); 
                        }
                    })
                    generatecards({ data:  temparr});
                })
            }
           
      });

    });


//tabfocus pe enter
//Arrowdown key se 
//lazy loading
//tags


