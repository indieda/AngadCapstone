import { Accelerometer } from "accelerometer";
import { Barometer } from "barometer";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import document from "document";
import { Gyroscope } from "gyroscope";
import { HeartRateSensor } from "heart-rate";
import { OrientationSensor } from "orientation";
import { vibration } from "haptics";
import { today } from "user-activity";
import { me } from "appbit";
import clock from "clock";
import exercise from "exercise";


const timer = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const hrmLabel = document.getElementById("hrm-label");
const hrmData = document.getElementById("hrm-data");
const stepsLabel = document.getElementById("steps-label");
const stepsData = document.getElementById("steps-data");
//Math.random();
var listVibrationCheck = [false,false,false,false,false,false];
var counter = document.getElementById("counter");
var counts = 0;
var counterList = [0,0,0,0,0,0];
var randTracker = [generateThreshold(0),generateThreshold(300),generateThreshold(600),generateThreshold(900),generateThreshold(1200),generateThreshold(1500)];

function generateThreshold(a){
  var b = a + (Math.random()*300);
  return b;
}

 counterList[0] = document.getElementById("counter_time_1");
 counterList[1] = document.getElementById("counter_time_2");
 counterList[2] = document.getElementById("counter_time_3");
 counterList[3] = document.getElementById("counter_time_4");
 counterList[4] = document.getElementById("counter_time_5");
 counterList[5] = document.getElementById("counter_time_6");

  counter.text = "Vibrations given: " + counts;
function ring(){
  vibration.start("alert");
  counterList[counts].text = "Time of vibration " + counts + ": " + Math.floor((exercise.stats.activeTime/(1000*60))%60) + "Min" + Math.floor((exercise.stats.activeTime/1000)%60)+"sec";
  counts ++;
  counter.text = "Vibrations given: " + counts;
  
//  setTimeout(, 4000);
//  vibration.stop();
/*
 "alert" (... - ... -) not bad!
"bump" (too light, not good)
"confirmation"
"confirmation-max"
"nudge"
"nudge-max" (too light a tap!)
"ping" (just 2, not enough yet.)
"ring"
*/
}

var startTimer;
var hrm;
var startTodaysStepsUpdate;
var todayStepsFlag;


//Function to refresh the timer
function refreshExerciseTimer(){
  //Set the minutes and seconds.
  timer.text = "Timer: " + Math.floor((exercise.stats.activeTime/(1000*60))%60) + "Min" + Math.floor((exercise.stats.activeTime/1000)%60)+"sec";
  //Set the heart rate values.
  hrmData.text = exercise.stats.heartRate["current"];
  //Set the step data values.
  stepsData.text = exercise.stats.steps; 
  var secondsSinceStart = exercise.stats.activeTime/1000;
  

  if ((secondsSinceStart > randTracker[0]) && (secondsSinceStart < 300)){
    if (!listVibrationCheck[0]){
      console.log(secondsSinceStart);
      console.log(Math.random()*300);
      ring();
      listVibrationCheck[0] = true;
      console.log(listVibrationCheck);
    }
  }
  else if ((secondsSinceStart > randTracker[1]) && (secondsSinceStart < 600)){
    if (!listVibrationCheck[1]){
      console.log(secondsSinceStart);
      ring();
      listVibrationCheck[1] = true;
      console.log(listVibrationCheck);
    }
  }
  else if ((secondsSinceStart > randTracker[2]) && (secondsSinceStart < 900)){
    if (!listVibrationCheck[2]){
      console.log(secondsSinceStart);
      ring();
      listVibrationCheck[2] = true;
      console.log(listVibrationCheck);
    }
      }
  else if ((secondsSinceStart > randTracker[3]) && (secondsSinceStart < 1200)){
    if (!listVibrationCheck[3]){
      console.log(secondsSinceStart);
      ring();
      listVibrationCheck[3] = true;
      console.log(listVibrationCheck);
    }
    
  }
  else if ((secondsSinceStart > randTracker[4]) && (secondsSinceStart < 1500)){
    if (!listVibrationCheck[4]){
      console.log(secondsSinceStart);
      ring();
      listVibrationCheck[4] = true;
      console.log(listVibrationCheck);
    }
    
  }
  else if ((secondsSinceStart > randTracker[5]) && (secondsSinceStart < 1800)){
    if (!listVibrationCheck[5]){
      console.log(secondsSinceStart);
      ring();
      listVibrationCheck[5] = true;
      console.log(listVibrationCheck);
    } 
  }
}


//Start button logic
startButton.onactivate = function(evt) {
  console.log("STARTED");
  hrm.stop();
  clearInterval(startTodaysStepsUpdate);
  todayStepsFlag = false;
  

  //Checks to make sure that it is on the start screen, not paused.
  if (startButton.style.fill == "#00A629"){
    //Triggers the start
    startButton.style.fill = "#FF7F50";
    startButton.text = "Pause!"; 
    startButton.image = "stop.png";
    //Starting a new exercise
    if (exercise.state == "paused") {
      exercise.resume();
      console.log("resuming");
    }
    //Resuming an exercise
    else {
      exercise.start("treadmill");
      console.log("starting fresh");
      startTimer = setInterval(refreshExerciseTimer,1000);
    }
  }
  
  else{
    //Triggers a pause
    startButton.style.fill = "#00A629";
    startButton.text = "Start!";
    startButton.image = "play.png";
    exercise.pause();
  }

}





function stopExercise() {
  console.log("STOPPED");
  startButton.style.fill = "#00A629";
  startButton.text = "Start!";
  startButton.image = "play.png";
  clearInterval(startTimer);
}


//Stop button logic
stopButton.onactivate = function(evt) {
  try{
    console.log(exercise.stats.steps);
    stopExercise();
    exercise.stop(); 
  }
  catch(error){
    console.log(error);

  }
  if(todayStepsFlag == false){
    startHeartSensor();
    //Uncomment below if you want the steps to continue counting on stopping.
    //startTodaysStepsUpdate = setInterval(refreshSteps, 1000);
    todayStepsFlag = true;
  }
}



function startHeartSensor(){
  if (HeartRateSensor) {
  hrm = new HeartRateSensor({ frequency: 1});
  hrm.addEventListener("reading", () => {
   hrmData.text = JSON.stringify(hrm.heartRate);
    if (parseInt(JSON.stringify(hrm.heartRate)) >= 100 ) 
    {
      console.log("heart rate more than 100!");
      console.log(hrm.heartRate);
      vibration.start("ring");
                                         }

  });
  sensors.push(hrm);
  hrm.start();
} else {
  hrmLabel.style.display = "none";
  hrmData.style.display = "none";
};
}

const sensors = [];

function refreshSteps() {
  stepsData.text = today.local.steps;
}





display.addEventListener("change", () => {
  // Automatically stop all sensors when the screen is off to conserve battery
  display.on ? sensors.map(sensor => sensor.start()) : sensors.map(sensor => sensor.stop());
});

startHeartSensor();
startTodaysStepsUpdate = setInterval(refreshSteps, 1000);
todayStepsFlag = true;



//myButton.addEventListener("click", (evt) => {
//    console.log("CLICKED UP");
//});

/*
if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    hrmData.text = JSON.stringify({
      heartRate: hrm.heartRate ? hrm.heartRate : 0
    });
    if (parseInt(JSON.stringify(hrm.heartRate)) >= 100 ) 
    {
      console.log("heart rate more than 100!");
      vibration.start("ring");
                                         }
    
  });
  sensors.push(hrm);
  hrm.start();
} else {
  hrmLabel.style.display = "none";
  hrmData.style.display = "none";
}

*/



/* 
const barLabel = document.getElementById("bar-label");
const barData = document.getElementById("bar-data");
 */
/* const bpsLabel = document.getElementById("bps-label");
const bpsData = document.getElementById("bps-data");

const gyroLabel = document.getElementById("gyro-label");
const gyroData = document.getElementById("gyro-data");
 */


/* const orientationLabel = document.getElementById("orientation-label");
const orientationData = document.getElementById("orientation-data");
 */


/*
if (Accelerometer) {
  const accel = new Accelerometer({ frequency: 1 });
  accel.addEventListener("reading", () => {
    accelData.text = JSON.stringify({
      x: accel.x ? accel.x.toFixed(1) : 0,
      y: accel.y ? accel.y.toFixed(1) : 0,
      z: accel.z ? accel.z.toFixed(1) : 0
    });
  });
  sensors.push(accel);
  accel.start();
} else {
  accelLabel.style.display = "none";
  accelData.style.display = "none";
}*/





/*
if (BodyPresenceSensor) {
  const bps = new BodyPresenceSensor();
  bps.addEventListener("reading", () => {
    bpsData.text = JSON.stringify({
      presence: bps.present
    })
  });
  sensors.push(bps);
  bps.start();
} else {
  bpsLabel.style.display = "none";
  bpsData.style.display = "none";
}
*/



/*
if (Gyroscope) {
  const gyro = new Gyroscope({ frequency: 1 });
  gyro.addEventListener("reading", () => {
    gyroData.text = JSON.stringify({
      x: gyro.x ? gyro.x.toFixed(1) : 0,
      y: gyro.y ? gyro.y.toFixed(1) : 0,
      z: gyro.z ? gyro.z.toFixed(1) : 0,
    });
  });
  sensors.push(gyro);
  gyro.start();
} else {
  gyroLabel.style.display = "none";
  gyroData.style.display = "none";
}

*/


/*
if (OrientationSensor) {
  const orientation = new OrientationSensor({ frequency: 60 });
  orientation.addEventListener("reading", () => {
    orientationData.text = JSON.stringify({
      quaternion: orientation.quaternion ? orientation.quaternion.map(n => n.toFixed(1)) : null
    });
  });
  sensors.push(orientation);
  orientation.start();
} else {
  orientationLabel.style.display = "none";
  orientationData.style.display = "none";
}
*/







