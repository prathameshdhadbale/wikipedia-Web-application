

let searchResults = document.getElementById('searchResults');
let searchInput = document.getElementById('searchInput') ;
let spinner = document.getElementById('spinner');


function createandappendsearchresult(result){
    //creating result container

    let resultContainer = document.createElement('div');
    resultContainer.classList.add("result-container");
    searchResults.appendChild(resultContainer);


    // creating title
    let {link , title} = result ;

    let titleEl = document.createElement('a');
    titleEl.textContent = title ;
    titleEl.href = link ;
    titleEl.classList.add("result-title");
    resultContainer.appendChild(titleEl);

    //creating break
    let br1 = document.createElement('br');
    resultContainer.appendChild(br1);

    //creating url 
    let urlEl = document.createElement('a');
    urlEl.href = link ;
    urlEl.textContent = link ;
    urlEl.classList.add("result-url");
    resultContainer.appendChild(urlEl) ;

    //creating break 
    let br2 = document.createElement('br');
    resultContainer.appendChild(br2);
    
    //creating description
    let {description} = result ;
    let descEl = document.createElement('p');
    descEl.textContent = description ;
    descEl.classList.add("link-description");
    resultContainer.appendChild(descEl) ;

}


function displayResults(search_result){
    spinner.classList.toggle('d-none');
    for(let item of search_result){
        let link = "https://en.wikipedia.org/?curid=" + item.pageid;
        let title = item.title;
        let description = item.snippet;
        createandappendsearchresult({ link, title, description });

    }
}



function searchwikipedia(event){
    if(event.key === "Enter"){
        searchResults.textContent = "" ;
        spinner.classList.toggle('d-none');
        let search = searchInput.value ;
        let url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=" + search ;

        let options = {
            method: "GET" 
        };

        fetch(url , options)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let results = data.query.search;
            displayResults(results);

        });
    }
}




searchInput.addEventListener('keydown',searchwikipedia) ;