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
  
    sort() {
      let swapped;
      let current;
      let temp;
  
      if (!this.head) {
        return;
      }
  
      do {
        swapped = false;
        current = this.head;
  
        while (current.next) {
          if (current.data > current.next.data) {
            temp = current.data;
            current.data = current.next.data;
            current.next.data = temp;
            swapped = true;
          }
          current = current.next;
        }
      } while (swapped);
    }
  
    addToHead(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head = newNode;
      }
  
      this.size++;
    }
  
    addToSpecific(index,data){
      const newNode=new Node(data);
      let current=this.head;
      let count=0;
      while(count<index-1){
        current=current.next;
        count++;
      }
      newNode.next=current.next;
      current.next=newNode;
    }
  
    removeSpecific(index){
      let current=this.head;
      let temp;
      let count=0;
      while(count<index){
        temp=current;
        current=current.next;
        count++;
      }
      temp.next=current.next;
      current.next=null;
      this.size--;
    }
  
    removeHead() {
      if (!this.head) {
        return null;
      }
  
      this.head = this.head.next;
      this.size--;
  
    }
  
    removeTail(){
      if (!this.head) {
        return null;
      }
  
      let current = this.head;
      let previous = null;
  
      while (current.next) {
        previous = current;
        current = current.next;
      }
  
      if (previous) {
        previous.next = null;
      } else {
        this.head = null;
      }
  
      this.size--;
  
    }
  
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

  let list = [];
  let pointer = 0;
  let playPause = false;
  
  let linkedList = new LinkedList();
  
  let diameter = 50;
  let spacing = 25;
  let animationDuration = 700;
  let animationGap = 700;
  let animationTenure = 1000;
  let animationSpacing = 1800;
  let animationStartTime = 0;
  let calculated = false;
  let operationsButtons = false;
  let creatingList = false;
  let searchingList = false;
  let insertingElement = false;
  let insertHead = false;
  let insertTail = false;
  let insertAny = false;
  let removingElement = false;
  let removeHead = false;
  let removeTail = false;
  let removeAny = false;
  let showOperationButton,createListButton,emptyButton,userDefinedButton,randomButton,randomSortedButton,searchButton,insertButton,insertHeadButton,insertTailButton,insertAnyButton,playButton,pauseButton,revertButton,forwardButton,inputBox,submitButton,searchInputBox,searchSubmitButton,progressBarX, progressBarY;
  let listSize,searchNo;
  let uniqueVal;
  let currentElement = -1;
  let previousElement = -1;
  let isPlaying = false;
  let refreshingSearchRequired = false;
  let refreshingRequired = false;
  let userDefinedBox = false;
  let searchBox = false;
  let searchIndex = null;
  let currentStep = 0;
  let totalPausedTime=0;
  let addElement = null;
  let addIndex = null;
  let index = 0;
  let insertHeadCount=0;
  let insertTailCount=0;
  let removeHeadCount=-1;
  let removeTailCount=-1;
  let totalWidth,startX;
  let stepPointer=0;
  let stepFlag = false;
  let fixedStart=0;
  let fixedStartInsert=false;
  let fwdFlag=false;
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0,0,0);
    colorMode(HSB);
  
    showOperationButton = createButton('>');
    showOperationButton.position(0,height-200);
    showOperationButton.class('mainOperationButton');
    showOperationButton.mouseClicked(showOperations);
  
    createListButton = createButton('Create (A)');
    createListButton.position(showOperationButton.x + showOperationButton.width + 10, height - 204);
    createListButton.class('customButton');
    createListButton.hide();
    createListButton.mouseClicked(create);
  
    emptyButton = createButton('Empty');
    emptyButton.position(createListButton.x + createListButton.width + 75, createListButton.y);
    emptyButton.class('customButton');
    emptyButton.hide();
    emptyButton.mouseClicked(emptyList);
  
    userDefinedButton = createButton('User Defined List');
    userDefinedButton.position(emptyButton.x + emptyButton.width + 95, createListButton.y);
    userDefinedButton.class('customButtonLong');
    userDefinedButton.hide();
    userDefinedButton.mouseClicked(userDefinedList);
  
    randomButton = createButton('Random List');
    randomButton.position(userDefinedButton.x + userDefinedButton.width + 70, createListButton.y);
    randomButton.class('customButton');
    randomButton.hide();
    randomButton.mouseClicked(randomList);
  
    randomSortedButton = createButton('Random Sorted List');
    randomSortedButton.position(randomButton.x + randomButton.width + 60, createListButton.y);
    randomSortedButton.class('customButtonLong');
    randomSortedButton.hide();
    randomSortedButton.mouseClicked(randomSortedList);

    searchButton = createButton('Search');
    searchButton.position(createListButton.x, createListButton.y + createListButton.height + 18);
    searchButton.class('customButton');
    searchButton.hide();
    // searchButton.mouseClicked(searchList);
  
    // playButton = createButton('&#11208');
    // playButton.position((width/2)-125, height-30);
    // playButton.class('controlButton');
    // playButton.mouseClicked(playAnimation);
    // playButton.attribute('disabled', true);
  
    revertButton = createButton('&#11164&#11164');
    revertButton.position((width/2)-230, height-35);
    revertButton.class('controlButton');
    revertButton.mouseClicked(revertAnimation);
    // revertButton.attribute('disabled', true);
  
    pauseButton = createButton('&#10074&#10074');
    pauseButton.position(revertButton.x + revertButton.width - 2, revertButton.y);
    pauseButton.class('controlButton');
    pauseButton.mouseClicked(playPauseAnimation);
  
    forwardButton = createButton('&#11166&#11166');
    forwardButton.position(pauseButton.x + pauseButton.width - 2, pauseButton.y);
    forwardButton.class('controlButton');
    forwardButton.mouseClicked(forwardAnimation);
    // forwardButton.attribute('disabled', true);
  
    let progressBar = createDiv();
    progressBar.class('progressBar');
  
    
    let progressChild = createDiv();
    progressChild.class('progress');
  
    let progressText = createDiv();
    progressText.class('progressText');
  
    progressBar.child(progressChild);
    progressChild.child(progressText);
  
    progressBar.position(forwardButton.x + forwardButton.width - 2, forwardButton.y);
    
    progressBarX = forwardButton.x + forwardButton.width - 2;
    
    progressBarY = forwardButton.y;
    
    // progressText.position(progressBarX + 300 / 2, progressBarY + 23 / 2);
    // progressBar = updateProgressBar();
    // progressBar.position(removeAnyButton.x + removeAnyButton.width + 10, removeAnyButton.y);
  
    ellipseMode(CENTER);
  }
  
  function showOperations() {
    if(operationsButtons) {
      operationsButtons=false;
      insertingElement=false;
      removingElement=false;
      creatingList = false;
    }
    else if(!operationsButtons){
      operationsButtons=true;
    }
  }
  
  function create() {
    if (creatingList) {
      document.getElementById('algorithm-box').style.display = 'none';
      creatingList = false;
    }
    else if(!creatingList){
      document.getElementById('algorithm-box').style.display = 'none';
      insertingElement=false;
      removingElement=false;
      creatingList = true;
    }
  }
  
  function emptyList(){
    // randomButton.removeAttribute('disabled');
    // randomSortedButton.removeAttribute('disabled');
    // userDefinedButton.removeAttribute('disabled');
    console.log("Empty");
    background(0, 0, 0);
    listSize=0;
    linkedList = new LinkedList();
    calculated=false;
    searchNo=null;
    addElement=null;
    searchingList=false;
    insertHead=false;
    insertTail=false;
    insertAny=false;
    isPlaying=false;
    playPauseAnimation();
    document.getElementById('algorithm-box').style.display = 'none';
  }
  
  function userDefinedList(){
    pointer=null;
    document.getElementById('algorithm-box').style.display = 'none';
    // updateInsertHeadAlgorithm(20);
    inputBox = createInput('');
    inputBox.class('inputBox');
    inputBox.position(userDefinedButton.x + 7, searchButton.y + 10);
    // inputBox.input(addToList);
  
    submitButton = createButton('Go');
    submitButton.class('submitButton');
    submitButton.position(inputBox.x + 140, searchButton.y + 10);
    submitButton.mouseClicked(function() {
      if(refreshingRequired){
        emptyList();
      }
      // randomButton.attribute('disabled',true);
      // randomSortedButton.attribute('disabled',true);
      // userDefinedButton.attribute('disabled',true);
      if (inputBox.value() !== '') {
        let inputArray = inputBox.value().split(',');
        listSize=inputArray.length;
        list = [];
        totalWidth=(diameter * listSize) + (spacing * (listSize - 1));
        startX = (width - totalWidth) / 2;
        yAxis = (height / 2) - 100;
        for (let i = 0; i < inputArray.length; i++) {
          let num = parseInt(inputArray[i].trim());
          if (!isNaN(num)) {
            let tempList = [i,null,num,startX + i * (diameter + spacing),yAxis,0];
            list.push(tempList);
          }
        }
        fixedStart=0;
        pointer=0;
        animationStartTime = millis();
        playPause=true;
        refreshingRequired=true;
        isPlaying = true;
        calculated = true;
        inputBox.hide();
        submitButton.hide();
      }
    });
  }
  
  function randomList(){
    document.getElementById('algorithm-box').style.display = 'none';
    listSize = 0;
    pointer=null;
    listSize = prompt("Enter the size of the List intended.");
    if(listSize>15){
      alert("Enter size less than 15!");
    }
    if (listSize && !isNaN(listSize) && listSize<16) {
      if(refreshingRequired){
        let temporary = listSize;
        emptyList();
        listSize=temporary;
      }
      // randomButton.attribute('disabled',true);
      // randomSortedButton.attribute('disabled',true);
      // userDefinedButton.attribute('disabled',true);
    //   linkedList = new LinkedList();
      list = [];
      totalWidth=(diameter * listSize) + (spacing * (listSize - 1));
      startX = (width - totalWidth) / 2;
      yAxis = (height / 2) - 100;
      for (let i = 0; i < listSize; i++) {
        if(i==0){
            let tempList = [i,null,Math.floor(random(1, 100)),startX,yAxis,0];
            list.push(tempList);
        }
        else{
            let tempList = [i,null,Math.floor(random(1, 100)),startX + i * (diameter + spacing),yAxis,0];
            list.push(tempList);
        }
      }
      
      fixedStart=0;
      pointer=0;
      animationStartTime = millis();
      playPause=true;
      refreshingRequired=true;
      isPlaying = true;
      calculated = true;
    }
  }
  
  function randomSortedList(){
    pointer=null;
    document.getElementById('algorithm-box').style.display = 'none';
    // updateInsertHeadAlgorithm(20);
    listSize = 0;
    listSize = prompt("Enter the size of the List intended.");
    if (listSize && !isNaN(listSize)) {
      if(refreshingRequired){
        let temporary = listSize;
        emptyList();
        listSize=temporary;
      }
      // randomButton.attribute('disabled',true);
      // randomSortedButton.attribute('disabled',true);
      // userDefinedButton.attribute('disabled',true);
      list = [];
      totalWidth=(diameter * listSize) + (spacing * (listSize - 1));
      startX = (width - totalWidth) / 2;
      yAxis = (height / 2) - 100;
      let temporaryList = [];
      for(let i=0; i < listSize; i++){
        temporaryList.push(Math.floor(random(1, 100)));
      }

      temporaryList.sort();

      for (let i = 0; i < listSize; i++) {
        let tempList = [i,null,temporaryList[i],startX + i * (diameter + spacing),yAxis,0];
        list.push(tempList);
      }
      
      fixedStart=0;
      pointer=0;
      animationStartTime = millis();
      playPause=true;
      refreshingRequired=true;
      isPlaying = true;
      calculated = true;
    }  
  }
  
  // function playAnimation() {
    
  // }
  
  function playPauseAnimation() {
    if(playPause){
      pauseButton.html('&#11208');
      totalPausedTime = millis() - animationStartTime;
      isPlaying = false;
      playPause=false;
      // playButton.removeAttribute('disabled');
      // pauseButton.attribute('disabled', true);
      revertButton.removeAttribute('disabled');
      forwardButton.removeAttribute('disabled');
    }
    else if(!playPause){
      pauseButton.html('&#10074&#10074');
      isPlaying = true;
      playPause=true;
      animationStartTime = millis() - totalPausedTime;
      // playButton.attribute('disabled', true);
      // pauseButton.removeAttribute('disabled');
      revertButton.attribute('disabled', true);
      forwardButton.attribute('disabled', true);
    }
    
  }
  
  function forwardAnimation(){
    // fwdFlag=true;
    // playPauseAnimation();
    console.log("Forward..");
    pointer+=1;
    if(pointer==list.length){
        pointer-=1;
    }
    isPlaying=true;
  }
  
  function revertAnimation(){
    console.log("Reverting");
    pointer-=1;
    if(pointer<0){
      pointer+=1;
    }
    diminisher(pointer);
  }
  
  
  function drawArrow(startX, startY, endX, endY, arrowSize,progress) {
    let angle = atan2(endY - startY, endX - startX);
    let hypotenuse = dist(startX, startY, endX, endY);
    let hypotenuse2 = dist(list[pointer-1][3]+(diameter/2)+1, startY, endX, endY);
  
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
    let x4 = -hypotenuse2;

    // console.log("x1 "+x1+"y1 "+y1+"x2 "+x2+"y2"+y2+"x3 "+x3+"y3 "+y3+"x4 "+x4+"y4 "+y4+"x5 "+x5+"y5 "+y5);
  
    let arrowOpaq = 200;
  
    stroke(255, 255, 255,arrowOpaq);
  
    line(0, 0, x1, y1);
    line(x1, y1, x2, y2);
    line(x1, y1, x3, y3);
    line(x2, y2, x3, y3);
    line(x4, y1, x3, y1);
  
    pop();
  }
  
//   function updateProgressBar(progress){
//     let text=`${progress}%`;
//     const progressing = document.querySelector('.progress');
//     progressing.style.width = `${progress}%`;
//     const progressingText = document.querySelector('.progressText');
//     progressingText.textContent = text;
//   }

  function deploy(pointer){
    if(list[pointer][5]==0){
        list[pointer][1] = 0;
        let colorCode = decodeColor(0);
        fill(colorCode);
        ellipse(list[pointer][3], list[pointer][4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text(list[pointer][2], list[pointer][3], list[pointer][4]);
        stroke(200);
        if (pointer!==0) {
            let arrowStartX = list[pointer][3] - (diameter / 2);
            let arrowStartY = list[pointer][4];
            let arrowEndX = list[pointer][3] - (diameter / 2);
            let arrowEndY = list[pointer][4];
            drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
        }

        if (pointer===0) {
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          text("head/0", list[pointer][3], list[pointer][4]+(diameter/2)+20);
        }
        
        if (pointer===list.length-1) {
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          text(`tail/${pointer}`, list[pointer][3], list[pointer][4]+(diameter/2)+20);
        }
        if(playPause){
            isPlaying=false
            setTimeout(forwardAnimation,2000);
        }
        else{
            isPlaying=false;
        }
    }
  }

  function decodeColor(colorCode){
    if (colorCode==0){
        return 200;
    }
    if (colorCode==null){
        return (0,0,0);
    }
  }

  function diminisher(pointer){
    if(list[pointer][5]==0){
        list[pointer][1] = null;
        fill(0);
        noStroke();
        rect(list[pointer][3] + (diameter/2) + 1 , list[pointer][4] - (diameter / 2)-5, diameter+(spacing)+5, diameter*2);
    }
  }
  
  function draw() {
  
    if (creatingList) {
      if (searchInputBox) {
        searchInputBox.hide();
      }
      if (searchSubmitButton) {
        searchSubmitButton.hide();
      }
      emptyButton.show();
      userDefinedButton.show();
      randomButton.show();
      randomSortedButton.show();
    }
    
    else if (!creatingList) {
      if (inputBox) {
        inputBox.hide();
      }
      if (submitButton) {
        submitButton.hide();
      }
      emptyButton.hide();
      userDefinedButton.hide();
      randomButton.hide();
      randomSortedButton.hide();
    }
  
    if (operationsButtons) {
      createListButton.show();
      showOperationButton.html('<');
    }
  
    else if (!operationsButtons) {
      if (inputBox) {
        inputBox.hide();
      }
      if (submitButton) {
        submitButton.hide();
      }
      createListButton.hide();
      showOperationButton.html('>');
    }
  
    if (calculated && list.length>0 && isPlaying) {
    //   let current = linkedList.head;
    //   for (let i = 0; i < linkedList.size; i++) {
    //     let x = startX + i * (diameter + spacing);
    //     let y = (height / 2) - 100;
    //     let elapsedTime = millis() - animationStartTime;
    //     if (elapsedTime > animationGap*i) {
    //       let progress = constrain((elapsedTime - animationGap*i) / animationDuration,0,1);
    //       let animatedDiameter = lerp(0, diameter, progress);
  
    //       fill(200);
    //       ellipse(x, y, animatedDiameter, animatedDiameter);
    //       fill(0,0,0);
    //       textAlign(CENTER, CENTER);
    //       let textS = lerp(0,20,progress);
    //       textSize(textS);
    //       text(current.data, x, y);
    //       stroke(200);
    //       if ((i+1)!==linkedList.size) {
    //         let arrowStartX = x + (animatedDiameter / 2)+lerp(0, spacing, progress / 2);
    //         let arrowStartY = y;
    //         let arrowEndX = x + (animatedDiameter / 2) + lerp(0, spacing, progress / 2);
    //         let arrowEndY = y;
    //         drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, progress);
    //       }
  
    //       if (i===0) {
    //         textAlign(CENTER, CENTER);
    //         let textS = lerp(0,20,progress);
    //         textSize(textS);
    //         text("head/0", x, y+(diameter/2)+20);
    //       }
          
    //       if (i===linkedList.size-1) {
    //         textAlign(CENTER, CENTER);
    //         let textS = lerp(0,20,progress);
    //         textSize(textS);
    //         text(`tail/${i}`, x, y+(diameter/2)+20);
    //       }
    //     }
    //     current=current.next;
    //   }
    
    console.log(pointer);

    if(pointer==list.length){
        calculated=false;
        isPlaying=false;
    }
    else{
        deploy(pointer);
    }

    }


  
  }