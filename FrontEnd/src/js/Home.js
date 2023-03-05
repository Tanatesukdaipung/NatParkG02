document.getElementById("poly_middle").onclick = function (){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img.middle
    document.getElementById("region_name").textContent = "ภาคกลาง"
    list_middle.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            let park_element = document.createElement("button")
            if(index === 0){
                province_element.className = "ml-4"
                province_element.textContent = item
            }else{
                park_element.className = "ParkName"
                park_element.textContent = item
            }
            list_element.appendChild(park_element)
            list_element.appendChild(province_element)
        })
        document.getElementById("info_list").appendChild(list_element)
    })
    let popup = document.getElementById("info_popup")
    popup.style.display = ""

}

document.getElementById("poly_north").onclick = function (){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img.north
    document.getElementById("region_name").textContent = "ภาคเหนือ"
    list_north.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            let park_element = document.createElement("button")
            if(index === 0){
                province_element.className = "ml-4"
                province_element.textContent = item
            }else{
                park_element.className = "ParkName"
                park_element.textContent = item
            }
            list_element.appendChild(park_element)
            list_element.appendChild(province_element)
        })
        document.getElementById("info_list").appendChild(list_element)

    })
    let popup = document.getElementById("info_popup")
    popup.style.display = ""

}

document.getElementById("poly_west").onclick = function (){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img.west
    document.getElementById("region_name").textContent = "ภาคตะวันตก"
    list_ne.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            let park_element = document.createElement("button")
            if(index === 0){
                province_element.className = "ml-4"
                province_element.textContent = item
            }else{
                park_element.className = "ParkName"
                park_element.textContent = item
            }
            list_element.appendChild(park_element)
            list_element.appendChild(province_element)
        })
        document.getElementById("info_list").appendChild(list_element)

    })
    let popup = document.getElementById("info_popup")
    popup.style.display = ""
}

document.getElementById("poly_east").onclick = function (){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img.east
    document.getElementById("region_name").textContent = "ภาคตะวันออก"
    list_east.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            let park_element = document.createElement("button")
            if(index === 0){
                province_element.className = "ml-4"
                province_element.textContent = item
            }else{
                park_element.className = "ParkName"
                park_element.textContent = item
            }
            list_element.appendChild(park_element)
            list_element.appendChild(province_element)
        })
        document.getElementById("info_list").appendChild(list_element)

    })
    let popup = document.getElementById("info_popup")
    popup.style.display = ""
}

document.getElementById("poly_ne").onclick = function (){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img.ne
    document.getElementById("region_name").textContent = "ภาคตะวันออกเฉียงเหนือ"
    list_ne.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            let park_element = document.createElement("button")
            if(index === 0){
                province_element.className = "ml-4"
                province_element.textContent = item
            }else{
                park_element.className = "ParkName"
                park_element.textContent = item
            }
            list_element.appendChild(park_element)
            list_element.appendChild(province_element)
        })
        document.getElementById("info_list").appendChild(list_element)

    })
    let popup = document.getElementById("info_popup")
    popup.style.display = ""
}


document.getElementById("poly_south").onclick = function (){
    document.getElementById("info_list").innerHTML = ""
    let img_element = document.getElementById("info_popup_img")
    img_element.src = list_map_img.south
    document.getElementById("region_name").textContent = "ภาคใต้"
    list_south.forEach((item, index)=>{
        let list_element = document.createElement("li")
        item.forEach((item, index)=>{
            let province_element = document.createElement("p")
            let park_element = document.createElement("button")
            if(index === 0){
                province_element.className = "ml-4"
                province_element.textContent = item
            }else{
                park_element.className = "ParkName"
                park_element.textContent = item
            }
            list_element.appendChild(park_element)
            list_element.appendChild(province_element)
        })
        document.getElementById("info_list").appendChild(list_element)

    })
    let popup = document.getElementById("info_popup")
    popup.style.display = ""
}
document.getElementById("info_popup_close").onclick = function (){
    let popup = document.getElementById("info_popup")
    popup.style.display = "none"
}
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
const list_north = [["จังหวัดกำแพงเพชร","อุทยานแห่งชาติคลองลาน"], ["จังหวัดเชียงใหม่", "อุทยานแห่งชาติดอยอินทนนท์", "อุทยานแห่งชาติเชียงดาว"], ["จังหวัดตาก", "อุทยานแห่งชาติแม่เมย"], ["จังหวัดสุโขทัย","อุทยานแห่งชาติศรีสัชนาลัย"]]
const list_west = [["จังหวัดกาญจนบุรี", "อุทยานแห่งชาติลำคลองงู", "อุทยานแห่งชาติเฉลิมรัตนโกสินทร์"], ["จังหวัดประจวบคีรีขันธ์", "อุทยานแห่งชาติเขาสามร้อยยอด"],["จังหวัดเพชรบุรี", "อุทยานแห่งชาติแก่งกระจาน"], ["จังหวัดราชบุรี", "อุทยานแห่งชาติเฉลิมพระเกียรติไทยประจัน"]]
const list_middle = [["จังหวัดสระบุรี", "อุทยานแห่งชาติน้ำตกเจ็ดสาวน้อย (Namtok Chet Sao Noi)", "อุทยานแห่งชาติน้ำตกสามหลั่น (Namtok Sam Lan)"],["จังหวัดสุพรรณบุรี", "อุทยานแห่งชาติพุเตย (Phu Toei)"]]
const list_east = [["จังหวัดจันทบุรี", "อุทยานแห่งชาติเขาคิชฌกูฏ (Khao Khitchakut)", "อุทยานแห่งชาติเขาสิบห้าชั้น (Khao Sip Ha Chan)", "อุทยานแห่งชาติน้ำตกพลิ้ว (Namtok Phlio)"],["จังหวัดตราด", "อุทยานแห่งชาติน้ำตกคลองแก้ว (Namtok Khlong Kaeo)", "อุทยานแห่งชาติหมู่เกาะช้าง (Mu Ko Chang)"], ["จังหวัดระยอง", "อุทยานแห่งชาติเขาชะเมา - เขาวง (Khao Chamao - Khao Wong)", "อุทยานแห่งชาติเขาแหลมหญ้า-หมู่เกาะเสม็ด (Khao Leam Ya - Mu Ko Samet)"]]
const list_map_img = {"middle": "/ภาคกลาง.ef64cdf1.jpg", "north":"/ภาคเหนือ.f32e9662.jpg", "south":"/ภาคใต้.11d628f9.jpg", "ne":"/ภาคอีสาน_ตะวันออกเฉียงเหนือ.e8f5ba46.jpg", "west":"/ภาคตะวันตก.0759dbec.jpg", "east":"/ภาคตะวันออก.aec337cd.jpg"}
const list_ne = [["จังหวัดขอนแก่น","อุทยานแห่งชาติภูเวียง (Phu Wiang)"],["จังหวัดนครราชสีมา","อุทยานแห่งชาติเขาใหญ่ (Khao Yai)"],["จังหวัดเลย","อุทยานแห่งชาติภูกระดึง (Phu Kradueng)"],["จังหวัดสกลนคร","อุทยานแห่งชาติภูพาน (Phu Phan)"],["จังหวัดอุบลราชธานี","อุทยานแห่งชาติผาแต้ม (Pha Taem)"]]
const list_south = [["จังหวัดกระบี่","อุทยานแห่งชาติหมู่เกาะลันตา (Mu Ko Lanta)"],["จังหวัดตรัง","อุทยานแห่งชาติหาดเจ้าไหม (Hat Chao Mai)"],["จังหวัดนครศรีธรรมราช","อุทยานแห่งชาติน้ำตกสี่ขีด (Namtok Si Khit)"],["จังหวัดพังงา","อุทยานแห่งชาติหมู่เกาะสิมิลัน (Mu Ko Similan)"],["จังหวัดภูเก็ต"," อุทยานแห่งชาติสิรินาถ (Sirinat)"]]

