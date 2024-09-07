// Declaring the variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

window.addEventListener("load", () => {
  
});

function checkNumber() {
    const luckyNumberInput = document.getElementById("lucky-number");
    const warning = document.getElementById("warning");
    const result = document.getElementById("result1");
    const number = parseInt(luckyNumberInput.value);

    if (number >= 10 && number <= 99) {
        document.getElementById("tip").innerHTML = "感谢填写，稍后会有惊喜！";
        result.innerHTML = `你的幸运数字是：<strong>${number}</strong>`;
        luckyNumberInput.style.display = "none";
        document.querySelector("button").style.display = "none";
        warning.innerHTML = "";
        createImages(number);
    } else {
        warning.innerHTML = "注意要求啦！";
        luckyNumberInput.value = "";
    }
}

function createImages(n) {
    const totalImages = n + 5;
    const body = document.body;

    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement('img');
        img.src = './images/mountain.png';
        img.classList.add('image');
        img.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
        img.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        img.style.animation = `flicker ${Math.random() * 5 + 5}s infinite`;
        img.style.width = `${Math.random() * 50 + 50}px`; // Random width between 50px and 100px
        img.style.height = `${Math.random() * 50 + 50}px`; // Random height between 50px and 100px
        body.appendChild(img);

        setTimeout(() => {
            if (i < n) {
                img.style.opacity = 0;
                setTimeout(() => img.remove(), 500);
            }
        }, Math.random() * 50000 + 10000);
    }

    // Position the remaining 5 images
    positionRemainingImages();
}

function positionRemainingImages() {
    const images = document.querySelectorAll('.image');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const containerCenterY = containerRect.top + containerRect.height / 2;
    const positions = [
        { top: containerCenterY - 60, left: containerRect.right + 20 },
        { top: containerCenterY, left: containerRect.right + 20 },
        { top: containerCenterY + 60, left: containerRect.right + 20 },
        { top: containerCenterY - 30, left: containerRect.left - 120 },
        { top: containerCenterY + 30, left: containerRect.left - 120 }
    ];

    images.forEach((img, index) => {
        if (index >= images.length - 5) {
            img.style.top = `${positions[index - (images.length - 5)].top}px`;
            img.style.left = `${positions[index - (images.length - 5)].left}px`;
            img.style.opacity = 1;
        }
    });

    // Show the birthday and key prompts after the images disappear
    setTimeout(() => {
        document.getElementById("birthday-prompt").innerHTML = "私信愚公他的生日（年/月/日）";
        document.getElementById("key-prompt").innerHTML = "答对后获得秘钥，填写入下方：";
        document.getElementById("secret-key").style.display = "block";
        document.getElementById("key-button").style.display = "block";
    }, 60000); // Adjust the timing as needed
}

function checkKey() {
    const secretKeyInput = document.getElementById("secret-key");
    const keyWarning = document.getElementById("key-warning");
    const key = parseInt(secretKeyInput.value);

    if (key === 667529) {
        document.getElementById("key-prompt").innerHTML = "你填了秘钥，这个结果是：";
        document.getElementById("result2").innerHTML = "正确的！我们轰趴地点天气是——";
        secretKeyInput.style.display = "none";
        document.getElementById("key-button").style.display = "none";
        keyWarning.innerHTML = "";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              console.log(position);
              lon = position.coords.longitude;
              lat = position.coords.latitude; 
              const keycry = key;           
              // API ID
              const api = "c05f892937b2d1a3ffd7180a2e667529";
            
              // API URL
              const base =
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
              `lon=${lon}&appid=${api}`;
            
              // Calling the API
              fetch(base)
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  console.log(data);
                  temperature.textContent = 
                      Math.floor(data.main.temp - kelvin) + "°C";
                  summary.textContent = data.weather[0].description;
                  loc.textContent = data.name + "," + data.sys.country;
                  let icon1 = data.weather[0].icon;
                  icon.innerHTML = 
                      `<img src="icons/${icon1}.svg" style= 'height:10rem'/>`;
                });
            });
              }
    } else {
        keyWarning.innerHTML = "错误哦，是生日还是秘钥搞错啦？";
        secretKeyInput.value = "";
    }
}
