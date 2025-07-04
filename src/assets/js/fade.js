export function fadeInAudio(audio, state) {
    const fadeAudio = setInterval(() => {
        if (audio.volume < 0.9) {
            audio.volume += 0.01;
        } else {
            clearInterval(fadeAudio);
        }
    }, 10);
}

export function fadeOutAudio(audio, audioLow) {
    const fadeOutAudio = setInterval(() => {
        if (audio.volume > 0.02) {
            audio.volume -= 0.01;
        } else {
            audio.volume = 0;
            clearInterval(fadeOutAudio);
        }
    }, 10);
}
