let currentPage = 1;
let cardLimit = 5;
let todoListData = [];

//fetch data and display into browser
fetch('https://jsonplaceholder.typicode.com/todos')
    .then((res) => {
        if (res.status != 200) {
            return;
        }
         res.json()
        .then((res) => {
            todoListData = res
            theDisplay(res);
        });
    })
    .catch((err)=>{
        console.log(err);
      });

let theDisplay = (values) => {
    let newCards = '';
    let data1 = values.slice((currentPage-1)*cardLimit,(currentPage)*cardLimit);
    data1.map((data) => {
        newCards += `
        <div class=" mb-4 w-50 h-50"> 
        <div class="card text-center border-primary">
           <div class="card-body ">
              <p class="card-text fw-bold text-capitalize">${data.title}</p>
              <p class="status fw-bold text-capitalize">
              ${
                 data.completed
                    ? `<span style="color:green">complete</span>`
                    : `<span style="color:red">not complete</span>`
              }</p>
              <a href="#" class="link-primary">Details</a>
           </div>
        </div>
     </div>`
            });

            document.getElementById("dataContainer").innerHTML= newCards;
        };




//pagination 
const previous = () => {
    if(currentPage > 1){
        currentPage--;
    }
    document.getElementById("pageNumber").innerHTML = currentPage;
    theDisplay(todoListData);
   
}

const next = () => {
        currentPage++;
    document.getElementById("pageNumber").innerHTML = currentPage;
    theDisplay(todoListData);
} 


document.getElementById("prevPage").addEventListener("click", previous);
document.getElementById("nextPage").addEventListener("click", next );



//limiting number of cards
const limitedCard = (a) => {
    cardLimit = a.target.value;
    theDisplay(todoListData);
}
document.getElementById('cardsLimit').addEventListener("change", limitedCard);


//Search Keyword
let searchKeyword = (e) => {
 const findWords = e.target.value.toLowerCase();
 const wordsSelection = todoListData.filter((values) => {
     return (values.title.toLowerCase().includes(findWords)
     );
     
 });
     theDisplay(wordsSelection);
}

document.getElementById('searchColumn').addEventListener("keyup", searchKeyword);

