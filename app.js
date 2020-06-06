document.addEventListener('DOMContentLoaded', function() {

        const squares = document.querySelectorAll('.grid div')
        const scoreDisplay = document.querySelector('span')
        const startBtn = document.querySelector('.start')

        let currentSnake = [2, 1, 0]
        let currentIndex = 0
        let direction = 1

        let appleIndex = 0
        let interval = 10
        let speed = 0.9

        let score = 0

        let width = 10

        const startGame = () => {
            currentSnake.forEach(index => squares[index].classList.remove('snake'))
            squares[appleIndex].classList.remove('apple')


            score = 0
            scoreDisplay.innerText = score
            interval = 100
            currentSnake = [2, 1, 0]
            currentIndex = 0

            currentSnake.forEach(index => squares[index].classList.add('snake')) // clear grid

            setInterval(movimentController, interval);

        }

        const movimentController = () => {
            if (
                (currentSnake[0] + width >= (width * width) && direction == width) ||
                (currentSnake[0] % width === (width - 1) && direction == 1) ||
                (currentSnake[0] % width === 0 && direction == -1) ||
                (currentSnake[0] - width <= 0 && direction == -width)
            ) {
                return clearInterval(interval)
            }

            console.log('move')

            const tail = currentSnake.pop()
            squares[tail].classList.remove('snake')
            currentSnake.unshift(currentSnake[0] + direction)

            squares[currentSnake[0]].classList.add('snake')



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

            startBtn.addEventListener('click', startGame)
        }

        setupControllers()

        startGame()

    },
    false);