const text = document.querySelector('#text');
const voicesSelect = document.querySelector('#voices');
const speedInput = document.querySelector('#speed');
const speedValueSpan = document.querySelector('#speedValue');
const volumeInput = document.querySelector('#volume');
const volumeValueSpan = document.querySelector('#volumeValue');
const btnSend = document.querySelector('#btnSend');
const btnStop = document.querySelector('#btnStop');

let voicesList = [];
let selectedVoiceIndex = 0;

function populateVoices() {
    voicesList = window.speechSynthesis.getVoices();
    voicesSelect.innerHTML = '';
    for (let i = 0; i < voicesList.length; i++) {
        const optionEl = document.createElement('option');
        optionEl.value = i;
        optionEl.innerText = voicesList[i].name;
        voicesSelect.appendChild(optionEl);
    }
}

window.speechSynthesis.addEventListener('voiceschanged', populateVoices);


function disableElm(value = true){
    if(value){
        voicesSelect.disabled = true;
        btnSend.disabled = true;
        speedInput.disabled = true;
        volumeInput.disabled = true;
    }else{
        voicesSelect.disabled = false;
        btnSend.disabled = false;
        speedInput.disabled = false;
        volumeInput.disabled = false;
    }
}

btnSend.addEventListener('click', () => {
    const inputText = text.value.trim();
    if (inputText !== '') {
        const utterance = new SpeechSynthesisUtterance(inputText);
        utterance.voice = voicesList[selectedVoiceIndex];
        const speedValue = parseFloat(speedInput.value);
        const volumeValue = parseFloat(volumeInput.value);
        utterance.rate = speedValue;
        utterance.volume = volumeValue;
        utterance.addEventListener('start', () => {
            disableElm();
        });
        utterance.addEventListener('end', () => {
            disableElm(false);
        });
        window.speechSynthesis.speak(utterance);
    }
});

btnStop.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    disableElm(false);
});

voicesSelect.addEventListener('change', () => {
    selectedVoiceIndex = parseInt(voicesSelect.value);
});

speedInput.addEventListener('input', () => {
    const speedValue = parseFloat(speedInput.value);
    speedValueSpan.textContent = speedValue.toFixed(2);
});

volumeInput.addEventListener('input', () => {
    const volumeValue = parseFloat(volumeInput.value);
    const convertedVolumeValue = (volumeValue * 100).toFixed(0);
    volumeValueSpan.textContent = convertedVolumeValue;
});