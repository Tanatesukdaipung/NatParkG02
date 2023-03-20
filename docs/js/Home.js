const list_north = [["จังหวัดกำแพงเพชร","อุทยานแห่งชาติคลองลาน (Khlong Lan)"], ["จังหวัดเชียงใหม่", "อุทยานแห่งชาติดอยอินทนนท์", "อุทยานแห่งชาติเชียงดาว (Chiang Dow)"], ["จังหวัดตาก", "อุทยานแห่งชาติแม่เมย (Mae Moei)"], ["จังหวัดสุโขทัย","อุทยานแห่งชาติศรีสัชนาลัย (Si Satchanalai)"]]
const list_west = [["จังหวัดกาญจนบุรี", "อุทยานแห่งชาติลำคลองงู (Lam Klong Ngu)", "อุทยานแห่งชาติเฉลิมรัตนโกสินทร์ (Chaloem Rattanakosin)"], ["จังหวัดประจวบคีรีขันธ์", "อุทยานแห่งชาติเขาสามร้อยยอด (Khao Sam Roi Yot)"],["จังหวัดเพชรบุรี", "อุทยานแห่งชาติแก่งกระจาน (Kaeng Krachan)"], ["จังหวัดราชบุรี", "อุทยานแห่งชาติเฉลิมพระเกียรติไทยประจัน (Chaloem Phra Kiat Thai Prachan)"]]
const list_middle = [["จังหวัดสระบุรี", "อุทยานแห่งชาติน้ำตกเจ็ดสาวน้อย (Namtok Chet Sao Noi)", "อุทยานแห่งชาติน้ำตกสามหลั่น (Namtok Sam Lan)"],["จังหวัดสุพรรณบุรี", "อุทยานแห่งชาติพุเตย (Phu Toei)"]]
const list_east = [["จังหวัดจันทบุรี", "อุทยานแห่งชาติเขาคิชฌกูฏ (Khao Khitchakut)", "อุทยานแห่งชาติเขาสิบห้าชั้น (Khao Sip Ha Chan)", "อุทยานแห่งชาติน้ำตกพลิ้ว (Namtok Phlio)"],["จังหวัดตราด", "อุทยานแห่งชาติน้ำตกคลองแก้ว (Namtok Khlong Kaeo)", "อุทยานแห่งชาติหมู่เกาะช้าง (Mu Ko Chang)"], ["จังหวัดระยอง", "อุทยานแห่งชาติเขาชะเมา - เขาวง (Khao Chamao - Khao Wong)", "อุทยานแห่งชาติเขาแหลมหญ้า-หมู่เกาะเสม็ด (Khao Leam Ya - Mu Ko Samet)"]]
const list_map_img = {"middle": "img/edit/ภาคกลาง.jpg", "north":"img/edit/ภาคเหนือ.jpg", "south":"img/edit/ภาคใต้.jpg", "ne":"img/edit/ภาคอีสาน_ตะวันออกเฉียงเหนือ.jpg", "west":"img/edit/ภาคตะวันตก.jpg", "east":"img/edit/ภาคตะวันออก.jpg"}
const list_ne = [["จังหวัดขอนแก่น","อุทยานแห่งชาติภูเวียง (Phu Wiang)"],["จังหวัดนครราชสีมา","อุทยานแห่งชาติเขาใหญ่ (Khao Yai)"],["จังหวัดเลย","อุทยานแห่งชาติภูกระดึง (Phu Kradueng)"],["จังหวัดสกลนคร","อุทยานแห่งชาติภูพาน (Phu Phan)"],["จังหวัดอุบลราชธานี","อุทยานแห่งชาติผาแต้ม (Pha Taem)"]]
const list_south = [["จังหวัดกระบี่","อุทยานแห่งชาติหมู่เกาะลันตา (Mu Ko Lanta)"],["จังหวัดตรัง","อุทยานแห่งชาติหาดเจ้าไหม (Hat Chao Mai)"],["จังหวัดนครศรีธรรมราช","อุทยานแห่งชาติน้ำตกสี่ขีด (Namtok Si Khit)"],["จังหวัดพังงา","อุทยานแห่งชาติหมู่เกาะสิมิลัน (Mu Ko Similan)"],["จังหวัดภูเก็ต"," อุทยานแห่งชาติสิรินาถ (Sirinat)"]]

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

async function update_popup(list_input, img, text, color = "", background = ""){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img[img]
    let info_popup_img = document.getElementById("info_popup_bg")
    info_popup_img.style.backgroundImage = background
    info_popup_img.style.backgroundRepeat = "no-repeat"
    info_popup_img.style.backgroundSize = "cover"
    document.getElementById("region_name").textContent = text
    list_input.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            if(index === 0){
                province_element.className = "ml-8"
                province_element.textContent = item
                list_element.appendChild(province_element)
            }else{
                let park_element = document.createElement("button")
                park_element.className = "ParkName ml-4"
                park_element.textContent = item
                list_element.appendChild(park_element)
            }
        })
        document.getElementById("info_list").appendChild(list_element)
    })
    let bg = document.getElementById("bg_info")
    bg.style.backgroundColor = color
    let popup = document.getElementById("info_popup")
    popup.style.display = ""
}

document.getElementById("poly_middle").onclick = function () {update_popup(list_middle, "middle", "ภาคกลาง", "#e0dfb6", "url('img/bg_index/ภาคกลาง.png')")}
document.getElementById("poly_north").onclick = function () {update_popup(list_north, "north", "ภาคเหนือ", "#dabbd8", "url('img/bg_index/ภาคเหนือ.png')")}
document.getElementById("poly_south").onclick = function () {update_popup(list_south, "south", "ภาคใต้", "#badbdb", "url('img/bg_index/ภาคใต้.png')")}
document.getElementById("poly_east").onclick = function () {update_popup(list_east, "east", "ภาคตะวันออก", "#ced7bf", "url('img/bg_index/ภาคตะวันออก.png')")}
document.getElementById("poly_west").onclick = function () {update_popup(list_west, "west", "ภาคตะวันตก", "#bebed7", "url('img/bg_index/ภาคตะวันตก.png')")}
document.getElementById("poly_ne").onclick = function () {update_popup(list_ne, "ne", "ภาคตะวันออกเฉียงเหนือ", "#ded3b8", "url('img/bg_index/ภาคตะวันออกเฉียงเหนือ.png')")}

document.getElementById("info_popup_close").onclick = function (){
    let popup = document.getElementById("info_popup")
    popup.style.display = "none"
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