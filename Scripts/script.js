// Переменные для обращения к html елементам 
var ms = document.getElementById('ms');
var second = document.getElementById('second');
var minute = document.getElementById('minute');
var balls = document.getElementsByClassName('ball')
var restart_button = document.querySelector('#reload')
var play_button = document.querySelector('#play')
var target_color = document.querySelector('#target_color')
var win_message = document.querySelector('.you_win')
var result = document.querySelector('.result')
var play_again = document.querySelector('.play_again')
var after_game = document.querySelector('.after_game')

// Переменные для таймера
var timer = 0;
var timerInterval;

// Список возможных цветов шариков
var colors = [
  'orange', 'blue', 'yellow', 'aquamarine',
  'purple', 'green', 'hotpink', 'orange', 
]

// Окрашивает шарики в рандомные цвета, по дефолту они создаютя одинаковыми
try{
  // Генерирует рандомное число
  let tr = Math.floor(Math.random() * (2 - 0) + 0)

  // В зависимости от его четности/нечетности будет использоваться первая/вторая половина списка
  // с цветами. То есть шары могут быть окрашены в два разных комплекта цветов
  if (tr==0){
    // Проходимся по всем шарам
    for (i in balls){
      // Данный шар окрашивается в рандомный цвет из выбранной части списка
      let randomIndex = Math.floor(Math.random() * (colors.length/2 - 0) + 0)
      balls[i].style.backgroundColor = colors[randomIndex]
    }
  } if (tr==1){
    for (i in balls){
      let randomIndex = Math.floor(Math.random() * (colors.length - 4) + 4)
      balls[i].style.backgroundColor = colors[randomIndex]
    }
  }  
}catch{TypeError}

// Все что происходит пока игра идет
function play(){
  // heading с инфой о игре меняет контент  
  document.querySelector('#heading').innerHTML = 'Порази все цели с указанным цветом:'
  target_color.style.display = 'flex'    // Пример показывается, какие шары поражать
  target_color.style.backgroundColor = balls[10].style.backgroundColor    // Цвет для поражения выбирается 

  // Таймер
  timerInterval = setInterval(function () {
    timer += 1 / 60;
    msVal = Math.floor((timer - Math.floor(timer)) * 100);
    secondVal = Math.floor(timer) - Math.floor(timer / 60) * 60;
    minuteVal = Math.floor(timer / 60);
    ms.innerHTML = msVal < 10 ? "0" + msVal.toString() : msVal;
    second.innerHTML = secondVal < 10 ? "0" + secondVal.toString() : secondVal;
    minute.innerHTML = minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal;
  }, 1000 / 60);

  // Просто добавляю EventListener на каждый шар
  try{
    for (i in balls){
      balls[i].addEventListener('click', cl)
    }
  }catch{TypeError}

  // Интервал которые проверяет наличие шаров с цветом на поражение. 
  check = setInterval(function(){
    // Кол-во шаров на данный момент с цельным цветом 
    var count = 0
    
    try{
      for (i in balls){
        if (balls[i].style.backgroundColor==target_color.style.backgroundColor){
          if (balls[i].style.display != 'none'){
            count += 1
          }
        }
      }
    }
    catch{TypeError}
    finally{
      // Игра заканчивается победой если шаров с таким цветом больше нет
      if (count==0){
        win()
      }
    }  
    }, 200)
}

// Функция для удаления шаров на которые кликнули 
function cl(el){
  // Проверяется цвет шарика на который кликнули. Если не правильный, проигрыш
  if (el.target.style.backgroundColor==target_color.style.backgroundColor){
    el.target.style.display = 'none'
  } else{
      lost()
  }
} 

// Все что происходит когда игрок победил. 
function win(){
  clearInterval(timerInterval)
  clearInterval(check)

  // Показываюся весь нужный контент, некоторый из которых был до этого невидим
  result.innerHTML += minute.innerHTML + ':' + second.innerHTML + ':' + ms.innerHTML
  result.style.display = 'block'
  play_again.style.display = 'block'
  after_game.style.height = '100vh'
  document.querySelector('.playGround').style.display = 'none'
  win_message.style.display = 'flex'
}

// Все что происходит когда игрок проиграл. 
function lost(){
  clearInterval(timerInterval)
  clearInterval(check)

  // Показываюся весь нужный контент, некоторый из которых был до этого невидим
  document.querySelector('.playGround').style.display = 'none'
  play_again.style.display = 'block'
  after_game.style.height = '100vh'
  win_message.style.display = 'flex'
  win_message.innerHTML = 'ПОРАЖЕНИЕ!'
}

// Перезапуск игры
function restart_game(){
  window.location.reload(true)
}

// Ивент листенеры на кнопки
restart_button.addEventListener('click', restart_game)
play_button.addEventListener('click', play)
play_again.addEventListener('click', restart_game)
