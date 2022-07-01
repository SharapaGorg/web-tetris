window.space = window.space || {}

document.addEventListener('keydown', function(event) {
    let current = window.space.currentObject

    switch (event.keyCode) {
        case 37:
            current.setPosition(current.x - current.width, current.y)
            break
        case 38:
            console.log('top')
            break
        case 39:
            current.setPosition(current.x + current.width, current.y)
            break
        case 40:
            console.log('bottom')
            break
    }
});