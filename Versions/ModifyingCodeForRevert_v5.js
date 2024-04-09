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
  let otherPointer = 0;
  let playPause = false;
  let searchFlag=false;
  let elapsedTime=0;
  let searchingPlaying=false;
  let insertedRemovedFlag = false;
  let removeTailStart = false;
  let insertRemoveAnyStart = false;
  let newInsertArrow = false;
  let newRemoveArrow = false;
  let size;
  let temporaryArray = [];
  let revertRemovePointerFlag = false;
  let removedFlag = false;
  let insertedAnyFlag = false;
  let removedAnyFlag = false;
  let currentProgress = 0;
  let progressAmount = 0;
  
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
  let showOperationButton, showAlgorithmBoxButton, algorithmBoxOperation,createListButton,emptyButton,userDefinedButton,randomButton,randomSortedButton,searchButton,insertButton,insertHeadButton,insertTailButton,insertAnyButton,playButton,pauseButton,revertButton,forwardButton,inputBox,submitButton,searchInputBox,searchSubmitButton,progressBarX, progressBarY;
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
  let totalWidth,startX, yAxis;
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

    showAlgorithmBoxButton = createButton('<');
    showAlgorithmBoxButton.position(width-showAlgorithmBoxButton.width,height-279.65);
    showAlgorithmBoxButton.class('algorithmBoxButton');
    showAlgorithmBoxButton.mouseClicked(showAlgorithmBox);
  
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
    searchButton.mouseClicked(searchList);

    insertButton = createButton('Insert');
    insertButton.position(searchButton.x, searchButton.y + searchButton.height + 17);
    insertButton.class('customButton');
    insertButton.hide();
    insertButton.mouseClicked(insertElement);

    insertHeadButton = createButton('Insert Head');
    insertHeadButton.position(insertButton.x + insertButton.width + 103, insertButton.y);
    insertHeadButton.class('customButton');
    insertHeadButton.hide();
    insertHeadButton.mouseClicked(insertHeadElement);

    insertTailButton = createButton('Insert Tail');
    insertTailButton.position(insertHeadButton.x + insertHeadButton.width + 65, insertButton.y);
    insertTailButton.class('customButton');
    insertTailButton.hide();
    insertTailButton.mouseClicked(insertTailElement);

    insertAnyButton = createButton('Insert Specific Element');
    insertAnyButton.position(insertTailButton.x + insertTailButton.width + 78, insertButton.y);
    insertAnyButton.class('customButtonLong');
    insertAnyButton.style('width: 210px');
    insertAnyButton.hide();
    insertAnyButton.mouseClicked(insertAnyElement);

    removeButton = createButton('Remove');
    removeButton.position(insertButton.x, insertButton.y + insertButton.height + 18);
    removeButton.class('customButton');
    removeButton.hide();
    removeButton.mouseClicked(removeElement);

    removeHeadButton = createButton('Remove Head');
    removeHeadButton.position(removeButton.x + removeButton.width + 87, removeButton.y);
    removeHeadButton.class('customButton');
    removeHeadButton.hide();
    removeHeadButton.mouseClicked(removeHeadElement);

    removeTailButton = createButton('Remove Tail');
    removeTailButton.position(removeHeadButton.x + removeHeadButton.width + 49, removeButton.y);
    removeTailButton.class('customButton');
    removeTailButton.hide();
    removeTailButton.mouseClicked(removeTailElement);

    removeAnyButton = createButton('Remove Specific Element');
    removeAnyButton.position(removeTailButton.x + removeTailButton.width + 61, removeButton.y);
    removeAnyButton.class('customButtonLong');
    removeAnyButton.style('width: 225px');
    removeAnyButton.hide();
    removeAnyButton.mouseClicked(removeAnyElement);
  
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

  function showAlgorithmBox() {
    if(algorithmBoxOperation){
      algorithmBoxOperation=false;
    }
    else if(!algorithmBoxOperation){
      algorithmBoxOperation=true;
    }
  }

  function updateAlgorithm(step){
    const algorithmBox = document.getElementById('algorithm-box');
    if(algorithmBox && algorithmBox instanceof HTMLElement){
      let algorithmSteps,algorithmHeading;
      if(searchingList){
        algorithmHeading = `Searching for ${searchNo!==null?searchNo:"A Number"}`;
        algorithmSteps = [
          "index = 0, temp = head",
          "while (temp.data != value)",
          "    index++, temp = temp.next",
          "    if temp == null\n         return NOT_FOUND",
          "return index"
        ];
      }
      else if(insertHead){
        algorithmHeading = `Inserting element at Head`;
        algorithmSteps = [
          "Vertex vtx = new Vertex(v)",
          "vtx.next = head",
          "head = vtx"
        ];
      }
      else if(insertTail){
        algorithmHeading = `Inserting element at Tail`;
        algorithmSteps = [
          "Vertex vtx = new Vertex(v)",
          "tail.next = vtx",
          "tail = vtx"
        ];
      }
      else if(insertAny){
        algorithmHeading = `Inserting ${addElement!==null?addElement:"An Element"} at ${addIndex!==null?addIndex:"An Index"}`;
        algorithmSteps = [
          "Vertex temp = head",
          "for (k = 0; k < i-1; k++)\n      temp = temp.next",
          "Vertex vtx = new Vertex(v)",
          "vtx.next = temp.next",
          "temp.next = vtx"
        ];
      }
      else if(removeHead){
        algorithmHeading = `Removing element from Head`; 
        algorithmSteps = [
          "temp = head",
          "head = head.next",
          "delete temp"
        ];
      }
      else if(removeTail){
        algorithmHeading = `Removing element from Tail`; 
        algorithmSteps = [
          "Vertex temp = head",
          "while (temp.next != null)\n       prev = temp\n       temp=temp.next",
          "prev.next = null",
          "delete temp, tail = prev"
        ];
      }
      else if(removeAny){
        algorithmHeading = `Removing element from ${addIndex!==null?addIndex:"An Index"}`; 
        algorithmSteps = [
          "Vertex temp = head",
          "for (k = 0; k < i-1; k++)\n      temp = temp.next",
          "Vertex del = temp.next",
          "temp.next = del.next\ndelete del"
        ];
      }
      else{
        algorithmSteps=[];
      }
      
      console.log(algorithmSteps);
      algorithmBox.innerHTML='';
    
      const algorithmHead = document.createElement('div');
      algorithmHead.textContent=algorithmHeading;
      algorithmHead.classList.add('highlight');
      algorithmBox.appendChild(algorithmHead);

      algorithmHead.style.padding = '10px';
      algorithmHead.style.fontWeight = 'bold';
      algorithmHead.style.borderBottom = '2px solid white';

      for(let i=0;i<algorithmSteps.length;i++){
        const stepText = algorithmSteps[i];
        
        const stepElement = document.createElement('div');
        stepElement.textContent=stepText;
        stepElement.style.padding='5px';
    
        if(i===step){
          stepElement.classList.add('highlight');
        }
        
        algorithmBox.appendChild(stepElement);
      }
    }
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
    list=[];
    calculated=false;
    searchNo=null;
    addElement=null;
    insertRemoveAnyStart = false;
    removeTailStart = false;
    searchingList=false;
    insertHead=false;
    insertTail=false;
    insertAny=false;
    removeHead=false;
    removeTail=false;
    removeAny=false;
    isPlaying=false;
    playPauseAnimation();
    document.getElementById('algorithm-box').style.display = 'none';
  }
  
  function userDefinedList(){
    pointer=null;
    searchFlag=false;
    removeTailStart = false;
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
        size=list.length;
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
    searchFlag=false;
    listSize = 0;
    removeTailStart = false;
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
      size=list.length;
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
    searchFlag=false;
    removeTailStart = false;
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
      size=list.length;
      fixedStart=0;
      pointer=0;
      animationStartTime = millis();
      playPause=true;
      refreshingRequired=true;
      isPlaying = true;
      calculated = true;
    }  
  }

  function refreshSearch(){
    // background(0, 0, 0);
    if(removedFlag){
      console.log("workking this...");
      list.splice(list.length-1,1);
      console.log(list);
      removedFlag=false;
    }
    if(insertedAnyFlag){
      for(let i=addIndex; i<list.length; i++){
        list[i][0]+=1;
        list[i][3]=list[i][3]+diameter+spacing;
      }
      console.log(temporaryArray);
      list.splice(addIndex,0,temporaryArray);
      console.log(list);
      insertedAnyFlag=false;
    }
    if(removedAnyFlag){
      for(let i=(addIndex); i<list.length; i++){
        list[i][0]-=1;
        list[i][3]=list[i][3]-(diameter+spacing);
      }
      list.splice(addIndex,1);
      console.log(list);
      removedAnyFlag=false;
    }
    let array = list.map(innerArray => [...innerArray]);
    listSize=0;
    list=[];
    calculated=false;
    searchNo=null;
    searchingList=false;
    console.log("Empty");
    list = array.map(innerArray => [...innerArray]);
    for(let i=0; i<list.length; i++){
      list[i][1]=0;
    }
    console.log(list);
    let flag = false;
    for(let i=0;i<list.length;i++){
      console.log(searchIndex);
      if(searchIndex===i){
        console.log("Found");
        searchIndex=null;
        fill(0);
        noStroke();
        if(i+1===list.length || i===0){
          rect(list[i][3] - (diameter / 2) - (spacing/2)-6 , list[i][4] + (diameter / 2) + 40, diameter+(2*spacing), diameter);
        }
        else{
          rect(list[i][3] - (diameter / 2) - (spacing/2)-6 , list[i][4] + (diameter / 2) + 10, diameter+(2*spacing), diameter);
        }
        stroke(200);
        break;
      }
      else if(list.length===i+1){
        console.log("Not there");
        fill(0);
        noStroke();
        rect(list[i][3] - (diameter / 2) - (spacing/2)-13 , list[i][4] + diameter / 2 + 30, diameter+(2*spacing), diameter);
        stroke(200);
      }
    }
    for (let i = 0; i < list.length; i++) {
      console.log("looping");
      fill(decodeColor(list[i][1]));
      ellipse(list[i][3], list[i][4], diameter, diameter);
      fill(0,0,0);
      textAlign(CENTER, CENTER);
      let textS = 20;
      textSize(textS);
      text(list[i][2], list[i][3], list[i][4]);
  
      if (i===0) {
        // fill(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("head/0", list[i][3], list[i][4]+(diameter/2)+20);
      }
      
      if (i===list.length-1) {
        // fill(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text(`tail/${i}`, list[i][3], list[i][4]+(diameter/2)+20);
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
      else if(index===5){
        removeHeadElement();
      }
      else if(index===6){
        removeTailElement();
      }
      else if(index===7){
        removeAnyElement();
      }
    }
  }

  function searchList(){
    if (list.length>0) {
      if(!refreshingSearchRequired){
        creatingList=false;
        insertHead=false;
        pointer=null;
        playPause=false;
        isPlaying = false;
        if (inputBox) {
          inputBox.hide();
        }
        if (submitButton) {
          submitButton.hide();
        }
        insertingElement=false;
        removingElement=false;
        creatingList = false;
        insertRemoveAnyStart = false;
        removeTailStart = false;
        searchNo=null;
        progressAmount=0;
        currentProgress=0;
        searchInputBox = createInput('');
        searchInputBox.position(searchButton.x + searchButton.width + 100, searchButton.y + 13);
        searchInputBox.class('inputBox');
        // searchInputBox.input(addToList);
  
        // createProgressBar();
  
        // document.getElementById('algorithm-box').style.display = 'block';
  
        searchSubmitButton = createButton('Submit');
        searchSubmitButton.position(searchInputBox.x + 140, searchButton.y + 13);
        searchSubmitButton.class('submitButton');
        searchSubmitButton.mouseClicked(function() {
          if (searchInputBox.value() !== '') {
            let num = parseInt(searchInputBox.value().trim());
            if(!isNaN(num)){
              searchNo = num;
              size=list.length;
              console.log(searchNo,typeof(searchNo));
              currentStep=0;
              stepPointer=0;
              pointer=0;
              isPlaying = true;
              searchFlag=false;
              insertHead=false;
              insertTail=false;
              insertAny=false;
              removeHead=false;
              removeTail=false;
              removeAny=false;
              calculated = false;
              refreshingSearchRequired = true;
              searchingPlaying = true;
              playPauseAnimation();
              searchingList = true;
              let tempIndex = null;
              for(let i=0; i<list.length; i++){
                if(list[i][2]==searchNo){
                  tempIndex=i;
                  break;
                }
              }
              console.log(tempIndex);
              progressAmount = tempIndex!==null?(100/((tempIndex+1)*2)):(100/(list.length * 2));
              console.log("Progress Amount ",progressAmount);
              updateProgressBar(currentProgress);
              updateAlgorithm(20);
              algorithmBoxOperation=true;
              animationStartTime = millis();
              searchInputBox.hide();
              searchSubmitButton.hide();
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

  function insertElement(){
    if (insertingElement) {
      // document.getElementById('algorithm-box').style.display = 'none';
      insertingElement = false;
    }
    else if(!insertingElement){
      // document.getElementById('algorithm-box').style.display = 'block';
      creatingList=false;
      removingElement=false;
      insertingElement = true;
    }
  }

  function insertHeadElement(){
    if(!refreshingSearchRequired){
      if(list.length>0){
        addElement = null;
        insertedRemovedFlag=false;
        pointer=0;
        otherPointer = 0;
        progressAmount = 0;
        removeTailStart = false;
        insertRemoveAnyStart = false;
        playPause=false;
        isPlaying = false;
        updateProgressBar(0);
        // document.getElementById('algorithm-box').style.display = 'block';
        // updateInsertHeadAlgorithm(20);
        // createProgressBar();
  
        let element = prompt("Enter the element to be added to List Head.");
        if (element && !isNaN(element)) {
          startX=startX-(diameter+spacing);
          size=list.length;
          addElement=element;
          calculated = false;
          searchingList = false;
          searchFlag = false;
          insertTail = false;
          insertAny=false;
          removeHead = false;
          removeTail = false;
          removeAny=false;
          refreshingSearchRequired=true;
          fixedStartInsert=false;
          isPlaying=true;
          insertHeadCount++;
          insertHead=true;
          progressAmount=100/3;
          updateAlgorithm(20);
          algorithmBoxOperation=true;
          playPauseAnimation();
          animationStartTime = millis();
        }
      }
      else{
        alert("Please make a list first!");
      }
    }
    else{
      index=2;
      refreshSearch();
    }
  }

  function insertTailElement(){
    if(!refreshingSearchRequired){
      if(list.length>0){
        // document.getElementById('algorithm-box').style.display = 'block';
        // updateInsertTailAlgorithm(20);
        // createProgressBar();
  
        insertedRemovedFlag=false;
        addElement = null;
        otherPointer = 0;
        pointer=0;
        playPause=false;
        progressAmount = 0;
        removeTailStart = false;
        insertRemoveAnyStart = false;
        isPlaying = false;
        updateProgressBar(0);
        let element = prompt("Enter the element to be added to List Tail.");
        if (element && !isNaN(element)) {
          size=list.length;
          addElement=element;
          calculated = false;
          searchingList = false;
          searchFlag = false;
          insertAny=false;
          insertHead = false;
          removeHead = false;
          removeAny=false;
          removeTail = false;
          refreshingSearchRequired=true;
          insertTailCount++;
          insertTail=true;
          progressAmount=100/3;
          updateAlgorithm(20);
          algorithmBoxOperation=true;
          isPlaying = true;
          playPauseAnimation();
          animationStartTime = millis();
        }
      }
      else{
        alert("Please make a list first!");
      }
    }
    else{
      index=3;
      refreshSearch();
    }
  }

  function insertAnyElement(){
    if(!refreshingSearchRequired){
      if(list.length>0){
        // document.getElementById('algorithm-box').style.display = 'block';
        // updateInsertTailAlgorithm(20);
        // createProgressBar();
  
        insertedRemovedFlag=false;
        insertRemoveAnyStart=false;
        addElement = null;
        addIndex = null;
        otherPointer = 0;
        pointer=0;
        progressAmount = 0;
        playPause=false;
        removeTailStart = false;
        isPlaying = false;
        let index = prompt("Enter the index of the List Data.");
        let element = prompt("Enter the element to be added to List.");
        if (element && index && !isNaN(element) && !isNaN(index)) {
          if(index===0 || index>(list.length-2)){
            alert("Enter the value between head and tail!");
            calculated = false;
          }
          else{
            size=list.length;
            addElement=element;
            addIndex=index;
            temporaryArray=[addIndex,0,addElement,startX + (addIndex*(diameter+spacing)),yAxis,4];
            calculated = false;
            searchingList = false;
            searchFlag = false;
            insertHead = false;
            removeHead = false;
            removeAny=false;
            removeTail = false;
            refreshingSearchRequired=true;
            insertTail=false;
            insertAny=true;
            progressAmount = 100/(parseInt(addIndex)+1+3);
            console.log("Progress Amount - ", progressAmount);
            updateAlgorithm(20);
            algorithmBoxOperation=true;
            isPlaying = true;
            playPauseAnimation();
            animationStartTime = millis();
          }
        }
      }
      else{
        alert("Please make a list first!");
      }
    }
    else{
      index=4;
      refreshSearch();
    }
  }

  function removeElement(){
    if (removingElement) {
      // document.getElementById('algorithm-box').style.display = 'none';
      removingElement = false;
    }
    else if(!removingElement){
      // document.getElementById('algorithm-box').style.display = 'block';
      creatingList=false;
      insertingElement=false;
      removingElement = true;
    }
  }

  function removeHeadElement(){
    if(!refreshingSearchRequired){
      // document.getElementById('algorithm-box').style.display = 'block';
      // updateRemoveHeadAlgorithm(20);
      // createProgressBar();
      addElement = null;
      insertedRemovedFlag=false;
      otherPointer = 0;
      pointer = 0;
      playPause=false;
      progressAmount = 0;
      isPlaying = false;
      insertRemoveAnyStart = false;
      removeTailStart = false;
      if (list.length>0) {
        startX=startX+(diameter+spacing);
        temporaryArray = [...list[0]];
        size=list.length;
        calculated = false;
        searchingList = false;
        searchFlag = true;
        insertTail = false;
        insertAny=false;
        insertHead = false;
        removeTail = false;
        removeAny=false;
        refreshingSearchRequired=true;
        fixedStartInsert=false;
        isPlaying=true;
        removeHeadCount++;
        removeHead=true;
        progressAmount=100/3;
        updateAlgorithm(20);
        algorithmBoxOperation=true;
        playPauseAnimation();
        animationStartTime = millis();
      }
      else{
        alert("Please make a list first!");
      }
    }
    else{
      index=5;
      refreshSearch();
    }
  }

  function removeTailElement(){
    if(!refreshingSearchRequired){
      // document.getElementById('algorithm-box').style.display = 'block';
      // updateRemoveHeadAlgorithm(20);
      // createProgressBar();
      addElement = null;
      insertedRemovedFlag=false;
      insertRemoveAnyStart = false;
      otherPointer = 0;
      pointer = 0;
      playPause=false;
      progressAmount = 0;
      isPlaying = false;
      removeTailStart = false;
      
      if (list.length>0) {
        size=list.length;
        temporaryArray = [...list[size-1]];
        calculated = false;
        searchingList = false;
        insertAny=false;
        searchFlag = false;
        insertTail = false;
        insertHead = false;
        removeHead = false;
        removeAny=false;
        refreshingSearchRequired=true;
        fixedStartInsert=false;
        isPlaying=true;
        removeHeadCount++;
        removeTail = true;
        progressAmount = 100/(parseInt(list.length)+2);
        updateAlgorithm(20);
        algorithmBoxOperation=true;
        playPauseAnimation();
        animationStartTime = millis();
      }
      else{
        alert("Please make a list first!");
      }
    }
    else{
      index=6;
      refreshSearch();
    }
  }

  function removeAnyElement(){
    if(!refreshingSearchRequired){
      // document.getElementById('algorithm-box').style.display = 'block';
      // updateRemoveHeadAlgorithm(20);
      // createProgressBar();
      addElement = null;
      insertedRemovedFlag=false;
      insertRemoveAnyStart = false;
      otherPointer = 0;
      pointer = 0;
      playPause=false;
      progressAmount = 0;
      isPlaying = false;
      removeTailStart = false;
      
      if (list.length>0) {
        addElement = null;
        addIndex = null;
        let index = prompt("Enter the index of the List Data.");
        if (index && !isNaN(index)) {
          if(index===0 || index>(list.length-2)){
            alert("Enter the value between head and tail!");
            calculated = false;
          }
          else{
            addIndex=index;
            size=list.length;
            temporaryArray = [...list[addIndex]];
            calculated = false;
            searchingList = false;
            insertAny=false;
            searchFlag = false;
            insertTail = false;
            insertHead = false;
            removeHead = false;
            removeTail = false;
            refreshingSearchRequired=true;
            fixedStartInsert=false;
            isPlaying=true;
            removeHeadCount++;
            removeAny=true;
            progressAmount = 100/(parseInt(addIndex)+1+1);
            updateAlgorithm(20);
            algorithmBoxOperation=true;
            playPauseAnimation();
            animationStartTime = millis();
          }
        }
      }
      else{
        alert("Please make a list first!");
      }
    }
    else{
      index=7;
      refreshSearch();
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
      if(searchingPlaying){
        searchingPlaying=false;
        pauseButton.attribute('disabled', true);
      }
      revertButton.attribute('disabled', true);
      forwardButton.attribute('disabled', true);
    }
    
  }
  
  function forwardAnimation(){
    // fwdFlag=true;
    // playPauseAnimation();
    console.log("Forward..");
    console.log(list.length);
    
    if(pointer+1!==size && !searchFlag && (!insertHead && !insertTail && !removeHead && !removeTailStart && !insertRemoveAnyStart)){
      if(searchingList){
        forwardButton.attribute('disabled',true);
        revertButton.attribute('disabled',true);
        pauseButton.attribute('disabled',true);
      }
      animationStartTime=millis();
      pointer+=1;
    }
    if((insertHead || insertTail || removeHead || insertRemoveAnyStart) && otherPointer<3 && !removeTailStart && !removeAny){
      otherPointer+=1;
      // forwardButton.attribute('disabled',true);
      // revertButton.attribute('disabled',true);
      // pauseButton.attribute('disabled',true);
      animationStartTime=millis();
    }
    if(insertRemoveAnyStart && removeAny && otherPointer<1){
      otherPointer+=1;
      animationStartTime=millis();
    }
    if((removeTailStart) && otherPointer<2){
      otherPointer+=1;
      animationStartTime=millis();
    }
    isPlaying=true;
  }
  
  function revertAnimation(){
    console.log("Reverting");
    // pointer-=1;
    if(otherPointer==0 && removeTailStart){
      removeTailStart=false;
    }
    if(otherPointer==0 && insertRemoveAnyStart){
      insertRemoveAnyStart=false;
    }
    if(pointer>0 && (!insertHead && !insertTail && !removeHead && !removeTailStart && !insertRemoveAnyStart)){
      searchFlag=false;
      pointer-=1;
    }
    if((insertHead || insertTail || removeHead || removeTailStart || insertRemoveAnyStart) && otherPointer>0){
      otherPointer-=1;
    }
    diminisher(pointer);
  }
  
  function drawArrow(startX, startY, endX, endY, arrowSize,progress) {
    let angle = atan2(endY - startY, endX - startX);
    let hypotenuse = dist(startX, startY, endX, endY);
    let hypotenuse2;
    if(insertHead && insertedRemovedFlag===false){
      hypotenuse2 = dist(list[0][3] - (diameter+spacing) + (diameter/2)+1, startY, endX, endY);
    }
    else if(insertHead && insertedRemovedFlag===true){
      hypotenuse2 = dist(list[0][3] + (diameter/2) + 1, startY, endX, endY);
    }
    else if(insertTail && insertedRemovedFlag){
      hypotenuse2 = dist(list[list.length - 2][3] + (diameter/2) + 1, startY, endX, endY);
    }
    else if(insertTail && !insertedRemovedFlag){
      hypotenuse2 = dist(list[list.length - 1][3] + (diameter/2) + 1, startY, endX, endY);
    }
    else if(removeHead && insertedRemovedFlag===false){
      hypotenuse2 = dist(list[0][3] + (diameter/2) + 1, startY, endX, endY);
    }
    else if(removeHead && insertedRemovedFlag===true){
      hypotenuse2 = dist(list[0][3] - (diameter+spacing) + (diameter/2)+1, startY, endX, endY);
    }
    else if(removeTail && !insertedRemovedFlag){
      hypotenuse2 = dist(list[list.length - 2][3] + diameter/2 + 1, startY, endX, endY);
    }
    else if(removeTail && insertedRemovedFlag){
      hypotenuse2 = dist(list[list.length - 1][3] + diameter/2 + 1, startY, endX, endY);
    }
    else if(insertAny && newInsertArrow){
      hypotenuse2 = dist(temporaryArray[3],temporaryArray[4]+((diameter/2)+spacing)-1,list[pointer][3],list[pointer][4]+diameter/2);
    }
    else if((insertAny || removeAny) && !newInsertArrow){
      hypotenuse2 = dist(endX-spacing, startY, endX, endY);
    }
    else{
      hypotenuse2 = dist(list[pointer-1][3]+(diameter/2)+1, startY, endX, endY);
    }
  
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

    let x1,y1,x2,y2,x3,y3,x4;
    let arrowOpaq = 200;
    stroke(255, 255, 255,arrowOpaq);
    // arrowWidth = lerp(0, arrowSize, progress);
    // arrowHeight = arrowWidth * 2;

    if(newInsertArrow){
      y1 = hypotenuse;
      x1 = 0;
      y2 = hypotenuse + arrowWidth;
      x2 = -arrowHeight / 2;
      y3 = hypotenuse + arrowWidth;
      x3 = arrowHeight / 2;
      y4 = hypotenuse2;

      console.log("x1 "+x1+"y1 "+y1+"x2 "+x2+"y2"+y2+"x3 "+x3+"y3 "+y3+"y4 "+y4);
      
      line(0, 0, x1, y1);
      line(x1, y1, x2, y2);
      line(x1, y1, x3, y3);
      line(x2, y2, x3, y3);
      line(x1, y2, x1, y4);

      newInsertArrow = false;
    }
    else{
      x1 = hypotenuse;
      y1 = 0;
      x2 = hypotenuse - arrowWidth;
      y2 = -arrowHeight / 2;
      x3 = hypotenuse - arrowWidth;
      y3 = arrowHeight / 2;
      x4 = -hypotenuse2;
  
      // console.log("x1 "+x1+"y1 "+y1+"x2 "+x2+"y2"+y2+"x3 "+x3+"y3 "+y3+"x4 "+x4+"y4 "+y4+"x5 "+x5+"y5 "+y5);
    
      line(0, 0, x1, y1);
      line(x1, y1, x2, y2);
      line(x1, y1, x3, y3);
      line(x2, y2, x3, y3);
      line(x4, y1, x3, y1);
    }
  
    pop();
  }
  
  function updateProgressBar(progress){
    console.log("Progress --- ",progress);
    let text = progress % 1 !== 0?`${progress.toFixed(2)}%`:`${progress}%`;
    const progressing = document.querySelector('.progress');
    progressing.style.width = `${progress}%`;
    const progressingText = document.querySelector('.progressText');
    progressingText.textContent = text;
  }

  function deploy(pointer){
    if(list[pointer][5]==0 && calculated){
        console.log(elapsedTime);
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
        if(playPause && elapsedTime>animationSpacing){
            isPlaying=false
            forwardAnimation();
        }
        else if(!playPause){
            isPlaying=false;
        }
    }

    if(list[pointer][5]==1 && searchingList && isPlaying){
      console.log(animationStartTime+"starting");
      console.log(elapsedTime);
      // isPlaying=false;
      if(pointer>0){
        fill(0);
        noStroke();
        if(pointer===1){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 40, diameter + spacing - 5, diameter);
        }
        else{
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        }
      }
      list[pointer][1] = 1;
      let colorCode = decodeColor(list[pointer][1]);
      fill(colorCode);
      ellipse(list[pointer][3], list[pointer][4], diameter, diameter);
      fill(0,0,0);
      textAlign(CENTER, CENTER);
      let textS = 17;
      textSize(textS);
      text(list[pointer][2], list[pointer][3], list[pointer][4]);
      stroke(200);
      if(pointer===0){
        // updateSearchAlgorithm(0);
        // updateProgressBar(progressValue);
        // progressValue=progressValue+stepValue;
        updateProgressBar(((pointer*2)+1)*progressAmount);
        updateAlgorithm(0);
        text("temp/" + pointer, list[pointer][3], list[pointer][4] + (diameter / 2) + 50);
        // isPlaying=false;
        // setTimeout(colorizer,2200);
      }
      else if(pointer===list.length-1){
        // updateSearchAlgorithm(1);
        // updateProgressBar(progressValue);
        // progressValue=progressValue+stepValue;
        updateAlgorithm(2);
        updateProgressBar(((pointer*2)+1)*progressAmount);
        text("temp/" + pointer, list[pointer][3], list[pointer][4] + (diameter / 2) + 50);
        // isPlaying=false;
        // setTimeout(colorizer,2200);
      }
      else{
        // updateSearchAlgorithm(1);
        // updateProgressBar(progressValue);
        // progressValue=progressValue+stepValue;
        updateAlgorithm(2);
        updateProgressBar(((pointer*2)+1)*progressAmount);
        text("temp/" + pointer, list[pointer][3], list[pointer][4] + (diameter / 2) + 20);
        // isPlaying=false;
        // setTimeout(colorizer,2200);
      }

      console.log(searchNo);
      console.log(list[pointer][2]);
      if(list[pointer][2]==searchNo && elapsedTime>animationSpacing){
        updateAlgorithm(4);
        forwardButton.removeAttribute('disabled');
        revertButton.removeAttribute('disabled');
        pauseButton.removeAttribute('disabled');
        searchIndex=pointer;
        list[pointer][1] = 3;
        let colorCode = decodeColor(list[pointer][1]);
        console.log(colorCode);
        fill(colorCode);
        ellipse(list[pointer][3], list[pointer][4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text(list[pointer][2], list[pointer][3], list[pointer][4]);
        fill(126,96,91);
        textAlign(CENTER, CENTER);
        textSize(17);
        if(pointer+1===list.length || pointer===0){
          updateProgressBar(100);
          text("Found It!", list[pointer][3], list[pointer][4]+(diameter/2)+80);
          // searchFlag=true;
        }
        else{
          updateProgressBar(100);
          text("Found It!", list[pointer][3], list[pointer][4]+(diameter/2)+50);
          // searchFlag=true;
        }
        searchFlag=true;
        isPlaying=false;

      }
      else if(list[pointer][2]!==searchNo && elapsedTime>animationSpacing){
        updateAlgorithm(1);
        forwardButton.removeAttribute('disabled');
        revertButton.removeAttribute('disabled');
        pauseButton.removeAttribute('disabled');
        list[pointer][1] = 2;
        let colorCode = decodeColor(list[pointer][1]);
        fill(colorCode);
        ellipse(list[pointer][3], list[pointer][4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text(list[pointer][2], list[pointer][3], list[pointer][4]);
        if(pointer==list.length-1){
          updateAlgorithm(3);
          fill(0,100,67);
          textAlign(CENTER, CENTER);
          textSize(20);
          updateProgressBar(100);
          text("Not Found", list[pointer][3], list[pointer][4]+(diameter/2)+80);
        }
        else{
          updateProgressBar(((pointer*2)+2)*progressAmount);
        }
        if(playPause && elapsedTime>animationSpacing+animationDuration){
          console.log("Running this...");
            isPlaying=false;
            forwardAnimation();
        }
        else if(!playPause){
            isPlaying=false;
        }
      }
      
    }

    if(insertHead && isPlaying){
      let tempArray = [0,0,addElement,startX, yAxis, 2];
      if(otherPointer==0){
        if(elapsedTime>400){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
      }
      if(otherPointer==1){
        updateAlgorithm(0);
        updateProgressBar(otherPointer*progressAmount);
        let colorCode = decodeColor(tempArray[1]);
        fill(colorCode);
        ellipse(tempArray[3], tempArray[4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text(tempArray[2], tempArray[3], tempArray[4]);
        stroke(200);
        text("temp/0", tempArray[3], tempArray[4] + (diameter / 2) + 20);
        if(playPause && elapsedTime>animationSpacing + animationGap){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==2){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(1);
        let arrowStartX, arrowStartY, arrowEndX, arrowEndY;
        if(insertedRemovedFlag===false){
          arrowStartX = list[0][3] - (diameter / 2);
          arrowStartY = list[0][4];
          arrowEndX = list[0][3] - (diameter / 2);
          arrowEndY = list[0][4];
        }
        if(insertedRemovedFlag===true){
          arrowStartX = list[1][3] - (diameter / 2);
          arrowStartY = list[1][4];
          arrowEndX = list[1][3] - (diameter / 2);
          arrowEndY = list[1][4];
        }
        
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==3){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(2);
        noStroke();
        fill(0);
        rect(tempArray[3] - (diameter / 2) - 7, tempArray[4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        rect(list[list.length - 1][3] - (diameter / 2) - 7, list[list.length - 1][4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        stroke(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("head/0", tempArray[3], tempArray[4]+(diameter/2)+20);
        if(insertedRemovedFlag===true){
          text("tail/" + (list.length-1), list[list.length - 1][3], list[list.length - 1][4]+(diameter/2)+20);
        }
        else if(insertedRemovedFlag===false){
          text("tail/" + (list.length), list[list.length - 1][3], list[list.length - 1][4]+(diameter/2)+20);
        }
        if(!insertedRemovedFlag){
          for(let i=0; i<list.length; i++){
            list[i][0]+=1;
          }
          list.splice(0,0,tempArray);
          insertedRemovedFlag=true;
        }
        
        console.log(list);
        isPlaying=false;
      }
    }

    if(insertTail && isPlaying){
      console.log(size,",",startX,",",list[0][3]);
      let tempArray = [size,0,addElement,startX + size*(diameter + spacing), yAxis, 3];
      if(otherPointer==0){
        if(elapsedTime>400){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
      }
      if(otherPointer==1){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(0);
        let colorCode = decodeColor(tempArray[1]);
        fill(colorCode);
        ellipse(tempArray[3], tempArray[4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text(tempArray[2], tempArray[3], tempArray[4]);
        stroke(200);
        text("temp/"+size, tempArray[3], tempArray[4] + (diameter / 2) + 20);
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==2){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(1);
        let arrowStartX, arrowStartY, arrowEndX, arrowEndY;
        if(insertedRemovedFlag===false){
          arrowStartX = tempArray[3] - (diameter / 2);
          arrowStartY = tempArray[4];
          arrowEndX = tempArray[3] - (diameter / 2);
          arrowEndY = tempArray[4];
        }
        if(insertedRemovedFlag===true){
          arrowStartX = list[list.length-1][3] - (diameter / 2);
          arrowStartY = list[list.length-1][4];
          arrowEndX = list[list.length-1][3] - (diameter / 2);
          arrowEndY = list[list.length-1][4];
        }
        
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==3){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(2);
        noStroke();
        fill(0);
        rect(tempArray[3] - (diameter / 2) - 7, tempArray[4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        rect(list[size - 1][3] - (diameter / 2) - 7, list[size - 1][4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        stroke(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        if(insertedRemovedFlag===true){
          text("tail/" + (list.length-1), list[list.length - 1][3], list[list.length - 1][4]+(diameter/2)+20);
        }
        else if(insertedRemovedFlag===false){
          text("tail/" + (list.length), tempArray[3], tempArray[4]+(diameter/2)+20);
        }
        if(!insertedRemovedFlag){
          list.push(tempArray);
          insertedRemovedFlag=true;
        }
        
        console.log(list);
        isPlaying=false;
      }
    }

    if(insertAny && isPlaying){
      if(pointer===0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(0);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/0", list[0][3], list[0][4] + (diameter / 2) + 40);
        if(pointer==addIndex){
          insertRemoveAnyStart=true;
        }
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(pointer>0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(1);
        fill(0);
        noStroke();
        if(pointer===1){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        }
        else if(pointer===2){
          rect(list[pointer-2][3] - (diameter / 2) - 7, list[pointer-2][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        }
        else{
          rect(list[pointer-2][3] - (diameter / 2) - 7, list[pointer-2][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        }
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
        if(pointer==1){
          text("prev/0", list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
        }
        else{
          text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
        }
        
        if(playPause && elapsedTime>animationSpacing){
          if(pointer==addIndex){
            insertRemoveAnyStart=true;
            console.log("Running this...");
            isPlaying=false;
            forwardAnimation();
          }
          else{
            console.log("Running this...");
            isPlaying=false;
            forwardAnimation();
          }
        }
        else if(!playPause){
          if(pointer==addIndex){
            insertRemoveAnyStart=true;
            isPlaying=false;
          }
          else{
            isPlaying=false;
          }
        }
      }
      else if(otherPointer===0 && insertRemoveAnyStart){
        if(playPause){
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(insertRemoveAnyStart && otherPointer===1){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(2);
        fill(200);
        ellipse(temporaryArray[3], temporaryArray[4] + diameter + spacing, diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text(temporaryArray[2], temporaryArray[3], temporaryArray[4] + diameter + spacing);
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(insertRemoveAnyStart && otherPointer===2){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(3);
        newInsertArrow = true;
        let arrowStartX, arrowStartY, arrowEndX, arrowEndY;
        arrowStartX = list[pointer][3];
        arrowStartY = list[pointer][4] + (diameter / 2);
        arrowEndX = list[pointer][3];
        arrowEndY = list[pointer][4] + (diameter / 2);
        
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(insertRemoveAnyStart && otherPointer===3){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(4);
        fill(0);
        noStroke();
        if(pointer===1){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        }
        else{
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        }
        rect(list[pointer][3] - ((diameter/2) + spacing), list[pointer][4] - (diameter / 2) - 4, (size - pointer) * (diameter + spacing) + 10, diameter * 3 );
        for(let i=pointer; i<size; i++){
          fill(200);
          ellipse(list[i][3] + diameter + spacing, list[i][4], diameter, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 20;
          textSize(textS);
          text(list[i][2], list[i][3] + diameter + spacing, list[i][4]);
          stroke(200);
          if (i!==0) {
              let arrowStartX = list[i][3] + diameter + spacing - (diameter / 2);
              let arrowStartY = list[i][4];
              let arrowEndX = list[i][3] + diameter + spacing - (diameter / 2);
              let arrowEndY = list[i][4];
              drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
          }
          
          if (i===size-1) {
            textAlign(CENTER, CENTER);
            let textS = 17;
            textSize(textS);
            text(`tail/${i+1}`, list[i][3] + diameter + spacing, list[i][4]+(diameter/2)+20);
          }
        }

        fill(200);
        ellipse(temporaryArray[3], temporaryArray[4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 20;
        textSize(textS);
        text(temporaryArray[2], temporaryArray[3], temporaryArray[4]);
        stroke(200);
        if (pointer!==0) {
            let arrowStartX = temporaryArray[3] - (diameter / 2);
            let arrowStartY = temporaryArray[4];
            let arrowEndX = temporaryArray[3] - (diameter / 2);
            let arrowEndY = temporaryArray[4];
            drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
        }
        insertedAnyFlag=true;
        isPlaying=false;
      }
    }

    if(removeHead && isPlaying){
      if(otherPointer==0){
        if(elapsedTime>400){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
      }
      if(otherPointer==1){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(0);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/0", temporaryArray[3], temporaryArray[4] + (diameter) + 30);
        if(playPause && elapsedTime>animationSpacing + animationGap){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==2){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(1);
        noStroke();
        fill(0);
        rect(temporaryArray[3] + (diameter / 2), temporaryArray[4] - (diameter / 2), spacing - 1, diameter);
        rect(temporaryArray[3] - (diameter / 2) - 7, temporaryArray[4] + (diameter / 2) + 3, diameter + 9, diameter/2);
        if(insertedRemovedFlag){
          rect(list[size-2][3] - (diameter / 2) - 7, list[size-2][4] + (diameter/2) + 3, diameter + 9, diameter);
          stroke(200);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          text("tail/"+(size-2), list[size-2][3], list[size-2][4] + (diameter/2) + 20);
        }
        else{
          rect(list[size-1][3] - (diameter / 2) - 7, list[size-1][4] + (diameter/2) + 3, diameter + 9, diameter);
          stroke(200);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          text("tail/"+(size-2), list[size-1][3], list[size-1][4] + (diameter/2) + 20);
        }
        stroke(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        if(size!==2){
          text("head/0", temporaryArray[3] + (diameter + spacing), temporaryArray[4] + (diameter/2) + 20);
        }
        else{
          text("head/0", temporaryArray[3] + (diameter + spacing), temporaryArray[4] + (diameter/2) + 30);
        }
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==3){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(2);
        noStroke();
        fill(0);
        rect(temporaryArray[3] - (diameter / 2) - 7, temporaryArray[4] - (diameter / 2) - 10, diameter + 10, (diameter*3));
        stroke(200);
        if(!insertedRemovedFlag){
          for(let i=1; i<list.length; i++){
            list[i][0]-=1;
          }
          list.splice(0,1);
          pointer+=1;
          insertedRemovedFlag=true;
        }
        
        console.log(list);
        isPlaying=false;
      }
    }

    if(removeTail && isPlaying){
      if(pointer==0){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(0);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("temp/0", list[pointer][3], list[pointer][4] + (diameter/2) + 40);
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(pointer!==0 && !removeTailStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(1);
        fill(0);
        noStroke();
        if(pointer===1){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        }
        else if(pointer==2 && pointer+1==size){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
          rect(list[pointer-2][3] - (diameter / 2) - 7, list[pointer-2][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        }
        else if(pointer==2 && pointer+1!==size){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
          rect(list[pointer-2][3] - (diameter / 2) - 7, list[pointer-2][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        }
        else{
          rect(list[pointer-2][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        }
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        if(pointer+1==size){
          text("temp/"+pointer, temporaryArray[3], temporaryArray[4] + (diameter/2) + 40);
        }
        else{
          text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
        }
        if(pointer==1){
          text("prev/0", list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
        }
        else{
          text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
        }
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          if(pointer+1==size){
            removeTailStart=true;
          }
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          if(pointer+1==size){
            removeTailStart=true;
          }
          isPlaying=false;
        }
      }
      else if(otherPointer===0 && removeTailStart){
        if(playPause){
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==1 && removeTailStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(2);
        noStroke();
        fill(0);
        rect(list[pointer-1][3] + (diameter / 2), list[pointer-1][4] - (diameter / 2), spacing - 1, diameter);
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer==2 && removeTailStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(3);
        noStroke();
        fill(0);
        rect(temporaryArray[3] - (diameter / 2) - 2, temporaryArray[4] - (diameter / 2) - 2, diameter + 5, (diameter*2)+2);
        if(pointer==1){
          rect(list[pointer-1][3] - (diameter / 2) - 3, list[pointer-1][4] + (diameter / 2) + 30, diameter + 3, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          stroke(200);
          text("tail/"+(size-2), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
          isPlaying=false;
        }
        else{
          rect(list[pointer-1][3] - (diameter / 2) - 3, list[pointer-1][4] + (diameter / 2) + 10, diameter + 3, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          stroke(200);
          text("tail/"+(size-2), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
          removedFlag=true;
          isPlaying=false;
        }
      }
    }

    if(removeAny && isPlaying){
      if(pointer===0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(0);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("temp/0", list[pointer][3], list[pointer][4] + (diameter/2) + 40);
        if(playPause && elapsedTime>animationSpacing){
          console.log("Running this...");
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(pointer>0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(1);
        fill(0);
        noStroke();
        if(pointer<addIndex){
          if(pointer===1){
            rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
          }
          else{
            rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
          }
        }
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        if(pointer==addIndex){
          updateAlgorithm(2);
          fill(51,100,72)
          text("del/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
        }
        else if(pointer<addIndex){
          text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
        }
        
        if(playPause && elapsedTime>animationSpacing){
          if(pointer==addIndex){
            insertRemoveAnyStart=true;
            console.log("Running this...");
            isPlaying=false;
            forwardAnimation();
          }
          else{
            console.log("Running this...");
            isPlaying=false;
            forwardAnimation();
          }
        }
        else if(!playPause){
          if(pointer==addIndex){
            insertRemoveAnyStart=true;
            isPlaying=false;
          }
          else{
            isPlaying=false;
          }
        }
      }
      else if(otherPointer===0 && insertRemoveAnyStart){
        if(playPause){
          isPlaying=false;
          forwardAnimation();
        }
        else if(!playPause){
          isPlaying=false;
        }
      }
      else if(otherPointer===1 && insertRemoveAnyStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(3);
        fill(0);
        noStroke();
        if(pointer===1){
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        }
        else{
          rect(list[pointer-1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        }
        rect(list[pointer][3] - ((diameter/2) + spacing), list[pointer][4] - (diameter / 2) - 4, (size - pointer) * (diameter + spacing) + 10, diameter * 3 );
        for(let i=pointer+1; i<size; i++){
          fill(200);
          ellipse(list[i][3] - (diameter + spacing), list[i][4], diameter, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 20;
          textSize(textS);
          text(list[i][2], list[i][3] - (diameter + spacing), list[i][4]);
          stroke(200);
          if (i!==0) {
              let arrowStartX = list[i][3] - (diameter + spacing) - (diameter / 2);
              let arrowStartY = list[i][4];
              let arrowEndX = list[i][3] - (diameter + spacing) - (diameter / 2);
              let arrowEndY = list[i][4];
              drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
          }
          
          if (i===size-1) {
            textAlign(CENTER, CENTER);
            let textS = 17;
            textSize(textS);
            text(`tail/${i-1}`, list[i][3] - (diameter + spacing), list[i][4]+(diameter/2)+20);
          }
        }
        removedAnyFlag=true;
        isPlaying=false;
      }
    }
  }

  function decodeColor(colorCode){
    if (colorCode==0){
        return 200;
    }
    if (colorCode==1){
      let cc=[51,100,72]
      return cc;
    }
    if (colorCode==2){
      let cc=[0,100,67];
      return cc;
    }
    if (colorCode==3){
      let cc=[126,96,91];
      return cc;
    }
    if (colorCode==null){
        return (0,0,0);
    }
  }

  function diminisher(pointer){
    if(list[pointer][5]==0 && (!insertHead && !insertTail && !insertAny && !removeHead && !removeTail && !removeAny)){
      list[pointer][1] = null;
      fill(0);
      noStroke();
      rect(list[pointer][3] + (diameter/2) + 1 , list[pointer][4] - (diameter / 2)-5, diameter+(spacing)+5, diameter*2);
    }

    if(list[pointer][5]==1 && (!insertHead && !insertTail && !insertAny && !removeHead && !removeTail && !removeAny)){
      list[pointer+1][1]=0;
      fill(0);
      noStroke();
      rect(list[pointer+1][3] - (diameter / 2), list[pointer+1][4] - (diameter / 2) - 5, diameter, diameter + 10);
      rect(list[pointer+1][3] - (diameter / 2) - 8, list[pointer+1][4] + (diameter / 2), diameter + 17, diameter*2);

      fill(decodeColor(list[pointer+1][1]));
      ellipse(list[pointer+1][3], list[pointer+1][4], diameter, diameter);
      fill(0,0,0);
      textAlign(CENTER, CENTER);
      let textSi = 20;
      textSize(textSi);
      text(list[pointer+1][2], list[pointer+1][3], list[pointer+1][4]);
      stroke(200);
      
      if (pointer+1===list.length-1) {
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text(`tail/${pointer+1}`, list[pointer+1][3], list[pointer+1][4]+(diameter/2)+20);
      }

      let colorCode = decodeColor(list[pointer][1]);
      fill(colorCode);
      ellipse(list[pointer][3], list[pointer][4], diameter, diameter);
      fill(0,0,0);
      textAlign(CENTER, CENTER);
      let textS = 17;
      textSize(textS);
      text(list[pointer][2], list[pointer][3], list[pointer][4]);
      stroke(200);
      if(pointer===0){
        updateAlgorithm(0);
        updateProgressBar(((pointer+1)*2)*progressAmount);
        text("temp/" + pointer, list[pointer][3], list[pointer][4] + (diameter / 2) + 50);
      }
      else if(pointer===list.length-1){
        updateProgressBar(((pointer+1)*2)*progressAmount);
        text("temp/" + pointer, list[pointer][3], list[pointer][4] + (diameter / 2) + 50);
      }
      else{
        updateAlgorithm(2);
        updateProgressBar(((pointer+1)*2)*progressAmount);
        text("temp/" + pointer, list[pointer][3], list[pointer][4] + (diameter / 2) + 20);
      }
    }

    if(insertHead){
      if(otherPointer==2){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(1);
        noStroke();
        fill(0);
        rect(list[0][3] - (diameter / 2) - 7, list[0][4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        rect(list[list.length - 1][3] - (diameter / 2) - 7, list[list.length - 1][4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        stroke(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("temp/0", list[0][3], list[0][4]+(diameter/2)+20);
        text("head/0", list[1][3], list[1][4]+(diameter/2)+20);
        text("tail/" + (list.length-2), list[list.length - 1][3], list[list.length - 1][4]+(diameter/2)+20);
      }
      if(otherPointer==1){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(0);
        noStroke();
        fill(0);
        if(insertedRemovedFlag){
          rect(list[0][3] + (diameter / 2) + 1, list[0][4] - (diameter / 2),spacing, diameter);
        }
        else{
          rect(startX + (diameter / 2) + 1, yAxis - (diameter / 2), spacing, diameter);
        }
        stroke(200);
      }
      if(otherPointer==0){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(20);
        noStroke();
        fill(0);
        if(insertedRemovedFlag){
          rect(list[0][3] - (diameter / 2) - 2, list[0][4] - (diameter / 2) - 2, diameter + 3, diameter + spacing + 7);
        }
        else{
          rect(startX - (diameter / 2) - 2, yAxis - (diameter / 2) - 2, diameter + 3, diameter + spacing + 7);
        }
        stroke(200);
      }
    }

    if(insertTail){
      if(otherPointer==2){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(1);
        noStroke();
        fill(0);
        rect(list[list.length - 1][3] - (diameter / 2) - 7, list[list.length - 1][4] + (diameter / 2) + 10, diameter + spacing + diameter + 9, diameter);
        stroke(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("temp/"+size, startX + size*(diameter + spacing), yAxis+(diameter/2)+20);
        text("tail/" + (list.length-2), list[list.length - 2][3], list[list.length - 2][4]+(diameter/2)+20);
      }
      if(otherPointer==1){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(0);
        noStroke();
        fill(0);
        if(insertedRemovedFlag){
          rect(list[list.length-2][3] + (diameter / 2) + 1, list[list.length-2][4] - (diameter / 2), spacing - 2, diameter);
        }
        else{
          rect(list[size-1][3] + (diameter / 2) + 1, list[size-1][4] - (diameter / 2), spacing - 2, diameter);
        }
        stroke(200);
      }
      if(otherPointer==0){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(20);
        noStroke();
        fill(0);
        if(insertedRemovedFlag){
          rect(list[list.length - 1][3] - (diameter / 2) - 2, list[list.length - 1][4] - (diameter / 2) - 2, diameter + 3, diameter + spacing + 7);
        }
        else{
          rect((startX + size*(diameter + spacing)) - (diameter / 2) - 2, yAxis - (diameter / 2) - 2, diameter + 3, diameter + spacing + 7);
        }
        stroke(200);
      }
    }

    if(insertAny){
      if(otherPointer===2 && insertRemoveAnyStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(3);
        fill(0);
        noStroke();
        rect(list[pointer][3] - ((diameter/2) + spacing), list[pointer][4] - (diameter / 2) - 4, (size - pointer + 1) * (diameter + spacing) + 10, diameter * 3 );
        for(let i=pointer; i<size; i++){
          fill(200);
          ellipse(list[i][3], list[i][4], diameter, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 20;
          textSize(textS);
          text(list[i][2], list[i][3], list[i][4]);
          stroke(200);
          if (i!==0) {
              let arrowStartX = list[i][3] - (diameter / 2);
              let arrowStartY = list[i][4];
              let arrowEndX = list[i][3] - (diameter / 2);
              let arrowEndY = list[i][4];
              drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
          }
          
          if (i===size-1) {
            textAlign(CENTER, CENTER);
            let textS = 17;
            textSize(textS);
            text(`tail/${i}`, list[i][3], list[i][4]+(diameter/2)+20);
          }
        }
        fill(200);
        ellipse(temporaryArray[3], temporaryArray[4] + diameter + spacing, diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
        if(pointer==1){
          text("prev/0", list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
        }
        else{
          text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
        }
        text(temporaryArray[2], temporaryArray[3], temporaryArray[4] + diameter + spacing);
        newInsertArrow = true;
        let arrowStartX, arrowStartY, arrowEndX, arrowEndY;
        arrowStartX = list[pointer][3];
        arrowStartY = list[pointer][4] + (diameter / 2);
        arrowEndX = list[pointer][3];
        arrowEndY = list[pointer][4] + (diameter / 2);
        
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
      }
      else if(otherPointer===1 && insertRemoveAnyStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(2);
        fill(0);
        noStroke();
        rect(list[pointer][3] - (diameter/2) - 7, list[pointer][4] + (diameter / 2), diameter + spacing, spacing );
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
      }
      else if(otherPointer===0 && insertRemoveAnyStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(1);
        fill(0);
        noStroke();
        rect(list[pointer][3] - (diameter/2) - 7, list[pointer][4] + (diameter / 2) + 10, diameter + spacing, diameter + spacing );
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
      }
      else if(pointer>0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(1);
        fill(0);
        noStroke();
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        rect(list[pointer+1][3] - (diameter / 2) - 7, list[pointer+1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
        if(pointer==1){
          text("prev/0", list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
        }
        else{
          text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
        }
      }
      else if(pointer===0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(0);
        fill(0);
        noStroke();
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        rect(list[pointer+1][3] - (diameter / 2) - 7, list[pointer+1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 40);
      }
    }

    if(removeHead){
      if(otherPointer==2){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(1);
        let colorCode = decodeColor(temporaryArray[1]);
        fill(colorCode);
        ellipse(temporaryArray[3], temporaryArray[4], diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text(temporaryArray[2], temporaryArray[3], temporaryArray[4]);
        stroke(200);
        text("temp/0", temporaryArray[3], temporaryArray[4] + (diameter) + 30);
      }
      if(otherPointer==1){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(0);
        fill(0);
        noStroke();
        if(size!==2){
          rect(temporaryArray[3] + (diameter + spacing) - (diameter / 2) - 7, temporaryArray[4] + (diameter / 2) + 3, diameter + 9, diameter/2);
        }
        else{
          rect(temporaryArray[3] + (diameter + spacing) - (diameter / 2) - 7, temporaryArray[4] + (diameter / 2) + 20, diameter + 9, diameter/2);
        }
        fill(0);
        noStroke();
        if(insertedRemovedFlag){
          rect(list[size-2][3] - (diameter / 2) - 7, list[size-2][4] + (diameter/2) + 3, diameter + 9, diameter);
          stroke(200);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          text("tail/"+(size-1), list[size-2][3], list[size-2][4] + (diameter/2) + 20);
        }
        else{
          rect(list[size-1][3] - (diameter / 2) - 7, list[size-1][4] + (diameter/2) + 3, diameter + 9, diameter);
          stroke(200);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          text("tail/"+(size-1), list[size-1][3], list[size-1][4] + (diameter/2) + 20);
        }
        stroke(200);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        text("head/0", temporaryArray[3], temporaryArray[4] + (diameter/2) + 20);
        let arrowStartX, arrowStartY, arrowEndX, arrowEndY;
        arrowStartX = temporaryArray[3] + (diameter / 2) + spacing;
        arrowStartY = temporaryArray[4];
        arrowEndX = temporaryArray[3] + (diameter / 2) + spacing;
        arrowEndY = temporaryArray[4];
        
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
      }
      if(otherPointer==0){
        updateProgressBar(otherPointer*progressAmount);
        updateAlgorithm(20);
        fill(0);
        noStroke();
        rect(temporaryArray[3] - (diameter / 2) - 7, temporaryArray[4] + (diameter/2) + 30, diameter + 9, diameter);
      }
    }

    if(removeTail && removeTailStart){
      if(otherPointer==1){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(2);
        console.log(list);
        console.log("Pointer=",pointer);
        fill(200);
        ellipse(temporaryArray[3], temporaryArray[4], diameter, diameter);
        fill(0);
        noStroke();
        if(pointer==1){
          rect(list[pointer-1][3] - (diameter / 2) - 3, list[pointer-1][4] + (diameter / 2) + 30, diameter + 3, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          stroke(200);
          text(temporaryArray[2], temporaryArray[3], temporaryArray[4]);
          text("tail/"+(size-1), temporaryArray[3], temporaryArray[4] + (diameter/2) + 20);
          text("temp/"+(size-2), temporaryArray[3], temporaryArray[4] + (diameter/2) + 40);
          text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
        }
        else{
          rect(list[pointer-1][3] - (diameter / 2) - 3, list[pointer-1][4] + (diameter / 2) + 10, diameter + 3, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 17;
          textSize(textS);
          stroke(200);
          text(temporaryArray[2], temporaryArray[3], temporaryArray[4]);
          text("tail/"+(size-1), temporaryArray[3], temporaryArray[4] + (diameter/2) + 20);
          text("temp/"+(size-1), temporaryArray[3], temporaryArray[4] + (diameter/2) + 40);
          text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
        }
      }
      else if(otherPointer==0){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(1);
        let arrowStartX, arrowStartY, arrowEndX, arrowEndY;
        arrowStartX = temporaryArray[3] - (diameter / 2);
        arrowStartY = temporaryArray[4];
        arrowEndX = temporaryArray[3] - (diameter / 2);
        arrowEndY = temporaryArray[4];
        drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
      }
    }

    if(removeTail && !removeTailStart){
      updateProgressBar((pointer+1)*progressAmount);
      updateAlgorithm(1);
      fill(0);
      noStroke();
      if(pointer==size-2 && pointer!==0){
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        rect(temporaryArray[3] - (diameter / 2) - 7, temporaryArray[4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
      }
      else if(pointer==0 && pointer+1!==size-1){
        rect(list[pointer+1][3] - (diameter / 2) - 7, list[pointer+1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
      }
      else if(pointer==0 && pointer+1===size-1){
        rect(temporaryArray[3] - (diameter / 2) - 7, temporaryArray[4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
      }
      else{
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        rect(list[pointer+1][3] - (diameter / 2) - 7, list[pointer-1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
      }
      fill(0,0,0);
      textAlign(CENTER, CENTER);
      let textS = 17;
      textSize(textS);
      stroke(200);
      if(pointer===0){
        updateAlgorithm(0);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 40);
      }
      else{
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
      }
      if(pointer==1){
        text("prev/0", list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
      }
      else if(pointer!==0){
        text("prev/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
      }
    }

    if(removeAny){
      if(otherPointer===0 && insertRemoveAnyStart){
        updateProgressBar((pointer+1+otherPointer)*progressAmount);
        updateAlgorithm(2);
        fill(0);
        noStroke();
        rect(list[pointer][3] - ((diameter/2) + spacing), list[pointer][4] - (diameter / 2) - 4, (size - pointer) * (diameter + spacing) + 10, diameter * 2 );
        for(let i=pointer; i<size; i++){
          fill(200);
          ellipse(list[i][3], list[i][4], diameter, diameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          let textS = 20;
          textSize(textS);
          text(list[i][2], list[i][3], list[i][4]);
          stroke(200);
          if (i!==0) {
              let arrowStartX = list[i][3] - (diameter / 2);
              let arrowStartY = list[i][4];
              let arrowEndX = list[i][3] - (diameter / 2);
              let arrowEndY = list[i][4];
              drawArrow(arrowStartX, arrowStartY, arrowEndX, arrowEndY, 6, "NoProgress");
          }
          
          if (i===size-1) {
            textAlign(CENTER, CENTER);
            let textS = 17;
            textSize(textS);
            text(`tail/${i}`, list[i][3], list[i][4]+(diameter/2)+20);
          }
        }
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        if(pointer===1){
          text("temp/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 40);
        }
        else{
          text("temp/"+(pointer-1), list[pointer-1][3], list[pointer-1][4] + (diameter/2) + 20);
        }
        fill(51,100,72);
        text("del/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
      }
      else if(pointer>0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(1);
        fill(0);
        noStroke();
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        rect(list[pointer+1][3] - (diameter / 2) - 7, list[pointer+1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 20);
      }
      else if(pointer===0 && !insertRemoveAnyStart){
        updateProgressBar((pointer+1)*progressAmount);
        updateAlgorithm(0);
        fill(0);
        noStroke();
        rect(list[pointer][3] - (diameter / 2) - 7, list[pointer][4] + (diameter / 2) + 30, diameter + spacing - 5, diameter);
        rect(list[pointer+1][3] - (diameter / 2) - 7, list[pointer+1][4] + (diameter / 2) + 10, diameter + spacing - 5, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        let textS = 17;
        textSize(textS);
        stroke(200);
        text("temp/"+pointer, list[pointer][3], list[pointer][4] + (diameter/2) + 40);
      }
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

    if(algorithmBoxOperation){
      document.getElementById('algorithm-box').style.display = 'block';
      showAlgorithmBoxButton.html('>');
    }

    else if(!algorithmBoxOperation){
      document.getElementById('algorithm-box').style.display = 'none';
      showAlgorithmBoxButton.html('<');
    }
  
    if (operationsButtons) {
      insertButton.show();
      removeButton.show();
      createListButton.show();
      searchButton.show();
      showOperationButton.html('<');
    }
  
    else if (!operationsButtons) {
      if (searchInputBox) {
        searchInputBox.hide();
      }
      if (searchSubmitButton) {
        searchSubmitButton.hide();
      }
      if (inputBox) {
        inputBox.hide();
      }
      if (submitButton) {
        submitButton.hide();
      }
      insertButton.hide();
      removeButton.hide();
      createListButton.hide();
      searchButton.hide();
      showOperationButton.html('>');
    }

    if (removingElement) {
      if (searchInputBox) {
        searchInputBox.hide();
      }
      if (searchSubmitButton) {
        searchSubmitButton.hide();
      }
      if (inputBox) {
        inputBox.hide();
      }
      if (submitButton) {
        submitButton.hide();
      }
      creatingList=false;
      removeHeadButton.show();
      removeTailButton.show();
      removeAnyButton.show();
    }
  
    else if (!removingElement) {
      removeHeadButton.hide();
      removeTailButton.hide();
      removeAnyButton.hide();
    }

    if (insertingElement) {
      if (searchInputBox) {
        searchInputBox.hide();
      }
      if (searchSubmitButton) {
        searchSubmitButton.hide();
      }
      if (inputBox) {
        inputBox.hide();
      }
      if (submitButton) {
        submitButton.hide();
      }
      creatingList=false;
      insertHeadButton.show();
      insertTailButton.show();
      insertAnyButton.show();
    }
  
    else if (!insertingElement) {
      insertHeadButton.hide();
      insertTailButton.hide();
      insertAnyButton.hide();
    }
  
    if (calculated && list.length>0 && isPlaying) {
    
      console.log(pointer);

      if(pointer==list.length){
          calculated=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          list[pointer][5]=0;
          deploy(pointer);
      }

    }

    if (searchingList && list.length>0 && isPlaying) {
    
      console.log(pointer);

      if(pointer==list.length){
          searchingList=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          list[pointer][5]=1;
          deploy(pointer);
      }

    }

    if (insertHead && list.length>0 && isPlaying) {
    
      console.log(otherPointer);

      if(otherPointer==4){
          insertHead=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          deploy(pointer);
      }

    }

    if (insertTail && list.length>0 && isPlaying) {
    
      console.log(otherPointer);

      if(otherPointer==4){
          insertTail=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          deploy(pointer);
      }

    }

    if (insertAny && list.length>0 && isPlaying) {
    
      console.log(otherPointer);

      if(otherPointer==4){
          insertAny=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          deploy(pointer);
      }

    }

    if (removeHead && list.length>0 && isPlaying) {
    
      console.log(otherPointer);
      console.log("Pointer"+pointer);

      if(otherPointer==4){
          removeHead=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          deploy(pointer);
      }

    }
  
    if (removeTail && list.length>0 && isPlaying) {
    
      console.log("Other Pointer"+otherPointer);
      console.log("Pointer"+pointer);

      if(pointer==list.length){
          removeTail=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          list[pointer][5]=6;
          deploy(pointer);
      }

    }

    if (removeAny && list.length>0 && isPlaying) {
    
      console.log("Other Pointer"+otherPointer);
      console.log("Pointer"+pointer);

      if(pointer==list.length){
          removeAny=false;
          isPlaying=false;
      }
      else{
          elapsedTime = millis() - animationStartTime;
          deploy(pointer);
      }

    }

  }