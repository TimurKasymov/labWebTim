let canvas = document.getElementById("cnv");
let context = canvas.getContext("2d");

let canvas1 = document.getElementById("cnv1");
let context1 = canvas1.getContext("2d");

let canvas2 = document.getElementById("cnv2");
let context2 = canvas2.getContext("2d");

let canvas3 = document.getElementById("cnv3");
let context3 = canvas3.getContext("2d");

let canvas4 = document.getElementById("cnv4");
let context4 = canvas4.getContext("2d");

let strikeBtn = document.getElementsByClassName("strike")[0];

let canvasMap = new Map();

let data = {"R": 1};

canvasMap.set(1, [context, canvas]);
canvasMap.set(1.5, [context1, canvas1]);
canvasMap.set(2, [context2, canvas2]);
canvasMap.set(2.5, [context3, canvas3]);
canvasMap.set(3, [context4, canvas4]);
let nowVisible = canvas;
let nowPressed = null;
let validX = false;
let validY = false;

for (let can of canvasMap.values()) {
    can[1].addEventListener("click", (e) => {
        let selectedCanvas = canvasMap.get(data["R"])[1];
        let XCanvas = selectedCanvas.getBoundingClientRect().left;
        let YCanvas = selectedCanvas.getBoundingClientRect().top;
        let x = e.clientX - XCanvas; //x position within the element.
        let y = e.clientY - YCanvas;  //y position within the element.
        let XUnit = ((500 - 140)/2) / data["R"]
        let YUnit = ((500 - 140)/2) / data["R"]
        if (x > 250) {
            data["X"] = (x - 250) / XUnit
        } else {
            data["X"] = -(250 - x) / XUnit
        }
        if (y > 250) {
            data["Y"] = -(y - 250) / YUnit
        } else {
            data["Y"] = (250 - y) / YUnit
        }
        console.log("X: " + data["X"], "Y: " + data["Y"])
        makeFetchRequest();
    })
}


for (let holst of Array.from(canvasMap.keys())) {
    canvasMap.get(holst)[1].style.display = "none";
}
canvasMap.get(1)[1].style.display = "block";


const validateStrikeBtn = function () {
    if (validX && validY) {
        strikeBtn.style.opacity = "1.0";
        strikeBtn.style.cursor = "grab";
    } else {
        strikeBtn.style.opacity = "0.5";
        strikeBtn.style.cursor = "not-allowed";
    }
}

validateStrikeBtn();
let yInput = document.getElementsByClassName("y-input")[0];
console.log(yInput)
yInput.addEventListener("input", (str) => {
    data["Y"] = +yInput.value;
    if (yInput.value === "") {
        validY = false;
        yInput.style.backgroundColor = "white";
    } else if (!isNaN(yInput.value) && +yInput.value <= 3 && +yInput.value >= -4) {
        if (+yInput.value === 3 && !yInput.value.split(".")[1].split("").every(d => d === "0")) {
            validY = false;
            yInput.style.backgroundColor = "#ff2f00";
        } else {
            validY = true;
            yInput.style.backgroundColor = "white";
        }
    } else {
        validY = false;
        yInput.style.backgroundColor = "#ff2f00";
    }
    validateStrikeBtn();
})

const btns = document.querySelectorAll('button')
btns.forEach(b => b.addEventListener("click", async (btn) => {
    if (btn.target.classList.contains("btn")) {
        if (nowPressed !== null) {
            nowPressed.classList.remove("btnactive");
        }
        btn.target.classList.add("btnactive");
        nowPressed = btn.target;
        validX = true;
        data["X"] = +btn.target.innerText;
    } else if (btn.target.classList.contains("strike") && validX && validY) {
        makeFetchRequest();
    }
}))

const makeFetchRequest = () => {
    console.log(data)
    fetch("http://localhost:8080/labv-1.0-SNAPSHOT/hit", {
        method: 'POST',
        redirect: 'follow',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML = data;
            document.body.style.backgroundColor = "#FFEF51";
        })
        .catch(err => console.log(err));
}

let holsts = Array.from(canvasMap.keys());
// drawing coordinates
for (let key of holsts) {
    let holst = canvasMap.get(key);
    holst[1].width = 150
    holst[1].height = 150
    //1
    holst[0].beginPath();
    holst[0].moveTo(holst[1].width / 2, holst[1].height / 2)
    holst[0].lineTo(20 + (holst[1].width - 40) * 3 / 4, holst[1].height / 2)
    holst[0].lineTo(20 + (holst[1].width - 40) * 3 / 4, 20)
    holst[0].fillStyle = 'yellow';
    holst[0].fill()
    holst[0].closePath();
    holst[0].beginPath();
    holst[0].moveTo(20 + (holst[1].width - 40) * 3 / 4, 20)
    holst[0].lineTo(holst[1].width / 2, 20)
    holst[0].lineTo(holst[1].width / 2, holst[1].height / 2)
    holst[0].fill()

    //3
    holst[0].beginPath();
    holst[0].moveTo(holst[1].width / 2, holst[1].height / 2);
    holst[0].arc(holst[1].width / 2, holst[1].height / 2, (holst[1].width - 40) / 2, Math.PI / 2, Math.PI);
    holst[0].fill();

    //4
    holst[0].beginPath();
    holst[0].moveTo(holst[1].width / 2, holst[1].height / 2)
    holst[0].lineTo(holst[1].width - 20, holst[1].height / 2)
    holst[0].lineTo(holst[1].width / 2, holst[1].height - 20)
    holst[0].fill()

    // coordinates
    holst[0].fillStyle = 'black';
    holst[0].beginPath()
    holst[0].moveTo(10, holst[1].height / 2);
    holst[0].lineTo(holst[1].width - 10, holst[1].height / 2)
    holst[0].stroke();
    holst[0].moveTo(holst[1].width / 2, 10);
    holst[0].lineTo(holst[1].width / 2, holst[1].height - 10)
    holst[0].stroke();

    holst[0].fillText(key, holst[1].width - 20, holst[1].height / 2 - 10)
    holst[0].fillText(key, holst[1].width / 2 + 10, 20)
    holst[0].fillText(-key, holst[1].width / 2 + 10, holst[1].height - 20)
    holst[0].fillText(-key, 20, holst[1].height / 2 - 10)

    holst[0].fillText("X", holst[1].width - 20, holst[1].height / 2 + 10)
    holst[0].fillText("Y", holst[1].width / 2 - 10, 20)
}

let picker = document.getElementsByClassName("select-items")[0]
picker.addEventListener("click", (event) => {
    console.log("selected")
    let radius = event.target.value;
    nowVisible.style.display = "none";
    nowVisible = canvasMap.get(+radius)[1];
    nowVisible.style.display = "block";
    data["R"] = +radius;
})

let fetchDataForDrawing = function(){
    fetch("http://localhost:8080/labv-1.0-SNAPSHOT/hit", {
        method: 'GET',
        redirect: 'follow',
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => drawingWithHitData(data))
        .catch(err => console.log(err));
}

let drawingWithHitData = function(hits){
    for(let hit of hits){
        let cont = canvasMap.get(hit["R"])[0];
        let canv = canvasMap.get(hit["R"])[1];
        let XUnit = ((110)/2) / hit["R"];
        let YUnit = ((110)/2) / hit["R"];
        cont.fillStyle = "#ff0000";
        cont.fillRect(canv.width / 2 + XUnit*hit["X"], canv.height / 2 - (YUnit*hit["Y"]), 2,2);
    }
}

fetchDataForDrawing();