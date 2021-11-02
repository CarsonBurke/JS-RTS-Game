// Default variables

let defaultStrength = 0.6
let defaultFadeAmount = 250
let defaultWaveSpeed = 1

let themes = {
    light: 'rgb(255, 255, 255, ',
    dark: 'rgb(0, 0, 0, '
}

// Add styles

addStyles()

function addStyles() {
    let styles = `

.waveButton {
    position: relative;
    overflow: hidden;
}

.wave {
    position: absolute;
    width: 0;
    height: 0;
    width: 0.1px;
    height: 0.1px;
    border-radius: 100%;
    margin: auto;
}
    `

    var styleSheet = document.createElement('style')
    styleSheet.innerHTML = styles
    document.head.appendChild(styleSheet)
}

let waveButtons = document.getElementsByClassName('waveButton')

window.addEventListener('load', addChanges)

function addChanges() {

    // Apply required changes to button

    for (let button of waveButtons) {

        button.addEventListener('mousedown', addWave)

        for (let child of button.childNodes) {

            if (child.style) {

                child.style.pointerEvents = 'none'
            }
        }
    }
}

async function addWave(e) {

    let button = e.target

    // Add wave

    let wave = document.createElement('div')

    wave.classList.add('wave')

    button.appendChild(wave)

    // Apply additional styling

    let x = e.clientX
    let y = e.clientY

    wave.style.left = x - button.getBoundingClientRect().left + 'px'

    wave.style.top = y - button.getBoundingClientRect().top + 'px'

    if (!button.dataset.waveFadeAmount) {

        button.dataset.waveFadeAmount = defaultFadeAmount
    }

    if (!button.dataset.waveStrength) {

        button.dataset.waveStrength = defaultStrength
    }

    if (!button.dataset.waveTime) {

        button.dataset.waveTime = defaultWaveSpeed
    }

    let theme

    switch (button.dataset.waveTheme) {
        case 'dark':

            theme = themes.dark

            break
        default:

            theme = themes.light
    }

    // Timer

    function waveTimer(multiplier) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve()
            }, button.dataset.waveTime * multiplier)
        })
    }

    // Transform wave

    let size = 0

    for (let i = 0; i < (button.dataset.waveTime * 100); i++) {

        size += button.offsetWidth / 100

        wave.style.boxShadow = theme + button.dataset.waveStrength + ') 0 0 0 ' + size + 'px'

        wave.style.opacity = 1 - i / button.dataset.waveFadeAmount

        await waveTimer(1)
    }

    wave.style.transition = 'opacity ' + button.dataset.waveTime / 5 + 's'

    wave.style.opacity = 0

    await waveTimer(200)

    // Delete wave

    wave.parentNode.removeChild(wave)
}