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
  revertButton.attribute('disabled', true);

  pauseButton = createButton('&#10074&#10074');
  pauseButton.position(revertButton.x + revertButton.width - 2, revertButton.y);
  pauseButton.class('controlButton');
  pauseButton.mouseClicked(playPauseAnimation);

  forwardButton = createButton('&#11166&#11166');
  forwardButton.position(pauseButton.x + pauseButton.width - 2, pauseButton.y);
  forwardButton.class('controlButton');
  forwardButton.mouseClicked(forwardAnimation);
  forwardButton.attribute('disabled', true);

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
  document.getElementById('algorithm-box').style.display = 'none';
  updateInsertHeadAlgorithm(20);
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
  if (linkedList.size>0) {
    if(!refreshingSearchRequired){
      creatingList=false;
      if (inputBox) {
        inputBox.hide();
      }
      if (submitButton) {
        submitButton.hide();
      }
      insertingElement=false;
      removingElement=false;
      creatingList = false;

      searchInputBox = createInput('');
      searchInputBox.position(searchButton.x + searchButton.width + 100, searchButton.y + 13);
      searchInputBox.class('inputBox');
      // searchInputBox.input(addToList);

      // createProgressBar();

      document.getElementById('algorithm-box').style.display = 'block';
      updateSearchAlgorithm(20);

      searchSubmitButton = createButton('Submit');
      searchSubmitButton.position(searchInputBox.x + 140, searchButton.y + 13);
      searchSubmitButton.class('submitButton');
      searchSubmitButton.mouseClicked(function() {
        if (searchInputBox.value() !== '') {
          let num = parseInt(searchInputBox.value().trim());
          if(!isNaN(num)){
            searchNo = num;
            console.log(searchNo,typeof(searchNo));
            console.log(linkedList.size);
            currentStep=0;
            stepPointer=0;
            isPlaying = true;
            calculated = false;
            refreshingSearchRequired = true;
            animationStartTime = millis();
            searchingList = true;
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

function updateRemoveHeadAlgorithm(step){
  const algorithmBox = document.getElementById('algorithm-box');
  if(algorithmBox && algorithmBox instanceof HTMLElement){
    const algorithmSteps = [
      "temp = head",
      "head = head.next",
      "delete temp"
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

function updateRemoveTailAlgorithm(step){
  const algorithmBox = document.getElementById('algorithm-box');
  if(algorithmBox && algorithmBox instanceof HTMLElement){
    const algorithmSteps = [
      "Vertex prev = head\ntemp = prev.next",
      "while (temp.next != null)",
      "    prev = prev.next",
      "prev.next = null",
      "delete temp, tail = prev"
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

function updateRemoveSpecificAlgorithm(step){
  const algorithmBox = document.getElementById('algorithm-box');
  if(algorithmBox && algorithmBox instanceof HTMLElement){
    const algorithmSteps = [
      "Vertex temp = head",
      "for (k = 0; k < i-1; k++)",
      "   temp = temp.next",
      "Vertex del = temp.next",
      "temp.next = del.next // bypass del",
      "delete del"
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

// function playAnimation() {
  
// }

function playPauseAnimation() {
  if(isPlaying){
    pauseButton.html('&#11208');
    totalPausedTime = millis() - animationStartTime;
    isPlaying = false;
    // playButton.removeAttribute('disabled');
    // pauseButton.attribute('disabled', true);
    revertButton.removeAttribute('disabled');
    forwardButton.removeAttribute('disabled');
  }
  else if(!isPlaying){
    pauseButton.html('&#10074&#10074');
    isPlaying = true;
    animationStartTime = millis() - totalPausedTime;
    // playButton.attribute('disabled', true);
    // pauseButton.removeAttribute('disabled');
    revertButton.attribute('disabled', true);
    forwardButton.attribute('disabled', true);
    if(fwdFlag===true){
      setTimeout(playPauseAnimation,1800);
      fwdFlag=false;
    }
  }
  
}

async function forwardAnimation(){
  fwdFlag=true;
  playPauseAnimation();
}

function revertAnimation(){

}

function insertElement(){
  if (insertingElement) {
    document.getElementById('algorithm-box').style.display = 'none';
    insertingElement = false;
  }
  else if(!insertingElement){
    document.getElementById('algorithm-box').style.display = 'block';
    creatingList=false;
    removingElement=false;
    insertingElement = true;
  }
}

function insertHeadElement(){
  if(!refreshingSearchRequired){
    if(linkedList.size>0){
      addElement = null;
      document.getElementById('algorithm-box').style.display = 'block';
      updateInsertHeadAlgorithm(20);
      // createProgressBar();

      let element = prompt("Enter the element to be added to List Head.");
      if (element && !isNaN(element)) {
        addElement=element;
        refreshingSearchRequired=true;
        fixedStartInsert=false;
        insertHeadCount++;
        insertHead=true;
        isPlaying = true;
        animationStartTime = millis();
        calculated = false;
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
    if(linkedList.size>0){
      document.getElementById('algorithm-box').style.display = 'block';
      updateInsertTailAlgorithm(20);
      // createProgressBar();

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
    if(linkedList.size>0){
      addElement = null;
      addIndex = null;
      // createProgressBar();

      let index = prompt("Enter the index of the List Data.");
      let element = prompt("Enter the element to be added to List.");
      if (element && index && !isNaN(element) && !isNaN(index)) {
        if(index===0 || index>(linkedList.size-2)){
          alert("Enter the value between head and tail!");
          calculated = false;
        }
        else{
          refreshingSearchRequired=true;
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
    document.getElementById('algorithm-box').style.display = 'none';
    removingElement = false;
  }
  else if(!removingElement){
    document.getElementById('algorithm-box').style.display = 'block';
    creatingList=false;
    insertingElement=false;
    removingElement = true;
  }
}

function removeHeadElement(){
  if(!refreshingSearchRequired){
    document.getElementById('algorithm-box').style.display = 'block';
    updateRemoveHeadAlgorithm(20);
    // createProgressBar();

    if (linkedList.size>0) {
      refreshingSearchRequired=true;
      fixedStartInsert=false;
      removeHeadCount++;
      removeHead=true;
      isPlaying = true;
      animationStartTime = millis();
      calculated = false;
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
    document.getElementById('algorithm-box').style.display = 'block';
    updateRemoveTailAlgorithm(20);
    // createProgressBar();

    if (linkedList.size>0) {
      refreshingSearchRequired=true;
      removeTailCount++;
      removeTail=true;
      isPlaying = true;
      animationStartTime = millis();
      calculated = false;
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
    document.getElementById('algorithm-box').style.display = 'block';
    updateRemoveSpecificAlgorithm(20);
    // createProgressBar();

    if(linkedList.size>0){
      addElement = null;
      addIndex = null;
      let index = prompt("Enter the index of the List Data.");
      if (index && !isNaN(index)) {
        if(index===0 || index>(linkedList.size-2)){
          alert("Enter the value between head and tail!");
          calculated = false;
        }
        else{
          refreshingSearchRequired=true;
          addIndex=index;
          removeAny=true;
          isPlaying = true;
          animationStartTime = millis();
          calculated = false;
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

function updateProgressBar(progress){
  let text=`${progress}%`;
  const progressing = document.querySelector('.progress');
  progressing.style.width = `${progress}%`;
  const progressingText = document.querySelector('.progressText');
  progressingText.textContent = text;
}

// function createProgressBar() {
  
// }

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
    searchButton.show();
    insertButton.show();
    removeButton.show();
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
    createListButton.hide();
    searchButton.hide();
    insertButton.hide();
    removeButton.hide();
    showOperationButton.html('>');
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
    console.log("Searching");
    updateSearchAlgorithm(0);
    let searchingValue=null;
    let stepValue=null;
    let progressValue=null;
    let counter=1;
    let temporary=linkedList.head;
    while(temporary){
      if(temporary.data===searchNo){
        searchingValue=counter;
        stepValue=100/(searchingValue*2);
        progressValue=stepValue;
        console.log("Value ---- ",stepValue);
        break;
      }
      else{
        temporary=temporary.next;
        counter++;
      }
    }
    let textSi,progress;
    let flag = false;
    let current = linkedList.head;
    let elapsedTime = millis() - animationStartTime;
    for(stepPointer=0;stepPointer<linkedList.size;stepPointer++){
      if(fixedStart===0){
        fixedStart=startX;
      }
     
      let x = fixedStart + stepPointer * (diameter + spacing);
      let y = (height / 2) - 100;
      
      if (elapsedTime > (animationSpacing+200)*stepPointer) {
        currentElement=stepPointer;
        progress = constrain((elapsedTime - (animationSpacing+200)*stepPointer) / animationTenure,0,1);
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
        if (stepPointer === currentElement) {
          if(stepPointer===0){
            updateSearchAlgorithm(0);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 50);
          }
          else if(stepPointer===linkedList.size-1){
            updateSearchAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 50);
          }
          else{
            updateSearchAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 20);
          }
        }
      }


      if(current.data!==searchNo && elapsedTime > (animationSpacing+200)*stepPointer + animationTenure + 500){
        updateSearchAlgorithm(2);
        updateProgressBar(progressValue);
        progressValue=progressValue+stepValue;
        fill(0,100,67, 50);
        ellipse(x, y, diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(current.data, x, y);
        fill(0);
        noStroke();
        if(stepPointer===0 || stepPointer===linkedList.size-1){
          rect(x - diameter / 2, y + diameter / 2 + 40, lerp(0, diameter, progress), lerp(0, diameter, progress));
        }
        else{
          rect(x - diameter / 2, y + diameter / 2 + 10, lerp(0, diameter, progress), lerp(0, diameter, progress));
        }
        stroke(200);
      }

      if(current.data===searchNo && elapsedTime > (animationSpacing+200)*stepPointer + animationTenure + 500){
        updateSearchAlgorithm(5);
        console.log(`Number found at index = ${stepPointer}`);
        searchIndex=stepPointer;
        fill(126,96,91, 50);
        ellipse(x, y, diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(current.data, x, y);
        fill(126,96,91);
        textAlign(CENTER, CENTER);
        textSize(20);
        if(stepPointer+1===linkedList.size || stepPointer===0){
          updateProgressBar(100);
          text("Found It!", x, y+(diameter/2)+80);
        }
        else{
          updateProgressBar(100);
          text("Found It!", x, y+(diameter/2)+50);
        }
        flag=true;
        break;
      }

      else if(stepPointer+1===linkedList.size && elapsedTime > (animationSpacing+200)*stepPointer + animationTenure+500){
        updateSearchAlgorithm(3);
        stroke(0,100,67);
        textAlign(CENTER, CENTER);
        textSize(20);
        updateProgressBar(100);
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
    // if(fixedStart===0){
    //   fixedStart=startX-insertHeadCount*(diameter+spacing);
    // }
    // else{
    //   fixedStart=fixedStart-insertHeadCount*(diameter+spacing);
    // }
    if(!fixedStartInsert){
      if(fixedStart===0){
        fixedStart=startX;
      }
      console.log("Fixed Start = ",fixedStart);
      fixedStart=fixedStart-(diameter+spacing);
      fixedStartInsert=true;
    }

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
      updateProgressBar(33);
      stroke(200);

      // let length = linkedList.length+1;

      if(elapsedTime > animationTenure+300){
        updateInsertHeadAlgorithm(1);
        updateProgressBar(67);
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
        updateProgressBar(100);
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
      updateProgressBar(33);
      fill(51,100,72);
      textAlign(CENTER, CENTER);
      let textSiz = lerp(0,15,progress);
      textSize(textSiz);
      text("temp/0", x+(diameter+spacing), y + (diameter / 2) + 20);
      stroke(200);

      if(elapsedTime > animationTenure+300){
        updateProgressBar(67);
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
        updateProgressBar(100);
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
    let stepValue=100/(addIndex*2);
    let progressValue=stepValue;
    
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
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 50);
          }
          else{
            updateInsertAnyAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
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
            if(i+1===size || i===0 || (i-1)===0){
              updateProgressBar(progressValue);
              progressValue=progressValue+stepValue;
              rect(datapointX - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
              rect(x - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
            }
            else{
              updateProgressBar(progressValue);
              progressValue=progressValue+stepValue;
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
            updateProgressBar(100);
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

  if(removeHead && linkedList.size>0 && isPlaying){
    if(!fixedStartInsert){
      if(fixedStart===0){
        fixedStart=startX;
      }
      console.log("Fixed Start = ",fixedStart);
      if(removeHeadCount>0){
        fixedStart=fixedStart;
      }
      fixedStartInsert=true;
    }
    let current = linkedList.head;
    let x = fixedStart;
    let y = (height / 2) - 100;
    let elapsedTime = millis() - animationStartTime;
    if (elapsedTime > 0) {
      let progress = constrain((elapsedTime - 0) / animationDuration,0,1);
      let animatedDiameter = lerp(0, diameter, progress);
      updateRemoveHeadAlgorithm(0);
      updateProgressBar(33);
      fill(51,100,72);
      textAlign(CENTER, CENTER);
      let textSi = lerp(0,15,progress);
      textSize(textSi);
      text("temp/0", x, y + (diameter / 2) + 50);
      stroke(200);

      if(elapsedTime > animationSpacing+300){
        console.log("Heading....");
        let size = linkedList.size;
        console.log(size);
        fill(0);
        noStroke();
        rect(fixedStart - (diameter / 2) - (spacing/2)-6 , y + (diameter / 2) + 5, diameter+(2*spacing), diameter/2);
        updateProgressBar(67);
        stroke(200);
        strokeWeight(3);
        textAlign(CENTER, CENTER);
        let textSi = lerp(0,20,progress);
        textSize(textSi);
        text("head/0", fixedStart+(diameter+spacing), y+(diameter/2)+20);
        console.log(linkedList);
        for(let i=0;i<size;i++){
          let datapointX = fixedStart + i * (diameter + spacing);
          let datapointY = (height / 2) - 100;
          
          if(i===(size - 1)){
            updateRemoveHeadAlgorithm(1);
            fill(0);
            noStroke();
            rect(datapointX - (diameter / 2) - (spacing/2)-6 , datapointY + (diameter / 2) + 5, diameter+(2*spacing), diameter);
            stroke(200);
            stroke(200);
            strokeWeight(3);
            textAlign(CENTER, CENTER);
            let textSi = lerp(0,20,progress);
            textSize(textSi);
            text("tail/"+(size-2), datapointX, datapointY+(diameter/2)+20);
          }
        }
        
      }

      if(elapsedTime>animationSpacing*2){
        updateRemoveHeadAlgorithm(2);
        updateProgressBar(100);
        fill(0);
        noStroke();
        rect(fixedStart - (diameter / 2) - (spacing/2) - 2 , y - (diameter / 2) - 5, diameter+(spacing)+5, diameter*3);
        stroke(200);
        linkedList.removeHead();
        removeHead=false;
        index=10;
        fixedStart=fixedStart+(diameter+spacing);
        refreshSearch();
      }
    }
  }

  if(removeTail && linkedList.size>0 && isPlaying){
    let textSi,progress;
    let flag = false;
    let stepValue = 100/(linkedList.size+1);
    let progressValue=stepValue;
    let current = linkedList.head;
    for(let i=0;i<(linkedList.size-1);i++){
      if(fixedStart===0){
        fixedStart=startX;
      }
      let x = fixedStart + i * (diameter + spacing);
      let y = (height / 2) - 100;
      let x1 = fixedStart + (i+1) * (diameter + spacing);

      let elapsedTime = millis() - animationStartTime;
      if (elapsedTime > (animationSpacing+200)*i) {
        currentElement=i;
        progress = constrain((elapsedTime - (animationSpacing+200)*i) / animationTenure,0,1);
        let animatedDiameter = lerp(0, diameter, progress);
        // fill(51,100,72, 50);
        // ellipse(x, y, animatedDiameter, animatedDiameter);
        // fill(0,0,0);
        // textAlign(CENTER, CENTER);
        // textSize(20);
        // text(current.data, x, y);
        fill(51,100,72);
        textAlign(CENTER, CENTER);
        textSi = lerp(0,15,progress);
        textSize(textSi);
        stroke(200);
        strokeWeight(2);
        if (i === currentElement) {

          if(i===0){
            updateRemoveTailAlgorithm(0);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("prev/" + currentElement, x, y + (diameter / 2) + 50);
            text("temp/" + (currentElement+1), x1, y + (diameter / 2) + 20);
          }
          else if(i===linkedList.size-2){
            updateRemoveTailAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("prev/" + currentElement, x, y + (diameter / 2) + 20);
            text("temp/" + (currentElement+1), x1, y + (diameter / 2) + 50);
          }
          else{
            updateRemoveTailAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("prev/" + currentElement, x, y + (diameter / 2) + 20);
            text("temp/" + (currentElement+1), x1, y + (diameter / 2) + 20);
          }
        }
      }
      if(i!==(linkedList.size-2) && elapsedTime > animationSpacing*i + animationTenure + 800){
        updateRemoveTailAlgorithm(2);
        fill(0);
        noStroke();
        if(i===0){
          rect(x - diameter / 2, y + diameter / 2 + 40, lerp(0, diameter, progress), lerp(0, diameter, progress));
          rect(x1 - diameter / 2, y + diameter / 2 + 10, lerp(0, diameter, progress), lerp(0, diameter, progress));
        }
        else{
          rect(x - diameter / 2, y + diameter / 2 + 10, lerp(0, diameter, progress), lerp(0, diameter, progress));
          rect(x1 - diameter / 2, y + diameter / 2 + 10, lerp(0, diameter, progress), lerp(0, diameter, progress));
        }
        stroke(200);
      }

      if(i===(linkedList.size-2) && elapsedTime > animationSpacing*i + (animationTenure*3)){
        updateRemoveTailAlgorithm(3);
        updateProgressBar(progressValue);
        progressValue=progressValue+stepValue;
        fill(0);
        noStroke();
        rect(x - (diameter / 2) - (spacing/2) , y - (diameter / 2) - 5, diameter+(spacing)+5, diameter+9);

        fill(200);
        ellipse(x, y, diameter, diameter);
        fill(0,0,0);
        textAlign(CENTER, CENTER);
        textSize(20);
        text(current.data, x, y);
      }

      if(i===(linkedList.size-2) && elapsedTime > animationSpacing*i + (animationTenure*5)){
        updateRemoveTailAlgorithm(4);
        updateProgressBar(100);
        fill(0);
        noStroke();
        rect(x1 - (diameter / 2) - (spacing/2) - 5 , y - (diameter / 2) - 5, diameter+(spacing)+5, diameter*3);
        rect(x - diameter / 2, y + diameter / 2 + 10, diameter, diameter+5);
        textAlign(CENTER, CENTER);
        textSi = 20;
        textSize(textSi);
        stroke(200);
        strokeWeight(3);
        text("tail/" + currentElement, x, y + (diameter / 2) + 20);
        linkedList.removeTail();
        removeTail=false;
        index=10;
        refreshSearch();
      }

      // else if(i+1===linkedList.size && elapsedTime > animationSpacing*i + animationTenure+500){
      //   updateSearchAlgorithm(3);
      //   stroke(0,100,67);
      //   textAlign(CENTER, CENTER);
      //   textSize(20);
      //   text("Not Found", x, y+(diameter/2)+50);
      //   updateSearchAlgorithm(4);
      // }
      current=current.next;
    }
  }

  if(removeAny && linkedList.size>0 && isPlaying){
    console.log(linkedList.head);
    let current = linkedList.head;
    let size = linkedList.size;
    if(addIndex==(linkedList.size-2)){
      console.log("true...");
      stepValue=100/(addIndex*2);
    }
    else{
      stepValue=100/((addIndex*2)+1);
    }
    console.log(stepValue);
    // let stepValue=addIndex===(linkedList.size-2)?(100/(addIndex*2)):(100/((addIndex*2)+1));
    let progressValue=stepValue;
    console.log(size);
    let i = 0;
    let insertion = false;
    let nextClearance = false;
    let indexElement = false;
    let elapsedTime = millis() - animationStartTime;
    updateRemoveSpecificAlgorithm(0);

    while(i<(linkedList.size)){
      // if(i===addIndex){
      //   console.log("Checking...");
      //   i++;
      //   current=current.next;
      //   continue;
      // }
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
          if(i===0){
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 50);
          }
          else if(i===linkedList.size-1){
            updateRemoveSpecificAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 50);
          }
          else{
            updateRemoveSpecificAlgorithm(1);
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            text("temp/" + currentElement, x, y + (diameter / 2) + 20);
          }
        }

        if(i===addIndex-1){
          console.log("Drawing...");

          // updateRemoveSpecificAlgorithm(3);
          // updateProgressBar(progressValue);
          // progressValue=progressValue+stepValue;

          if(fixedStart===0){
            fixedStart=startX;
          }
          let x = fixedStart + addIndex*(diameter+spacing);
          let y = (height / 2) - 100;
          let progress = constrain((elapsedTime - animationSpacing*i) / animationDuration,0,1);
          let animatedDiameter = lerp(0, diameter, progress);
          fill(51,100,72, 50);
          ellipse(x, y, animatedDiameter, animatedDiameter);
          fill(0,0,0);
          textAlign(CENTER, CENTER);
          textSize(20);
          text(current.next.data, x, y);
          fill(51,100,72);
          textAlign(CENTER, CENTER);
          let textSi = lerp(0,15,progress);
          textSize(textSi);
          text("del/" + addIndex, x, y + (diameter / 2) + 20);
          
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
          console.log("Clearing Extra");
          updateRemoveSpecificAlgorithm(4);
          
          let datapointX = fixedStart + (addIndex) * (diameter + spacing);
          let datapointY = (height / 2) - 100;
          fill(0);
          noStroke();
          if(i+1===size || i===0){
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            rect(datapointX - (diameter / 2) - (spacing/2) , datapointY - (diameter / 2) - 5, diameter+(spacing)+5, diameter*2);
          }
          else{
            updateProgressBar(progressValue);
            progressValue=progressValue+stepValue;
            rect(datapointX - (diameter / 2) - (spacing/2) , datapointY - (diameter / 2) - 5, diameter+(spacing)+5, diameter*2);
          }
          stroke(200);
          insertion=false;
          indexElement=true;
        }

        if(nextClearance===true){
          console.log("Clearance Checking...");
          for(let i=addIndex;i<linkedList.size;i++){
            console.log("Clearing Extra Blanks...");
            let datapointX = fixedStart + i * (diameter + spacing);
            let datapointY = (height / 2) - 100;
            fill(0);
            noStroke();
            if(i+1===size || i===0 || (i-1)===0){
              updateProgressBar(progressValue);
              progressValue=progressValue+stepValue;
              rect(datapointX - (diameter / 2) - (spacing/2) , datapointY - (diameter / 2) - 5, diameter+(spacing)+5, diameter*2);
            }
            else{
              rect(datapointX - (diameter / 2) - (spacing/2) , datapointY - (diameter / 2) - 5, diameter+(spacing)+5, diameter*2);
            }
            stroke(200);
          }
          nextClearance=false;
        }

        if(indexElement && i>(addIndex-1)){
          let x = fixedStart + i * (diameter + spacing);
          let y = (height / 2) - 100;
          let datapointX = fixedStart + (i-1) * (diameter + spacing);
          let datapointY = (height / 2) - 100;
          
          fill(0);
          noStroke();
          if(i+1===size || i===0 || (i-1)===0){
            rect(datapointX - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
            rect(x - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
          }
          else{
            rect(datapointX - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 10, diameter+(spacing)+5, diameter*3);
            rect(x - (diameter / 2) - (spacing/2) , datapointY + (diameter/2) + 40, diameter+(spacing)+5, diameter*3);
          }
          stroke(200);
          nextClearance=true;
          indexElement=false;
        }

        if(i>(addIndex)){
          console.log("Create...");
          updateRemoveSpecificAlgorithm(5);
          let updates = constrain((elapsedTime - animationSpacing*i) / animationTenure,0,1);
          let animatedDiameter1 = lerp(0, diameter, updates);
          
          if(fixedStart===0){
            fixedStart=startX;
          }
          let x = fixedStart + (i-1) * (diameter + spacing);
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
            // updateInsertAnyAlgorithm(4);
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
            updateProgressBar(100);
            stroke(200);
            strokeWeight(3);
            textAlign(CENTER, CENTER);
            let textS = lerp(0,20,updates);
            textSize(textS);
            text(`tail/${i}`, x, y+(diameter/2)+20);
            linkedList.removeSpecific(addIndex);
            console.log(linkedList);
            index=10
            refreshSearch();
            removeAny=false;
          }
        }

        if(i<addIndex-1 && elapsedTime > animationSpacing*i + animationTenure + 500){
          updateRemoveSpecificAlgorithm(2);
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