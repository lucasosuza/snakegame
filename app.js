document.addEventListener('DOMContentLoaded', function() {

        const squares = document.querySelectorAll('.grid div')
        const scoreDisplay = document.querySelector('span')
        const startBtn = document.querySelector('.start')

        let currentSnake = [2, 1, 0]
        let currentIndex = 0
        let direction = 1

        let appleIndex = 5
        let interval = 100
        let intervalTime = 0
        let speed = 0.9

        let score = 0

        let width = 10

        const startGame = () => {
            // clear grid
            currentSnake.forEach(index => squares[index].classList.remove('snake'))
            squares[appleIndex].classList.remove('apple')

            // reset controllers
            score = 0
            scoreDisplay.innerText = score
            interval = 100
            currentSnake = [2, 1, 0]
            currentIndex = 0

            // add elements
            placeApple()
            currentSnake.forEach(index => squares[index].classList.add('snake'))
            squares[appleIndex].classList.add('apple')

            setInterval(movimentController, interval);
        }

        const placeApple = () => {
            do {
                appleIndex = Math.floor(Math.random() * squares.length)
                console.log(appleIndex)
            } while (squares[appleIndex].classList.contains('snake'))

            squares[appleIndex].classList.add('apple')

            console.log(appleIndex)
        }

        const movimentController = () => {
            if (
                (currentSnake[0] + width >= (width * width) && direction == width) ||
                (currentSnake[0] % width === (width - 1) && direction == 1) ||
                (currentSnake[0] % width === 0 && direction == -1) ||
                (currentSnake[0] - width <= 0 && direction == -width) ||
                squares[currentSnake[0] + direction].classList.contains('snake') // contains itself
            ) {
                return clearInterval(interval)
            }

            const tail = currentSnake.pop()
            squares[tail].classList.remove('snake')
            currentSnake.unshift(currentSnake[0] + direction)

            if (squares[currentSnake[0]].classList.contains('apple')) {
                squares[currentSnake[0]].classList.remove('apple')

                placeApple()
                score++
                scoreDisplay.innerText = score

                squares[tail].classList.add('snake')
                currentSnake.push(tail)

                intervalTime = interval * speed
                interval = setInterval(movimentController, intervalTime)

            }

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