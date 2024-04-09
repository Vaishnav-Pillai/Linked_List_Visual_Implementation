class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }
  
    append(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }
      this.size++;
    }
  
    // removeHead() {
    //   if (!this.head) {
    //     return null;
    //   }
    //   const removedData = this.head.data;
    //   this.head = this.head.next;
    //   if (!this.head) {
    //     this.tail = null;
    //   }
    //   this.size--;
    //   return removedData;
    // }
  
    // removeTail() {
    //   if (!this.head) {
    //     return null;
    //   }
    //   if (this.head === this.tail) {
    //     const removedData = this.head.data;
    //     this.head = null;
    //     this.tail = null;
    //     this.size--;
    //     return removedData;
    //   }
  
    //   let current = this.head;
    //   let previous = null;
    //   while (current.next) {
    //     previous = current;
    //     current = current.next;
    //   }
  
    //   const removedData = current.data;
    //   previous.next = null;
    //   this.tail = previous;
    //   this.size--;
    //   return removedData;
    // }
  
    // remove(data) {
    //   if (!this.head) {
    //     return null;
    //   }
    //   if (this.head.data === data) {
    //     return this.removeHead();
    //   }
  
    //   let current = this.head;
    //   let previous = null;
  
    //   while (current && current.data !== data) {
    //     previous = current;
    //     current = current.next;
    //   }
  
    //   if (!current) {
    //     return null;
    //   }
  
    //   previous.next = current.next;
    //   if (current === this.tail) {
    //     this.tail = previous;
    //   }
  
    //   this.size--;
    //   return current.data;
    // }
  
    search(data) {
      let current = this.head;
      while (current) {
        if (current.data === data) {
          return true;
        }
        current = current.next;
      }
      return false;
    }
  }
  
  let linkedList = new LinkedList();
  
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
  let currentElement = -1;
  let previousElement = -1;
  let isPlaying = false;
  let refreshingRequired = false;
  let searchIndex = 0;
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
    randomButton.removeAttribute('disabled');
    randomSortedButton.removeAttribute('disabled');
    userDefinedButton.removeAttribute('disabled');
    console.log("Empty");
    background(0, 0, 0);
    listSize=0;
    linkedList = new LinkedList();
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
      randomButton.attribute('disabled',true);
      randomSortedButton.attribute('disabled',true);
      userDefinedButton.attribute('disabled',true);
      if (inputBox.value() !== '') {
        let inputArray = inputBox.value().split(',');
        for (let i = 0; i < inputArray.length; i++) {
          let num = parseInt(inputArray[i].trim());
          if (!isNaN(num)) {
            linkedList.append(num);
            listSize++;
          }
        }
        animationStartTime = millis();
        isPlaying = true;
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
      randomButton.attribute('disabled',true);
      randomSortedButton.attribute('disabled',true);
      userDefinedButton.attribute('disabled',true);
      linkedList = new LinkedList();
      for (let i = 0; i < listSize; i++) {
        linkedList.append(Math.floor(random(1, 100)));
      }
      animationStartTime = millis();
      isPlaying = true;
      calculated = true;
    }
  }
  
  function randomSortedList(){
    listSize = 0;
    listSize = prompt("Enter the size of the List intended.");
    if (listSize && !isNaN(listSize)) {
      randomButton.attribute('disabled',true);
      randomSortedButton.attribute('disabled',true);
      userDefinedButton.attribute('disabled',true);
      linkedList = new LinkedList();
      for (let i = 0; i < listSize; i++) {
        linkedList.append(Math.floor(random(1, 100)));
      }
      linkedList.sort();
      animationStartTime = millis();
      isPlaying = true;
      calculated = true;
    }  
  }
  
  function refreshSearch(){
    // background(0, 0, 0);
    let array = [];
    let temporary = linkedList.head;
    while(temporary){
      array.push(temporary.data);
      temporary=temporary.next;
    }
    listSize=0;
    linkedList = new LinkedList();
    calculated=false;
    searchNo=null;
    searchingList=false;
    console.log("Empty");
    for(let i=0;i<array.length;i++){
      let num = parseInt(array[i]);
      if (!isNaN(num)) {
        linkedList.append(num);
        listSize++;
      }
    }
    console.log(linkedList);
    let current = linkedList.head;
    let flag = false;
    let totalWidth = (diameter * linkedList.size) + (spacing * (linkedList.size - 1));
    let startX = (width - totalWidth) / 2;
    for(let i=0;i<linkedList.size;i++){
      if(searchIndex===i){
        let x = startX + i * (diameter + spacing);
        let y = (height / 2) - 100;
        fill(0);
        noStroke();
        rect(x - (diameter / 2) - (spacing/2)-3 , y + diameter / 2 + 10, diameter+(2*spacing), diameter);
        stroke(200);
      }
    }
    for (let i = 0; i < linkedList.size; i++) {
      console.log("looping");
      let x = startX + i * (diameter + spacing);
      let y = (height / 2) - 100;
      fill(200);
      ellipse(x, y, diameter, diameter);
      fill(0,0,0);
      textAlign(CENTER, CENTER);
      let textS = 20;
      textSize(textS);
      text(current.data, x, y);
  
      if (i===0) {
        // fill(200);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text("head/0", x, y+(diameter/2)+20);
      }
      
      if (i===linkedList.size-1) {
        // fill(200);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text(`tail/${i}`, x, y+(diameter/2)+20);
      }
      current=current.next;
      if(!current){
        flag=true;
      }
    }
    if(flag){
      refreshingRequired=false;
      searchList();
    }
  }
  
  function searchList(){
    if (linkedList.size>0) {
      if(!refreshingRequired){
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
              refreshingRequired = true;
              animationStartTime = millis();
              searchingList = true;
              inputBox.hide();
              submitButton.hide();
            }
          }
        });
      }
      else{
        refreshSearch();
      }
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
  
    let arrowWidth,arrowHeight;
  
    if(progress=="NoProgress"){
      arrowWidth = arrowSize;
      arrowHeight = arrowWidth * 2;
    }
    else{
      arrowWidth = lerp(0, arrowSize, progress);
      arrowHeight = arrowWidth * 2;
    }
  
    // arrowWidth = lerp(0, arrowSize, progress);
    // arrowHeight = arrowWidth * 2;
  
    let x1 = hypotenuse;
    let y1 = 0;
    let x2 = hypotenuse - arrowWidth;
    let y2 = -arrowHeight / 2;
    let x3 = hypotenuse - arrowWidth;
    let y3 = arrowHeight / 2;
  
    // let arrowOpaq = lerp(0,1,progress)*200;
  
    stroke(255, 255, 255);
  
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);
    line(x1, y1, x3, y3);
    line(x2, y2, x3, y3);
  
    pop();
  }
  
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
  
    let totalWidth = (diameter * linkedList.size) + (spacing * (linkedList.size - 1));
    let startX = (width - totalWidth) / 2;
    if (calculated && linkedList.size>0 && isPlaying) {
      let current = linkedList.head;
      for (let i = 0; i < linkedList.size; i++) {
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
          text(current.data, x, y);
          if ((i+1)!==linkedList.size) {
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
          
          if (i===linkedList.size-1) {
            stroke(200);
            textAlign(CENTER, CENTER);
            let textS = lerp(0,20,progress);
            textSize(textS);
            text(`tail/${i}`, x, y+(diameter/2)+20);
          }
        }
        current=current.next;
      }
    }
  
    if(searchingList && isPlaying && currentStep < linkedList.size){
      let textSi,progress;
      let flag = false;
      let current = linkedList.head;
      for(let i=0;i<linkedList.size;i++){
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
            text(current.data, x, y);
            fill(51,100,72);
            textAlign(CENTER, CENTER);
            textSi = lerp(0,15,progress);
            textSize(textSi);
            if (i === currentElement) {
              if(i===0 || i===linkedList.size-1){
                text("temp/" + currentElement, x, y + (diameter / 2) + 50);
              }
              else{
                text("temp/" + currentElement, x, y + (diameter / 2) + 20);
              }
            }
          }
  
  
          if(current.data!==searchNo && elapsedTime > animationSpacing*i + animationTenure + 500){
            fill(0,100,67, 50);
            ellipse(x, y, diameter, diameter);
            fill(0,0,0);
            textAlign(CENTER, CENTER);
            textSize(20);
            text(current.data, x, y);
            fill(0);
            noStroke();
            if(i===0 || i===linkedList.size-1){
              rect(x - diameter / 2, y + diameter / 2 + 40, lerp(0, diameter, progress), lerp(0, diameter, progress));
            }
            else{
              rect(x - diameter / 2, y + diameter / 2 + 10, lerp(0, diameter, progress), lerp(0, diameter, progress));
            }
            stroke(200);
          }
  
          if(current.data===searchNo && elapsedTime > animationSpacing*i + animationTenure + 500){
            console.log(`Number found at index = ${i}`);
            searchIndex=i;
            fill(126,96,91, 50);
            ellipse(x, y, diameter, diameter);
            fill(0,0,0);
            textAlign(CENTER, CENTER);
            textSize(20);
            text(current.data, x, y);
            fill(126,96,91);
            textAlign(CENTER, CENTER);
            textSize(20);
            text("Found It!", x, y+(diameter/2)+50);
            flag=true;
            break;
          }
  
          else if(i+1===linkedList.size && elapsedTime > animationSpacing*i + animationTenure+500){
            stroke(0,100,67);
            textAlign(CENTER, CENTER);
            textSize(20);
            text("Not Found", x, y+(diameter/2)+50);
          }
  
          if(flag){
            break;
          }
          current=current.next;
      }
      previousElement=currentElement;
    }
  
    if(removeHead){
  
    }
  }