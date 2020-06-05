document.addEventListener('DOMContentLoaded', function() {

    const squares = document.querySelectorAll('.grid div')

    let currentSnake = [2, 1, 0]
    let currentIndex = 0
    let direction = 1
    let interval = 10

    const setup = () => {



        currentSnake.forEach(index => squares[index].classList.add('snake'))


        setInterval(() => {

        }, interval);

    }

    const setupControllers = () => {

        const control = (e) => {
            squares[currentIndex].classList.remove('snake') //we are removing the class of snake from ALL the squares.

            if (e.keyCode === 39) {
                direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
            } else if (e.keyCode === 38) {
                direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
            } else if (e.keyCode === 37) {
                direction = -1 // if we press left, the snake will go left one div
            } else if (e.keyCode === 40) {
                direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
            }
        }

        document.addEventListener('keyup', control)
    }

    setup()

}, false);