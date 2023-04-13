const startButtonCamera = document.querySelector("[data-video-botao]");
const fieldCamera       = document.querySelector("[data-camera]");
const video             = document.querySelector("[data-video]");
const takePhotoButton   = document.querySelector("[data-tirar-foto]");
const canva             = document.querySelector("[data-video-canvas]");
const message           = document.querySelector("[data-mensagem]");
const createAcount      = document.querySelector("[data-enviar]");

let imgUrl              = "";

startButtonCamera.addEventListener("click", async function () {
    const initVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    startButtonCamera.style.display = "none";
    fieldCamera.style.display = "block";

    video.srcObject = initVideo; 
})

takePhotoButton.addEventListener("click", function (){
    canva.getContext('2d').drawImage(video, 0, 0, canva.width, canva.height);

    imgUrl = canva.toDataURL("image/jpeg");

    fieldCamera.style.display = "none";
    message.style.display     = "block";
})

createAcount.addEventListener("click", () => {
    const receiveExistingData          = localStorage.getItem("register");
    const receiveExistingDataConverted = JSON.parse(receiveExistingData);
    
    receiveExistingDataConverted.imagem = imgUrl;

    localStorage.setItem("register", JSON.stringify(receiveExistingDataConverted));
    window.location.href = "./abrir-conta-form-3.html";
})