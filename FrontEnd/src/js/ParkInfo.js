const endpoint = "https://asia-southeast1-white-cider-329103.cloudfunctions.net/function-1/graphql"
const headers = {
  "content-type": "application/json",
  "Authorization": "<token>"
};
const src_header = "https://drive.google.com/uc?export=view&id="
const img_url_hearder = "https://drive.google.com/uc?id=11M21L4O82rHt_0_JePbsS0jfQKJeI6LBf--GYoT-jbCFymhO_cQY2FiXanJe7CgBTjaVilnb?"
const url_v2 = "https://googledrive.com/host/11M21L4O82rHt_0_JePbsS0jfQKJeI6LBf--GYoT-jbCFymhO_cQY2FiXanJe7CgBTjaVilnb/"

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
   youtube
  }
}`,
  "variables": {}
};

const graphqlMutation = {
  "operationName": "Add_park",
  "query": `mutation Add_park($parkName: String!, $region: String!, $province: String!, $image: [String], $description: [String]) {
  add_park(park_name: $parkName, region: $region, province: $province, Image: $image, description: $description) {
    status
    message
  }
}`,
  "variables": {}
}

let datatoshow = []
// const ws = new WebSocket('ws://localhost:1234/')

function fetchPark(parkname, province, region){
  graphqlQuery.variables = {
    "parkName": parkname,
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
      console.log(response)
      throw new Error("Request Failed")
    }
    return response.json()
  })
}
const list_element = ["parkname", "activity", "location", "pricethai", "priceinternational", "time", "tel", "description", "youtube"]
const list_key = ["activity", "location", "pricethai", "priceinternational", "time", "tel"]

window.onload = function (event){
  let params = new URLSearchParams(window.location.search)
  // console.log(params.get("ParkName") + "\\r\\n")
  fetchPark(params.get("ParkName"), null, null).then(function (item){
    if(item.data.park.length === 0){
      fetchPark(params.get("ParkName") +"\\r\\n", null, null).then(function (item){
        if(item.data.park.length === 0){
          console.log("fetch error 2")
        }else{
          let park = item.data.park[0]
          list_element.forEach((item)=>{
            console.log(park)
            let element = document.getElementById(item);
            if(park[item] == null || park[item] === ""){
              element.textContent = "Not Found"
            }else{
              element.textContent = park[item]
            }
          })
          park["photo10maximum"].split(",").forEach((item)=>{
            let img_id = item.split("/")[3].slice(8)
            let element = document.getElementById("img")
            let img_ele = document.createElement("img")
            img_ele.className = "w-1/5 h-56 mt-8 mb-8"
            img_ele.src = src_header + img_id
            element.appendChild(img_ele)
            // console.log(item.split("/")[3].slice(8))
          })
        }
      })

    }else {
      let park = item.data.park[0]
      list_element.forEach((item)=>{
        // console.log(park)
        let element = document.getElementById(item);
        let yt_id = ""
        if(item === "youtube"){
          if(park.youtube != null){
            // console.log(park.youtube.split("/")[3])
            yt_id = park.youtube.split("/")[3]
            if(park.youtube.split("/")[3].indexOf("watch") > -1){
              yt_id = park.youtube.split("/")[3].slice(8)
            }
            element.src = "https://www.youtube.com/embed/" + yt_id
            element.style.display = "block"
          }
        }
        if(park[item] == null || park[item] === ""){
          element.textContent = "Not Found"
        }else{
          element.textContent = park[item]
        }
      })
      park["photo10maximum"].split(",").forEach((item)=>{
        let img_id = item.split("/")[3].slice(8)
        let element = document.getElementById("img")
        let img_ele = document.createElement("img")
        img_ele.className = "w-1/5 h-56 mt-8 mb-8"
        img_ele.src = src_header + img_id
        element.appendChild(img_ele)
        // console.log(item.split("/")[3].slice(8))
      })
    }
      }
  )
}

fetchPark(null,null,null).then(
  function(item){
    item.data.park.forEach((item, index)=>{
      // console.log(item)
    })
  }
)

window.onclick = function (event) {
  if (event.target.className === "ParkName") {
    let ParkUrl = new URLSearchParams()
    ParkUrl.append("ParkName", event.target.innerHTML)
    let Url = "/ParkInfo.html?" + ParkUrl.toString()
    location.href = Url;
    window.open(Url);
    console.log(Url)
  }
}



