const text      = document.querySelector('#text');
const voices    = document.querySelector('#voices');
const btnSend   = document.querySelector('#btnSend');

let selectedVoice = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    for(let i in voicesList){
        let optonEl = document.createElement('option');
        optonEl.setAttribute('value', i);
        optonEl.innerText = voicesList[i].name;
        voices.appendChild(optonEl);
    }
});

btnSend.addEventListener('click', () => {
    if(text.value !== ''){
        let voicesList = window.speechSynthesis.getVoices();
        let ut = new SpeechSynthesisUtterance(text.value);
        ut.voice = voicesList[selectedVoice];
        window.speechSynthesis.speak(ut);
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
});

function updateStatus() {
    if(window.speechSynthesis.speaking){
        voices.setAttribute('disabled', 'disabled');
        btnSend.setAttribute('disabled', 'disabled');
    }else{
        voices.removeAttribute('disabled');
        btnSend.removeAttribute('disabled');
    }
}

setInterval(updateStatus, 100);