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
  
    // insertHead() {
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
  
    // insertTail() {
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
    //     return this.insertHead();
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
  let insertingElement = false;
  let insertHead = false;
  let insertTail = false;
  let insertAny = false;
  let emptyButton,userDefinedButton,randomButton,randomSortedButton,searchButton,insertButton,insertHeadButton,insertTailButton,insertAnyButton,playButton,pauseButton,revertButton,forwardButton,inputBox,submitButton;
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
  let insertSpecificCount=0;
  let totalWidth,startX;
  let fixedStart=0;
  
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
  
    insertButton = createButton('Insert');
    insertButton.position(searchButton.x, height - 50);
    insertButton.mouseClicked(insertElement);
  
    insertHeadButton = createButton('Insert Head');
    insertHeadButton.position(insertButton.x + insertButton.width + 10, height - 50);
    insertHeadButton.hide();
    insertHeadButton.mouseClicked(insertHeadElement);
  
    insertTailButton = createButton('Insert Tail');
    insertTailButton.position(insertHeadButton.x + insertHeadButton.width + 10, height - 50);
    insertTailButton.hide();
    insertTailButton.mouseClicked(insertTailElement);
  
    insertAnyButton = createButton('Insert Specific Element');
    insertAnyButton.position(insertTailButton.x + insertTailButton.width + 10, height - 50);
    insertAnyButton.hide();
    insertAnyButton.mouseClicked(insertAnyElement);
  
    playButton = createButton('Play');
    playButton.position(width-250, insertButton.y);
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
  }
  
  function userDefinedList(){
    document.getElementById('algorithm-box').style.display = 'none';
    updateInsertHeadAlgorithm(20);
    inputBox = createInput('');
    inputBox.position(userDefinedButton.x, height - 125);
    // inputBox.input(addToList);
  
    submitButton = createButton('Submit');
    submitButton.position(inputBox.x + inputBox.width + 10, height - 125);
    submitButton.mouseClicked(function() {
      if(refreshingRequired){
        emptyList();
      }
      // randomButton.attribute('disabled',true);
      // randomSortedButton.attribute('disabled',true);
      // userDefinedButton.attribute('disabled',true);
      if (inputBox.value() !== '') {
        let inputArray = inputBox.value().split(',');
        for (let i = 0; i < inputArray.length; i++) {
          let num = parseInt(inputArray[i].trim());
          if (!isNaN(num)) {
            linkedList.append(num);
            listSize++;
          }
        }
        totalWidth=(diameter * linkedList.size) + (spacing * (linkedList.size - 1));
        startX = (width - totalWidth) / 2;
        fixedStart=0;
        animationStartTime = millis();
        isPlaying = true;
        calculated = true;
        refreshingRequired=true;
        inputBox.hide();
        submitButton.hide();
      }
    });
  }
  
  function randomList(){
    document.getElementById('algorithm-box').style.display = 'none';
    updateInsertHeadAlgorithm(20);
    listSize = 0;
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
      linkedList = new LinkedList();
      for (let i = 0; i < listSize; i++) {
        linkedList.append(Math.floor(random(1, 100)));
      }
      totalWidth=(diameter * linkedList.size) + (spacing * (linkedList.size - 1));
      startX = (width - totalWidth) / 2;
      fixedStart=0;
      animationStartTime = millis();
      refreshingRequired=true;
      isPlaying = true;
      calculated = true;
    }
  }
  
  function randomSortedList(){
    document.getElementById('algorithm-box').style.display = 'none';
    updateInsertHeadAlgorithm(20);
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
      linkedList = new LinkedList();
      for (let i = 0; i < listSize; i++) {
        linkedList.append(Math.floor(random(1, 100)));
      }
      linkedList.sort();
      totalWidth=(diameter * linkedList.size) + (spacing * (linkedList.size - 1));
      startX = (width - totalWidth) / 2;
      fixedStart=0;
      animationStartTime = millis();
      refreshingRequired
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
    let size = linkedList.size;
    let flag = false;
    for(let i=0;i<linkedList.size;i++){
      console.log(searchIndex);
      if(fixedStart===0){
        fixedStart=startX;
      }
      let x = fixedStart + i * (diameter + spacing);
      let y = (height / 2) - 100;
      if(searchIndex===i){
        console.log("Found");
        searchIndex=null;
        fill(0);
        noStroke();
        if(i+1===size || i===0){
          rect(x - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 40, diameter+(2*spacing), diameter);
        }
        else{
          rect(x - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 10, diameter+(2*spacing), diameter);
        }
        stroke(200);
        break;
      }
      else if(size===i+1){
        console.log("Not there");
        fill(0);
        noStroke();
        rect(x - (diameter / 2) - (spacing/2)-13 , y + diameter / 2 + 30, diameter+(2*spacing), diameter);
        stroke(200);
      }
    }
    for (let i = 0; i < linkedList.size; i++) {
      console.log("looping");
      if(fixedStart===0){
        fixedStart=startX;
      }
      let x = fixedStart + i * (diameter + spacing);
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
      refreshingSearchRequired=false;
      if(index===1){
        searchList();
      }
      else if(index===2){
        insertHeadElement();
      }
      else if(index===3){
        insertTailElement();
      }
      else if(index===4){
        insertAnyElement();
      }
    }
  }
  
  function searchList(){
    if (linkedList.size>0) {
      if(!refreshingSearchRequired){
        inputBox = createInput('');
        inputBox.position(searchButton.x + searchButton.width + 10, searchButton.y);
        // inputBox.input(addToList);
  
        document.getElementById('algorithm-box').style.display = 'block';
        updateSearchAlgorithm(20);
  
        submitButton = createButton('Submit');
        submitButton.position(inputBox.x + inputBox.width + 10, searchButton.y);
        submitButton.mouseClicked(function() {
          if (inputBox.value() !== '') {
            let num = parseInt(inputBox.value().trim());
            if(!isNaN(num)){
              searchNo = num;
              console.log(searchNo,typeof(searchNo));
              isPlaying = true;
              calculated = false;
              refreshingSearchRequired = true;
              animationStartTime = millis();
              searchingList = true;
              inputBox.hide();
              submitButton.hide();
            }
          }
        });
      }
      else{
        index=1;
        refreshSearch();
      }
    }
    else{
      alert("Please make a List First!");
    }
  }
  
  
  function updateSearchAlgorithm(step){
    const algorithmBox = document.getElementById('algorithm-box');
    if(algorithmBox && algorithmBox instanceof HTMLElement){
      const algorithmSteps = [
        "index = 0, temp = head",
        "while (temp.data != value)",
        "    index++, temp = temp.next",
        "    if temp == null",
        "       return NOT_FOUND",
        "return index"
      ];
      console.log(algorithmSteps);
      algorithmBox.innerHTML='';
    
      for(let i=0;i<algorithmSteps.length;i++){
        const stepText = algorithmSteps[i];
        const stepElement = document.createElement('div');
        stepElement.textContent=stepText;
    
        if(i===step){
          stepElement.classList.add('highlight');
        }
    
        algorithmBox.appendChild(stepElement);
      }
    }
  }
  
  function updateInsertHeadAlgorithm(step){
    const algorithmBox = document.getElementById('algorithm-box');
    if(algorithmBox && algorithmBox instanceof HTMLElement){
      const algorithmSteps = [
        "Vertex vtx = new Vertex(v)",
        "vtx.next = head",
        "head = vtx"
      ];
      console.log(algorithmSteps);
      algorithmBox.innerHTML='';
    
      for(let i=0;i<algorithmSteps.length;i++){
        const stepText = algorithmSteps[i];
        const stepElement = document.createElement('div');
        stepElement.textContent=stepText;
    
        if(i===step){
          stepElement.classList.add('highlight');
        }
    
        algorithmBox.appendChild(stepElement);
      }
    }
  }
  
  function updateInsertTailAlgorithm(step){
    const algorithmBox = document.getElementById('algorithm-box');
    if(algorithmBox && algorithmBox instanceof HTMLElement){
      const algorithmSteps = [
        "Vertex vtx = new Vertex(v)",
        "tail.next = vtx",
        "tail = vtx"
      ];
      console.log(algorithmSteps);
      algorithmBox.innerHTML='';
    
      for(let i=0;i<algorithmSteps.length;i++){
        const stepText = algorithmSteps[i];
        const stepElement = document.createElement('div');
        stepElement.textContent=stepText;
    
        if(i===step){
          stepElement.classList.add('highlight');
        }
    
        algorithmBox.appendChild(stepElement);
      }
    }
  }
  
  function updateInsertAnyAlgorithm(step){
    const algorithmBox = document.getElementById('algorithm-box');
    if(algorithmBox && algorithmBox instanceof HTMLElement){
      const algorithmSteps = [
        "Vertex temp = head",
        "for (k = 0; k < i-1; k++)",
        "   temp = temp.next",
        "Vertex vtx = new Vertex(v)",
        "vtx.next = temp.next",
        "temp.next = vtx"
      ];
      console.log(algorithmSteps);
      algorithmBox.innerHTML='';
    
      for(let i=0;i<algorithmSteps.length;i++){
        const stepText = algorithmSteps[i];
        const stepElement = document.createElement('div');
        stepElement.textContent=stepText;
    
        if(i===step){
          stepElement.classList.add('highlight');
        }
    
        algorithmBox.appendChild(stepElement);
      }
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
  
  function insertElement(){
    if (insertingElement) {
      document.getElementById('algorithm-box').style.display = 'none';
      insertingElement = false;
    }
    else if(!insertingElement){
      document.getElementById('algorithm-box').style.display = 'block';
      insertingElement = true;
    }
  }
  
  function insertHeadElement(){
    if(!refreshingSearchRequired){
      addElement = null;
      document.getElementById('algorithm-box').style.display = 'block';
      updateInsertHeadAlgorithm(20);
      let element = prompt("Enter the element to be added to List Head.");
      if (element && !isNaN(element)) {
        addElement=element;
        refreshingSearchRequired=true;
        insertHeadCount++;
        insertHead=true;
        isPlaying = true;
        animationStartTime = millis();
        calculated = false;
      }
    }
    else{
      index=2;
      refreshSearch();
    }
  }
  
  function insertTailElement(){
    if(!refreshingSearchRequired){
      document.getElementById('algorithm-box').style.display = 'block';
      updateInsertTailAlgorithm(20);
      addElement = null;
      let element = prompt("Enter the element to be added to List Tail.");
      if (element && !isNaN(element)) {
        addElement=element;
        insertTailCount++;
        insertTail=true;
        isPlaying = true;
        animationStartTime = millis();
        calculated = false;
      }
    }
    else{
      index=3;
      refreshSearch();
    }
  }
  
  function insertAnyElement(){
    if(!refreshingSearchRequired){
      addElement = null;
      addIndex = null;
      let index = prompt("Enter the index of the List Data.");
      let element = prompt("Enter the element to be added to List.");
      if (element && index && !isNaN(element) && !isNaN(index)) {
        if(index===0 || index>(linkedList.size-2)){
          alert("Enter the value between head and tail!");
          calculated = false;
        }
        else{
          addElement=element;
          addIndex=index;
          insertTailCount++;
          insertAny=true;
          isPlaying = true;
          animationStartTime = millis();
          calculated = false;
        }
      }
    }
    else{
      index=4;
      refreshSearch();
    }
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
  
    let arrowOpaq = lerp(0,1,progress)*200;
  
    stroke(255, 255, 255,arrowOpaq);
  
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
  
    if (insertingElement) {
      insertHeadButton.show();
      insertTailButton.show();
      insertAnyButton.show();
    }
  
    else if (!insertingElement) {
      insertHeadButton.hide();
      insertTailButton.hide();
      insertAnyButton.hide();
    }
  
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
          stroke(200);
          if ((i+1)!==linkedList.size) {
            let arrowStartX = x + (animatedDiameter / 2)+lerp(0, spacing, progress / 2);
            let arrowStartY = y;
            let arrowEndX = x + (animatedDiameter / 2) + lerp(0, spacing, progress / 2);
            let arrowEndY = y;
            drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, progress);
          }
  
          if (i===0) {
            textAlign(CENTER, CENTER);
            let textS = lerp(0,20,progress);
            textSize(textS);
            text("head/0", x, y+(diameter/2)+20);
          }
          
          if (i===linkedList.size-1) {
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
      updateSearchAlgorithm(0);
      let textSi,progress;
      let flag = false;
      let current = linkedList.head;
      for(let i=0;i<linkedList.size;i++){
        currentStep=i;
        if(fixedStart===0){
          fixedStart=startX;
        }
        let x = fixedStart + i * (diameter + spacing);
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
              if(i===0){
                updateSearchAlgorithm(0);
                text("temp/" + currentElement, x, y + (diameter / 2) + 50);
              }
              else if(i===linkedList.size-1){
                updateSearchAlgorithm(1);
                text("temp/" + currentElement, x, y + (diameter / 2) + 50);
              }
              else{
                updateSearchAlgorithm(1);
                text("temp/" + currentElement, x, y + (diameter / 2) + 20);
              }
            }
          }
  
  
          if(current.data!==searchNo && elapsedTime > animationSpacing*i + animationTenure + 500){
            updateSearchAlgorithm(2);
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
            updateSearchAlgorithm(5);
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
            if(i+1===linkedList.size || i===0){
              text("Found It!", x, y+(diameter/2)+80);
            }
            else{
              text("Found It!", x, y+(diameter/2)+50);
            }
            flag=true;
            break;
          }
  
          else if(i+1===linkedList.size && elapsedTime > animationSpacing*i + animationTenure+500){
            updateSearchAlgorithm(3);
            stroke(0,100,67);
            textAlign(CENTER, CENTER);
            textSize(20);
            text("Not Found", x, y+(diameter/2)+50);
            updateSearchAlgorithm(4);
          }
  
          if(flag){
            break;
          }
          current=current.next;
      }
      previousElement=currentElement;
    }
  
    if(insertHead && linkedList.size>0 && isPlaying){
      fixedStart=startX-insertHeadCount*(diameter+spacing);
      let current = linkedList.head;
      let x = fixedStart;
      let y = (height / 2) - 100;
      let elapsedTime = millis() - animationStartTime;
      if (elapsedTime > 0) {
        updateInsertHeadAlgorithm(0);
        let progress = constrain((elapsedTime - 0) / animationDuration,0,1);
        let animatedDiameter = lerp(0, diameter, progress);
        fill(200);
        ellipse(x, y, animatedDiameter, animatedDiameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = lerp(0,20,progress);
        textSize(textS);
        text(addElement, x, y);
        let arrowStartX = x + (animatedDiameter / 2)+lerp(0, spacing, progress / 2);
        let arrowStartY = y;
        let arrowEndX = x + (animatedDiameter / 2) + lerp(0, spacing, progress / 2);
        let arrowEndY = y;
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, progress);
  
        fill(51,100,72);
        textAlign(CENTER, CENTER);
        let textSi = lerp(0,15,progress);
        textSize(textSi);
        text("temp/0", x, y + (diameter / 2) + 20);
        stroke(200);
  
        // let length = linkedList.length+1;
  
        if(elapsedTime > animationTenure+300){
          updateInsertHeadAlgorithm(1);
          for(let i=0;i<linkedList.size+1;i++){
            let x = fixedStart + i * (diameter + spacing);
            let y = (height / 2) - 100;
            fill(0);
            noStroke();
            rect(x - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 5, diameter+(2*spacing), diameter);
            stroke(200);
            if(i===linkedList.size){
              stroke(200);
              strokeWeight(3);
              textAlign(CENTER, CENTER);
              let textSi = lerp(0,20,progress);
              textSize(textSi);
              text("tail/"+linkedList.size, x, y+(diameter/2)+20);
            }
          }
        }
  
        if(elapsedTime > animationSpacing+100){
          updateInsertHeadAlgorithm(2);
          linkedList.addToHead(addElement);
          stroke(200);
          strokeWeight(3);
          textAlign(CENTER, CENTER);
          let textSi = lerp(0,20,progress);
          textSize(textSi);
          text("head/0", x, y+(diameter/2)+20);
          console.log(linkedList);
          index=10;
          refreshSearch();
          insertHead=false;
        }
  
        // if(elapsedTime > animationSpacing+100){
          
        // }
      }
  
      // for(let i=0;i<1;i++){
      //   let x = startX + i * (diameter + spacing);
      //   let y = (height / 2) - 100;
      //   fill(0);
      //   noStroke();
      //   rect(x - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 10, diameter+(2*spacing), diameter);
      //   stroke(200);
      // }
      // textAlign(CENTER, CENTER);
      // let textS = 20;
      // textSize(textS);
      // text("head/0", startX, ((height / 2) - 100)+(diameter/2)+20);
    }
  
    if(insertTail && linkedList.size>0 && isPlaying){
      let current = linkedList.head;
      while(current.next){
        current=current.next;
      }
      if(fixedStart===0){
        fixedStart=startX;
      }
      let x = fixedStart + (linkedList.size-1)*(diameter+spacing);
      let y = (height / 2) - 100;
      let elapsedTime = millis() - animationStartTime;
      if (elapsedTime > 0) {
        updateInsertTailAlgorithm(0);
        let progress = constrain((elapsedTime - 0) / animationDuration,0,1);
        let animatedDiameter = lerp(0, diameter, progress);
        fill(200);
        ellipse(x, y, diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text(current.data, x, y);
        let arrowStartX = x + (animatedDiameter / 2)+lerp(0, spacing, progress / 2);
        let arrowStartY = y;
        let arrowEndX = x + (animatedDiameter / 2) + lerp(0, spacing, progress / 2);
        let arrowEndY = y;
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, progress);
  
        fill(200);
        ellipse(x+(diameter+spacing), y, animatedDiameter, animatedDiameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textSi = lerp(0,20,progress);
        textSize(textSi);
        text(addElement, x+(diameter+spacing), y);
  
        fill(51,100,72);
        textAlign(CENTER, CENTER);
        let textSiz = lerp(0,15,progress);
        textSize(textSiz);
        text("temp/0", x+(diameter+spacing), y + (diameter / 2) + 20);
        stroke(200);
  
        if(elapsedTime > animationTenure+300){
          updateInsertTailAlgorithm(1);
          for(let i=1;i<linkedList.size+1;i++){
            let x = fixedStart + i * (diameter + spacing);
            let y = (height / 2) - 100;
            fill(0);
            noStroke();
            rect(x - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 5, diameter+(2*spacing), diameter);
            stroke(200);
          }
        }
  
        if(elapsedTime > animationSpacing+100){
          updateInsertTailAlgorithm(2);
          linkedList.append(addElement);
          stroke(200);
          strokeWeight(3);
          textAlign(CENTER, CENTER);
          let textSi = lerp(0,20,progress);
          textSize(textSi);
          text("tail/"+linkedList.size, x+(diameter+spacing), y+(diameter/2)+20);
          console.log(linkedList);
          index=10;
          refreshSearch();
          insertTail=false;
        }
  
        // if(elapsedTime > animationSpacing+100){
          
        // }
      }
    }
  
    if(insertAny && linkedList.size>0 && isPlaying){
      console.log(linkedList.head);
      let current = linkedList.head;
      let size = linkedList.size;
      console.log(size);
      let i = 0;
      let insertion = false;
      let indexElement = false;
      let elapsedTime = millis() - animationStartTime;
  
      while(i<linkedList.size){
        console.log(current);
        currentStep=i;
        if(fixedStart===0){
          fixedStart=startX;
        }
        let x = fixedStart + i * (diameter + spacing);
        let y = (height / 2) - 100;
  
        if (elapsedTime > animationSpacing*i) {
          currentElement=i;
          progress = constrain((elapsedTime - animationSpacing*i) / animationTenure,0,1);
          let animatedDiameter = lerp(0, diameter, progress);
          
          fill(51,100,72);
          textAlign(CENTER, CENTER);
          let textSi = lerp(0,15,progress);
          textSize(textSi);
          if (i === currentElement && i<addIndex) {
            if(i===0 || i===linkedList.size-1){
              updateInsertAnyAlgorithm(0);
              text("temp/" + currentElement, x, y + (diameter / 2) + 50);
            }
            else{
              updateInsertAnyAlgorithm(1);
              text("temp/" + currentElement, x, y + (diameter / 2) + 20);
            }
          }
  
          if(i===addIndex-1){
            console.log("Drawing...");
  
            updateInsertAnyAlgorithm(3);
  
            if(fixedStart===0){
              fixedStart=startX;
            }
            let x = fixedStart + addIndex*(diameter+spacing);
            let y = (height / 2) - 100;
            let progress = constrain((elapsedTime - animationSpacing*i) / animationDuration,0,1);
            let animatedDiameter = lerp(0, diameter, progress);
            fill(200);
            ellipse(x, y+100, animatedDiameter, animatedDiameter);
            fill(0,0,0);
            textAlign(CENTER, CENTER);
            let textS = lerp(0, 20, progress);
            textSize(textS);
            text(addElement, x, y+100);
            // let arrowStartX = x + (animatedDiameter / 2)+lerp(0, spacing, progress / 2);
            // let arrowStartY = y+100;
            // let arrowEndX = x + (animatedDiameter / 2) + lerp(0, spacing, progress / 2);
            // let arrowEndY = y+100;
            // drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, progress);
      
            // fill(200);
              // ellipse(x+(diameter+spacing), y, animatedDiameter, animatedDiameter);
              // fill(0,0,0);
              // textAlign(CENTER, CENTER);
              // let textSi = lerp(0,20,progress);
              // textSize(textSi);
              // text(addElement, x+(diameter+spacing), y);
        
              // fill(51,100,72);
              // textAlign(CENTER, CENTER);
              // let textSiz = lerp(0,15,progress);
              // textSize(textSiz);
              // text("temp/0", x+(diameter+spacing), y + (diameter / 2) + 20);
              // stroke(200);
        
              // if(elapsedTime > animationTenure+300){
              //   for(let i=1;i<linkedList.size+1;i++){
              //     let x = fixedStart + i * (diameter + spacing);
              //     let y = (height / 2) - 100;
              //     fill(0);
              //     noStroke();
              //     rect(x - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 5, diameter+(2*spacing), diameter);
              //     stroke(200);
              //   }
              // }
        
              // if(elapsedTime > animationSpacing+100){
              //   linkedList.append(addElement);
              //   stroke(200);
              //   strokeWeight(3);
              //   textAlign(CENTER, CENTER);
              //   let textSi = lerp(0,20,progress);
              //   textSize(textSi);
              //   text("tail/"+linkedList.size, x+(diameter+spacing), y+(diameter/2)+20);
              //   console.log(linkedList);
              //   insertTail=false;
              // }
        
              // if(elapsedTime > animationSpacing+100){
                
            // }
  
            insertion=true;
            
          }
  
          if(insertion===true && elapsedTime>(animationSpacing*(addIndex-1))+animationSpacing){
            for(let i=addIndex;i<linkedList.size;i++){
              console.log("Clearing Extra");
              let datapointX = fixedStart + i * (diameter + spacing);
              let datapointY = (height / 2) - 100;
              fill(0);
              noStroke();
              if(i+1===size || i===0){
                rect(datapointX - (diameter / 2) - (spacing/2) , datapointY - (diameter / 2) - 5, diameter+(spacing)+5, diameter*2);
              }
              else{
                rect(datapointX - (diameter / 2) - (spacing/2) , datapointY - (diameter / 2) - 5, diameter+(spacing)+5, diameter*2);
              }
              stroke(200);
            }
            insertion=false;
            indexElement=true;
          }
  
          if(i>(addIndex-1)){
            console.log("Create...");
            updateInsertAnyAlgorithm(5);
            let updates = constrain((elapsedTime - animationSpacing*i) / animationTenure,0,1);
            let animatedDiameter1 = lerp(0, diameter, updates);
            if(indexElement){
              let x = fixedStart + i * (diameter + spacing);
              let y = (height / 2) - 100;
              let datapointX = fixedStart + (i-1) * (diameter + spacing);
              let datapointY = (height / 2) - 100;
              
              fill(0);
              noStroke();
              if(i+1===size || i===0){
                rect(datapointX - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
                rect(x - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
              }
              else{
                rect(datapointX - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 10, diameter+(spacing)+5, diameter*3);
                rect(x - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
              }
              stroke(200);
  
              fill(200);
              ellipse(x, y, animatedDiameter1, animatedDiameter1);
              fill(0,0,0);
              textAlign(CENTER, CENTER);
              let textS = lerp(0,20,updates);
              textSize(textS);
              text(addElement, x, y);
              stroke(200);
              if ((i+1)!==size) {
                let arrowStartX = x + (animatedDiameter1 / 2)+lerp(0, spacing, updates / 2);
                let arrowStartY = y;
                let arrowEndX = x + (animatedDiameter1 / 2) + lerp(0, spacing, updates / 2);
                let arrowEndY = y;
                drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, updates);
              }
            
              if (i===0) {
                textAlign(CENTER, CENTER);
                let textS = lerp(0,20,updates);
                textSize(textS);
                text("head/0", x, y+(diameter/2)+20);
              }
  
              if (i===size-1) {
                textAlign(CENTER, CENTER);
                let textS = lerp(0,20,updates);
                textSize(textS);
                text(`tail/${i+1}`, x, y+(diameter/2)+20);
              }
              indexElement=false;
            }
            if(fixedStart===0){
              fixedStart=startX;
            }
            let x = fixedStart + (i+1) * (diameter + spacing);
            let y = (height / 2) - 100;
      
            fill(200);
            ellipse(x, y, animatedDiameter1, animatedDiameter1);
            fill(0,0,0);
            textAlign(CENTER, CENTER);
            let textS = lerp(0,20,updates);
            textSize(textS);
            text(current.data, x, y);
            stroke(200);
            if ((i+1)!==size) {
              updateInsertAnyAlgorithm(4);
              let arrowStartX = x + (animatedDiameter1 / 2)+lerp(0, spacing, updates / 2);
              let arrowStartY = y;
              let arrowEndX = x + (animatedDiameter1 / 2) + lerp(0, spacing, updates / 2);
              let arrowEndY = y;
              drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, updates);
            }
    
            if (i===0) {
              textAlign(CENTER, CENTER);
              let textS = lerp(0,20,updates);
              textSize(textS);
              text("head/0", x, y+(diameter/2)+20);
            }
            
            if (i===size-1) {
              stroke(200);
              strokeWeight(3);
              textAlign(CENTER, CENTER);
              let textS = lerp(0,20,updates);
              textSize(textS);
              text(`tail/${i+1}`, x, y+(diameter/2)+20);
              linkedList.addToSpecific(addIndex,addElement);
              index=10
              refreshSearch();
              insertAny=false;
            }
          }
  
          if(i<addIndex-1 && elapsedTime > animationSpacing*i + animationTenure + 500){
            updateInsertAnyAlgorithm(2);
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
  
        }
        if(current.next!==null){
          current=current.next;
        }
        i++;
      }
  
    }
  
  }