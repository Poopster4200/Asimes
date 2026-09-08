document.addEventListener('DOMContentLoaded', function () {
    var enterScreen = document.getElementById('enterScreen');
    var container = document.getElementById('documentContainer');
    var image = document.getElementById('documentImage');
    var audio1 = document.getElementById('scareAudio1');
    var audio2 = document.getElementById('scareAudio2');

    var increaseSizeInterval;

    function triggerJumpscare() {
        container.style.display = 'block';

        // play both sounds together
        audio1.currentTime = 0;
        audio2.currentTime = 0;
        audio1.play().catch(function (e) { console.log('audio1 blocked:', e); });
        audio2.play().catch(function (e) { console.log('audio2 blocked:', e); });

        // gradually grow the image
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

    enterScreen.addEventListener('click', function () {
        enterScreen.style.display = 'none';
        triggerJumpscare();
    }, { once: true });
});
