document.addEventListener('DOMContentLoaded', function () {
    var enterScreen = document.getElementById('enterScreen');
    var container = document.getElementById('documentContainer');
    var image = document.getElementById('documentImage');
    var audio1 = document.getElementById('scareAudio1');
    var audio2 = document.getElementById('scareAudio2');

    var increaseSizeInterval;

    function growImage() {
        var currentSize = 150; // starting scale %
        var maxSize = 400;     // max scale %
        var increaseRate = 6;  // % per tick

        clearInterval(increaseSizeInterval);
        increaseSizeInterval = setInterval(function () {
            if (currentSize < maxSize) {
                currentSize += increaseRate;
                image.style.transform = 'translate(-50%, -50%) scale(' + (currentSize / 100) + ')';
            } else {
                clearInterval(increaseSizeInterval);
            }
        }, 60);
    }

    function playSounds() {
        audio1.currentTime = 0;
        audio2.currentTime = 0;
        return Promise.all([audio1.play(), audio2.play()]);
    }

    function triggerJumpscare() {
        container.style.display = 'block';
        growImage();
    }

    // Try to autoplay with sound immediately on load.
    triggerJumpscare();
    playSounds().catch(function () {
        // Browser blocked audio autoplay - needs one tap/click to unlock sound.
        enterScreen.style.display = 'flex';
        enterScreen.textContent = 'Tap for sound';
        enterScreen.addEventListener('click', function () {
            enterScreen.style.display = 'none';
            playSounds().catch(function (e) { console.log('audio still blocked:', e); });
        }, { once: true });
    });
});
