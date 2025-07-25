const searchInput = document.getElementById("searchinput")
const searchBtn = document.getElementById("searchbtn")
const getQuoteBtn = document.getElementById("getquotebtn")
const quoteText  = document.getElementById("quoteText")
const quoteAuthor = document.getElementById("quoteAuthor")
const addFavBtn = document.getElementById("addfavbtn")
const favList = document.getElementById("favlist")

let currentQuote = { quote: "", author: ""}
let favouriteQuotes = []

getQuoteBtn.addEventListener('click',getQuote)
searchBtn.addEventListener('click',searchQuote)
addFavBtn.addEventListener('click',addtoFav)

async function getQuote() {
    try {
        const res = await fetch("https://api.api-ninjas.com/v1/quotes",{
            headers: {
                'X-Api-Key': 'YOUR_API_KEY_HERE'
            }
        })

        if (!res.ok){
            throw new Error(`HTTPS error! Status: ${res.status}`)
        }

        const data = await res.json()
        const quote = data[0].quote;
        const author = data[0].author;

        quoteText.innerText=quote
        quoteAuthor.innerText =`- ${author}`

        currentQuote = {
            quote : quote,
            author : author
        }

    } catch (error) {
        quoteText.innerText= "Something went wrong!"
        quoteAuthor.innerText = "";
        console.error("Error fetching Quote:",error)
    }
}


async function searchQuote() {
    const keyword = searchInput.value.trim()

    if (keyword === ""){
        quoteText.innerText = "Please enter a keyword!"
        quoteAuthor.innerText = ""
        return;
    }
    try {
        const res = await fetch(`https://api.api-ninjas.com/v1/quotes?query=${keyword}`,{
            headers :{
                'X-Api-Key': 'Gw+t1cI0JjtYbpE5VUz6Gg==uqj8BaF0abGO1bEW'
            }
        })

        if (!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json()

        if (data.length > 0){
            const q = data[0];

            quoteText.innerText = q.quote
            quoteAuthor.innerText = `- ${q.author}`
            currentQuote = { quote: q.quote , author: q.author};
        }
        else{
            quoteText.innerText = "No quotes found!!"
            quoteAuthor.innerText = "";
        }
        searchInput.value=""

    } catch (error) {
        quoteText.innerText = "Something went wrong!";
        quoteAuthor.innerText = "";
        console.error("Error searching quote:", error);
    }
}


function addtoFav(){
    if (!favouriteQuotes.some(q => q.text === currentQuote.text)){
        favouriteQuotes.push(currentQuote)
    }
    else{
        return;
    }
    const quotelist = document.createElement("li")
    quotelist.innerText = `"${currentQuote.quote}" - ${currentQuote.author}`
    favList.appendChild(quotelist)
    
    const deletebtn = document.createElement("button")
    deletebtn.classList.add("deletebtn")
    deletebtn.innerText = "❌"

    deletebtn.addEventListener("click",function(){
        quotelist.remove();
    })
    quotelist.appendChild(deletebtn)
}
