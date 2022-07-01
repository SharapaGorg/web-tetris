window.space = window.space || {}

let gamePlace = document.getElementById('gamePlace')
let spawnPlace = document.getElementById('spawnPlace')
let gamePoints = document.getElementById('points')

const gameCells = 5
const gameObjectSize = gamePlace.clientWidth / gameCells

spawnPlace.style.width = `${gamePlace.clientWidth}px`
spawnPlace.style.height = `${gameObjectSize}px`

let POINTS = 0

class Block {
    constructor(width, height, x, y) {
        // init position
        this.cell = 0
        this.row = 0
        // DOM object
        this.object = window.space.createElement("div", "game-object")
        // status
        this.moving = true
        this.object.setAttribute('id', 'main')
        window.space.currentObject = this
        // size
        this.height = height
        this.width = width
        // position
        this.x = x
        this.y = y
        // prepare object
        this.setSize(this.width, this.height)
        this.setPosition(this.x, this.y)
        // spawn object
        spawnPlace.appendChild(this.object)
    }

    setSize(width, height) {
        this.object.style.width = `${width}px`
        this.object.style.height = `${height}px`
    }

    setPosition(x, y) {
        // if not in gamePlace or object is already mounted
        if (x < 0 || x >= this.width * gameCells || !this.moving) {
            return
        }

        // is object gonna touch other objects or not
        let gonnaTouch = ((this.cell !== 0 && cells[this.cell - 1] < this.y && x < this.x)
            || (this.cell !== cells.length - 1 && cells[this.cell + 1] < this.y && x > this.x))

        this.object.style.transform = `translateX(${gonnaTouch ? this.x : x}px) translateY(${y}px)`

        this.cell = this.x / this.width

        this.x = gonnaTouch ? this.x : x
        this.y = y
    }

    setTransition(interval) {
        this.object.style.transition = `all ${interval}ms linear`
    }

    put() {
        this.moving = false
        this.object.removeAttribute('id')
    }
}

let cells = []

const delay = 7
const step = 1
const indent = 15

let distance = gamePlace.clientHeight + spawnPlace.clientHeight / 2 - indent

for (let i = 0; i < gameCells; i++) {
    cells.push(distance)
}

function spawnObject() {
    let block = new Block(gameObjectSize, gameObjectSize, 0, 0)

    block.setTransition(delay)

    let endTime = 0
    let time = 0;

    for (let i = 0; i <= distance; i += step) {
        setTimeout(() => {
            block.setPosition(block.x, i)

            if (cells[block.cell] <= i) {
                block.put()
            }

        }, delay * time)

        endTime += delay
        time++
    }

    setTimeout(() => {
        block.put()

        // register final position of block
        cells[block.cell] -= block.height

        if (window.space.areSame(cells) && cells[0] !== distance) {
            POINTS++
            gamePoints.textContent = POINTS.toString()
        }

        spawnObject()
    }, endTime)
}


// SPAWN
spawnObject()


