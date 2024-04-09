let linkedList = [];
let diameter = 50;
let spacing = 25;
let animationDuration = 700;
let animationGap = 700;
let animationTenure = 1000;
let animationSpacing = 1800;
let animationStartTime = 0;
let calculated = false;
let creatingList = false;
let searchingList = false;
let removingElement = false;
let removeHead = false;
let removeTail = false;
let removeAny = false;
let emptyButton,userDefinedButton,randomButton,randomSortedButton,searchButton,removeButton,removeHeadButton,removeTailButton,removeAnyButton,playButton,pauseButton,revertButton,forwardButton;
let listSize,searchNo;
let uniqueVal;
let previousElement = -1;
let isPlaying = false;
let currentStep = 0;
let totalPausedTime=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);
  colorMode(HSB);

  let createListButton = createButton('Create');
  createListButton.position(10, height - 150);
  createListButton.mouseClicked(create);

  emptyButton = createButton('Empty');
  emptyButton.position(createListButton.x + createListButton.width + 10, height - 150);
  emptyButton.hide();
  emptyButton.mouseClicked(emptyList);

  userDefinedButton = createButton('User Defined List');
  userDefinedButton.position(emptyButton.x + emptyButton.width + 10, height - 150);
  userDefinedButton.hide();
  userDefinedButton.mouseClicked(userDefinedList);

  randomButton = createButton('Random List');
  randomButton.position(userDefinedButton.x + userDefinedButton.width + 10, height - 150);
  randomButton.hide();
  randomButton.mouseClicked(randomList);

  randomSortedButton = createButton('Random Sorted List');
  randomSortedButton.position(randomButton.x + randomButton.width + 10, height - 150);
  randomSortedButton.hide();
  randomSortedButton.mouseClicked(randomSortedList);

  searchButton = createButton('Search');
  searchButton.position(createListButton.x, height - 100);
  searchButton.mouseClicked(searchList);

  removeButton = createButton('Remove');
  removeButton.position(searchButton.x, height - 50);
  removeButton.mouseClicked(removeElement);

  removeHeadButton = createButton('Remove Head');
  removeHeadButton.position(removeButton.x + removeButton.width + 10, height - 50);
  removeHeadButton.hide();
  removeHeadButton.mouseClicked(removeHeadElement);

  removeTailButton = createButton('Remove Tail');
  removeTailButton.position(removeHeadButton.x + removeHeadButton.width + 10, height - 50);
  removeTailButton.hide();
  removeTailButton.mouseClicked(removeTailElement);

  removeAnyButton = createButton('Remove Specific Element');
  removeAnyButton.position(removeTailButton.x + removeTailButton.width + 10, height - 50);
  removeAnyButton.hide();
  removeAnyButton.mouseClicked(removeAnyElement);

  playButton = createButton('Play');
  playButton.position(width-250, removeButton.y);
  playButton.mouseClicked(playAnimation);
  playButton.attribute('disabled', true);

  pauseButton = createButton('Pause');
  pauseButton.position(playButton.x + playButton.width + 10, playButton.y);
  pauseButton.mouseClicked(pauseAnimation);

  revertButton = createButton('Revert');
  revertButton.position(pauseButton.x + pauseButton.width + 10, playButton.y);
  // revertButton.mouseClicked(revertAnimation);
  revertButton.attribute('disabled', true);

  forwardButton = createButton('Forward');
  forwardButton.position(revertButton.x + revertButton.width + 10, playButton.y);
  // forwardButton.mouseClicked(forwardAnimation);
  forwardButton.attribute('disabled', true);

  ellipseMode(CENTER);
}

function create() {
  if (creatingList) {
    creatingList = false;
  }
  else if(!creatingList){
    creatingList = true;
  }
}

function emptyList(){
  console.log("Empty");
  background(0, 0, 0);
  listSize=0;
  linkedList=[];
  calculated=false;
  searchNo=null;
  searchingList=false;
  removeHead=false;
  removeTail=false;
  removeAny=false;
}

function userDefinedList(){
  let inputBox = createInput('');
  inputBox.position(userDefinedButton.x, height - 75);
  // inputBox.input(addToList);

  let submitButton = createButton('Submit');
  submitButton.position(inputBox.x + inputBox.width + 10, height - 75);
  submitButton.mouseClicked(function() {
    if (inputBox.value() !== '') {
      let inputArray = inputBox.value().split(',');
      uniqueVal = new Set();
      for (let i = 0; i < inputArray.length; i++) {
        let num = parseInt(inputArray[i].trim());
        if (!isNaN(num)) {
          uniqueVal.add(num);
          listSize++;
        }
      }
      linkedList = Array.from(uniqueVal);
      animationStartTime = millis();
      calculated = true;
      inputBox.hide();
      submitButton.hide();
    }
  });
}

// function addToList(){
//   let inputArray = this.value().split(',');
//   for (let i = 0; i < inputArray.length; i++) {
//     let num = parseInt(inputArray[i].trim());
//     if (!isNaN(num)) {
//       uniqueVal.add(num);
//       listSize++;
//     }
//   }
//   this.value('');
// }

function randomList(){
  listSize = 0;
  listSize = prompt("Enter the size of the List intended.");
  if(listSize>15){
    alert("Enter size less than 15!");
  }
  if (listSize && !isNaN(listSize) && listSize<16) {
    linkedList = [];
    uniqueVal = new Set();
    for (let i = 0; i < listSize; i++) {
      uniqueVal.add(Math.floor(random(1,100)));
    }
    linkedList = Array.from(uniqueVal);
    animationStartTime = millis();
    calculated = true;
  }
}

function randomSortedList(){
  listSize = 0;
  listSize = prompt("Enter the size of the List intended.");
  if (listSize && !isNaN(listSize)) {
    linkedList = [];
    uniqueVal = new Set();
    for (let i = 0; i < listSize; i++) {
      uniqueVal.add(Math.floor(random(1,100)));
    }
    linkedList = Array.from(uniqueVal);
    linkedList.sort((a,b) => a-b);
    animationStartTime = millis();
    calculated = true;
  }  
}

function searchList(){
  if (linkedList.length>0) {
    let inputBox = createInput('');
    inputBox.position(searchButton.x + searchButton.width + 10, searchButton.y);
    // inputBox.input(addToList);

    let submitButton = createButton('Submit');
    submitButton.position(inputBox.x + inputBox.width + 10, searchButton.y);
    submitButton.mouseClicked(function() {
      if (inputBox.value() !== '') {
        let num = parseInt(inputBox.value().trim());
        if(!isNaN(num)){
          searchNo = num;
          console.log(searchNo,typeof(searchNo));
          isPlaying = true;
          calculated = false;
          animationStartTime = millis();
          searchingList = true;
          inputBox.hide();
          submitButton.hide();
        }
      }
    });
  }
  else{
    alert("Please make a List First!");
  }
}

function playAnimation() {
  isPlaying = true;
  playButton.attribute('disabled', true);
  pauseButton.removeAttribute('disabled');
  // revertButton.attribute('disabled', true);
  // forwardButton.attribute('disabled', true);
  animationStartTime = millis() - totalPausedTime;
}

function pauseAnimation() {
  isPlaying = false;
  playButton.removeAttribute('disabled');
  pauseButton.attribute('disabled', true);
  // revertButton.removeAttribute('disabled');
  // forwardButton.removeAttribute('disabled');
  totalPausedTime = millis() - animationStartTime;
}

// function revertAnimation() {
//   if (currentStep > 0) {
//     currentStep--;
//     updateButtonsState();
//     isPlaying = true;
//     playAnimation();
//   }
// }

// function forwardAnimation() {
//   if (currentStep < linkedList.length) {
//     currentStep++;
//     updateButtonsState();
//     isPlaying = true;
//     playAnimation();
//   }
// }

// function updateButtonsState() {
//   if (currentStep === 0) {
//     revertButton.attribute('disabled', true);
//   } else {
//     revertButton.removeAttribute('disabled');
//   }

//   if (currentStep === linkedList.length) {
//     forwardButton.attribute('disabled', true);
//   } else {
//     forwardButton.removeAttribute('disabled');
//   }
// }

function removeElement(){
  if (removingElement) {
    removingElement = false;
  }
  else if(!removingElement){
    removingElement = true;
  }
}

function removeHeadElement(){
  
}

function removeTailElement(){

}

function removeAnyElement(){

}

function drawArrow(startX, startY, endX, endY, arrowSize,progress) {
  let angle = atan2(endY - startY, endX - startX);
  let hypotenuse = dist(startX, startY, endX, endY);

  push();
  translate(startX, startY);
  rotate(angle);

  let arrowWidth = lerp(0, arrowSize, progress);
  let arrowHeight = arrowWidth * 2;

  let x1 = hypotenuse;
  let y1 = 0;
  let x2 = hypotenuse - arrowWidth;
  let y2 = -arrowHeight / 2;
  let x3 = hypotenuse - arrowWidth;
  let y3 = arrowHeight / 2;

  let arrowOpaq = lerp(0,1,progress)*200;

  stroke(255, 255, 255, arrowOpaq);

  line(0, 0, x1, y1);
  line(x1, y1, x2, y2);
  line(x1, y1, x3, y3);
  line(x2, y2, x3, y3);

  pop();
}
let currentElement = -1;

function draw() {

  if (creatingList) {
    emptyButton.show();
    userDefinedButton.show();
    randomButton.show();
    randomSortedButton.show();
  }

  else if (!creatingList) {
    emptyButton.hide();
    userDefinedButton.hide();
    randomButton.hide();
    randomSortedButton.hide();
  }

  if (removingElement) {
    removeHeadButton.show();
    removeTailButton.show();
    removeAnyButton.show();
  }

  else if (!removingElement) {
    removeHeadButton.hide();
    removeTailButton.hide();
    removeAnyButton.hide();
  }

  let totalWidth = (diameter * linkedList.length) + (spacing * (linkedList.length - 1));
  let startX = (width - totalWidth) / 2;
  if (calculated && linkedList.length>0) {
    for (let i = 0; i < linkedList.length; i++) {
      let x = startX + i * (diameter + spacing);
      let y = (height / 2) - 100;
      let elapsedTime = millis() - animationStartTime;
      if (elapsedTime > animationGap*i) {
        let progress = constrain((elapsedTime - animationGap*i) / animationDuration,0,1);
        let animatedDiameter = lerp(0, diameter, progress);

        fill(200);
        ellipse(x, y, animatedDiameter, animatedDiameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = lerp(0,20,progress);
        textSize(textS);
        text(linkedList[i], x, y);
        if ((i+1)!==linkedList.length) {
          let arrowStartX = x + (animatedDiameter / 2)+lerp(0, spacing, progress / 2);
          let arrowStartY = y;
          let arrowEndX = x + (animatedDiameter / 2) + lerp(0, spacing, progress / 2);
          let arrowEndY = y;
          drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, progress);
        }

        if (i===0) {
          stroke(200);
          textAlign(CENTER, CENTER);
          let textS = lerp(0,20,progress);
          textSize(textS);
          text("head/0", x, y+(diameter/2)+20);
        }
        
        if (i===linkedList.length-1) {
          stroke(200);
          textAlign(CENTER, CENTER);
          let textS = lerp(0,20,progress);
          textSize(textS);
          text(`tail/${i}`, x, y+(diameter/2)+20);
        }
      }
    }
  }

  if(searchingList && isPlaying && currentStep < linkedList.length){
    let textSi,progress;
    let flag = false;
    for(let i=0;i<linkedList.length;i++){
      currentStep=i;
      let x = startX + i * (diameter + spacing);
        let y = (height / 2) - 100;
        let elapsedTime = millis() - animationStartTime;

        if (elapsedTime > animationSpacing*i) {
          currentElement=i;
          progress = constrain((elapsedTime - animationSpacing*i) / animationTenure,0,1);
          let animatedDiameter = lerp(0, diameter, progress);

          fill(51,100,72, 50);
          ellipse(x, y, animatedDiameter, animatedDiameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          textSize(20);
          text(linkedList[i], x, y);
          fill(51,100,72);
          textAlign(CENTER, CENTER);
          textSi = lerp(0,15,progress);
          textSize(textSi);
          if (i === currentElement) {
            if(i===0 || i===linkedList.length-1){
              text("temp/" + currentElement, x, y + (diameter / 2) + 50);
            }
            else{
              text("temp/" + currentElement, x, y + (diameter / 2) + 20);
            }
          }
        }


        if(linkedList[i]!==searchNo && elapsedTime > animationSpacing*i + animationTenure + 500){
          fill(0,100,67, 50);
          ellipse(x, y, diameter, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          textSize(20);
          text(linkedList[i], x, y);
          fill(0);
          noStroke();
          if(i===0 || i===linkedList.length-1){
            rect(x - diameter / 2, y + diameter / 2 + 40, lerp(0, diameter, progress), lerp(0, diameter, progress));
          }
          else{
            rect(x - diameter / 2, y + diameter / 2 + 10, lerp(0, diameter, progress), lerp(0, diameter, progress));
          }
          stroke(200);
        }

        if(linkedList[i]===searchNo && elapsedTime > animationSpacing*i + animationTenure + 500){
          console.log(`Number found at index = ${i}`);
          fill(126,96,91, 50);
          ellipse(x, y, diameter, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          textSize(20);
          text(linkedList[i], x, y);
          fill(126,96,91);
          textAlign(CENTER, CENTER);
          textSize(20);
          text("Found It!", x, y+(diameter/2)+50);
          flag=true;
          break;
        }

        else if(i+1===linkedList.length && elapsedTime > animationSpacing*i + animationTenure+500){
          stroke(0,100,67);
          textAlign(CENTER, CENTER);
          textSize(20);
          text("Not Found", x, y+(diameter/2)+50);
        }

        if(flag){
          break;
        }
    }
    previousElement=currentElement;
  }

  if(removeHead){

  }
}