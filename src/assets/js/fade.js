export function fadeInAudio(audio, targetVolume = 0.9, step = 0.01) {
    audio.volume = 0;
    audio.play();

    function fade() {
        if (audio.volume < targetVolume) {
            audio.volume = Math.min(audio.volume + step, targetVolume);
            requestAnimationFrame(fade);
        }
    }

    fade();
}

export function fadeOutAudio(audio, step = 0.01) {
    function fade() {
        if (audio.volume > step) {
            audio.volume = Math.max(audio.volume - step, 0);
            requestAnimationFrame(fade);
        } else {
            audio.volume = 0;
            audio.pause();
        }
    }

    fade();
}
