const endpoint = "https://asia-southeast1-white-cider-329103.cloudfunctions.net/function-1/graphql"
const headers = {
    "content-type": "application/json",
    "Authorization": "<token>"
};
const graphqlQuery = {
    "operationName": "Query",
    "query": `query Query($parkName: String, $province: String, $region: String) {
  park(parkname: $parkName, province: $province, region: $region) {
   parkname 
   time
   photo10maximum
   priceinternational
   pricethai
   province
   region
   tel
   location
   description
   activity
  }
}`,
    "variables": {}
};

function fetchPark(park_name, province, region){
    graphqlQuery.variables = {
        "parkName": park_name,
        "province": province,
        "region": region
    }
    const options = {
        "method": "POST",
        "headers": headers,
        "body": JSON.stringify(graphqlQuery)
    };
    return fetch(endpoint, options
    ).then(response => {
        if (!response.ok) {
            console.log(response.errors)
            throw new Error("Request Failed")
        }
        return response.json()
    })
}

window.onclick = function (event) {
    if (event.target.className.toString().split(" ")[0] === "ParkName") {
        let ParkUrl = new URLSearchParams()
        ParkUrl.append("ParkName", event.target.innerHTML)
        let Url = "ParkInfo.html?" + ParkUrl.toString()
        location.href = Url;
        // window.open(Url);
        console.log(Url)
    }
}

document.getElementById("ParkSearch").onkeyup = function (){
    fetchPark(null, null, null).then((json)=>{
        let input, ul, li , park_list, count
        park_list = json.data.park
        input = document.getElementById("ParkSearch").value
        let list_html = document.getElementById("SearchList")
        list_html.innerHTML = ''
        // console.log(park_list[0])
        count = 0
        for(let i=0; i < park_list.length && count < 5 && input.length > 0; i++){
            let park_name = park_list[i].parkname
            if(park_name.trim().indexOf(input) > -1){
                count++
                let tr_add = document.createElement("li")
                tr_add.className = "bg-white hover:bg-neutral-100"
                let bt_add = document.createElement("button")
                bt_add.className = "ParkName m-28"
                bt_add.innerHTML = park_name
                tr_add.appendChild(bt_add)
                list_html.appendChild(tr_add)
            }
        }
    })
}