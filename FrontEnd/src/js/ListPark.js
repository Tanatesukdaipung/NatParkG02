const endpoint = "https://asia-southeast1-white-cider-329103.cloudfunctions.net/function-1/graphql"
const headers = {
    "content-type": "application/json",
    "Authorization": "<token>"
};
const image_url_drive = "https://drive.google.com/drive/folders/11M21L4O82rHt_0_JePbsS0jfQKJeI6LBf--GYoT-jbCFymhO_cQY2FiXanJe7CgBTjaVilnb?usp=sharing"

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
const output = document.querySelector("output > pre")
const ParkTable = document.getElementById("ParkTable")
const list_data = ["parkname", "region", "province"]
let Park = "";

function update(json){
    if(json.data.park) {
        ParkTable.innerHTML = ''
        Park = json.data.park
        Park.forEach(function (item, index){
            const tr_add = document.createElement("tr")
            tr_add.className = "border-b parkinfo"
            tr_add.addEventListener("click", handler_parkname)
            const td_add = document.createElement("td")
            td_add.className = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ParkName"
            td_add.textContent = index.toString()
            td_add.id = "Park" + index
            tr_add.appendChild(td_add)
            for(let i = 0; i<5; i++){
                const td_data_add = document.createElement("td")
                td_data_add.className = "text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap truncate"
                td_data_add.textContent = item[list_data[i]]
                tr_add.appendChild(td_data_add)
            }
            ParkTable.appendChild(tr_add)
        })
    }
}

function handler_parkname(event) {
    let ParkUrl = new URLSearchParams()
    console.log(event.target.parentElement.childNodes[1].textContent)
        ParkUrl.append("ParkName", event.target.parentElement.childNodes[1].textContent)
        let Url = "/ParkInfo.html?" + ParkUrl.toString()
        location.href = Url;
        window.open(Url);
        console.log(Url)

}

fetchPark(null, null, null).then(update)

