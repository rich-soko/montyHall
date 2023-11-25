'use strict';

// Selecting elements
// Prizes
const prize0El = document.getElementById('prize0');
const prize1El = document.getElementById('prize1');
const prize2El = document.getElementById('prize2');

// Doors
const allDoorBtns = document.querySelectorAll('.btn');
const btnDoor0El = document.getElementById('door0');
const btnDoor1El = document.getElementById('door1');
const btnDoor2El = document.getElementById('door2');

// Door borders
const border0El = document.getElementById('border0');
const border1El = document.getElementById('border1');
const border2El = document.getElementById('border2');

// Switch and Stick buttons
const btnSwitch = document.getElementById('switch');
const btnStick = document.getElementById('stick');

// Starting Conditions
let doorChosen;
let doorChosenHasPrize;
const whichDoorHasPrize = Math.trunc(Math.random() * 3);
const doorWithPrize = `door${whichDoorHasPrize}`;

const prizes = [prize0El, prize1El, prize2El];
const borders = [border0El, border1El, border2El];

// Assign the prize behind the door given by the random number generator
allDoorBtns.forEach(function (button) {
  if (button.id === doorWithPrize) {
    button.classList.add('has-prize');
    prizes[Number(button.id.charAt(4))].textContent = '€10,000';
  }
});

// Tracks which door is chosen by the player
const chooseDoor = function (door) {
  door.classList.add('chosen');
  doorChosen = Number(door.id.charAt(4));
  const borderToShow = borders[Number(door.id.charAt(4))];
  borderToShow.classList.toggle('hidden');
};

const disableAllDoorButtons = function () {
  allDoorBtns.forEach(function (button) {
    button.disabled = true;
  });
};

const openDoorWithoutPrize = function () {
  if (doorChosen === whichDoorHasPrize) {
    if (doorChosen === 0) {
      btnDoor1El.classList.add('hidden');
    } else {
      btnDoor0El.classList.add('hidden');
    }
  } else {
    allDoorBtns.forEach(function (button) {
      if (
        !(
          button.classList.contains('chosen') ||
          button.classList.contains('has-prize')
        )
      ) {
        button.classList.add('hidden');
      }
    });
  }
};

const revealWin = function () {
  if (doorChosen === whichDoorHasPrize) doorChosenHasPrize = true;
  if (doorChosenHasPrize) {
    console.log('You just won €10,000!');
  } else {
    console.log('Unlucky');
  }
  allDoorBtns.forEach(function (button) {
    button.classList.add('hidden');
  });
};

allDoorBtns.forEach(function (button) {
  button.addEventListener('click', function () {
    chooseDoor(button);
    disableAllDoorButtons();
    openDoorWithoutPrize();
  });
});

btnSwitch.addEventListener('click', function () {
  allDoorBtns.forEach(function (button) {
    if (button.classList.contains('chosen')) {
      button.classList.remove('chosen');
      button.classList.add('current');
      const borderToHide = borders[Number(button.id.charAt(4))];
      borderToHide.classList.toggle('hidden');
    }

    if (
      !(
        button.classList.contains('hidden') ||
        button.classList.contains('current')
      )
    ) {
      chooseDoor(button);
    }
  });
  revealWin();
});

btnStick.addEventListener('click', function () {
  revealWin();
});
