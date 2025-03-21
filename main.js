import * as THREE from "three";
import { OrbitControls} from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import gsap from "gsap";

const w = window.innerWidth;
const h = window.innerHeight;

//let value1 = 0;

let value2 = 0;

let value3 = 0;

let percentValue = 0;

let timeOutVal = 0;

let Anim = [];

let posMat = [ [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0] ];

for(let i = 0; i < 14; i++)
{
  for(let j = 0; j < 3; j++)
  {
    switch(i)
    {
      case 0:

      switch(j)
      {
        case 0:

          posMat[i][j] = -2.0855472;

        break;

        case 1:

          posMat[i][j] = 3.1297394;

        break

        case 2:

          posMat[i][j] = 0.76261586;

        break;
      }

      break;

      case 1:

        switch(j)
        {
          case 0:

            posMat[i][j] = -1.6697457972682947;

          break;

          case 1:

            posMat[i][j] = 2.228107684497154;

          break;

          case 2:

            posMat[i][j] = 1.3085660779353273;

          break;

        }

      break;

      case 2:

        switch(j)
        {
          case 0:

            posMat[i][j] = -1.68364751;

          break;

          case 1:

            posMat[i][j] = 3.2391814696;

          break;

          case 2:

            posMat[i][j] = 1.1988204298;

          break;

        }

      break;

      case 3:

        switch(j)
        {
          case 0:

            posMat[i][j] = -2.443641488017427;

          break;

          case 1:

            posMat[i][j] = 3.216144723853674;

          break;

          case 2:

            posMat[i][j] = 1.9149934134205338;

          break;
        }

      break;

      case 4:

        switch(j)
        {
          case 0:

            posMat[i][j] = -2.28817277;

          break;

          case 1:

            posMat[i][j] = 3.667835732;

          break;

          case 2:

            posMat[i][j] = 0.96396711850;

          break;
        }

      break;

      case 5:

        switch(j)
        {
          case 0:

            posMat[i][j] = -2.68817277;

          break;

          case 1:

            posMat[i][j] = 3.667835732;

          break;

          case 2:

            posMat[i][j] = 1.76396711850;

          break;
        }

      break;

      case 6:

        switch(j)
        {
          case 0:

            posMat[i][j] = -2.466400025563929;

          break;

          case 1:

            posMat[i][j] = 2.7049730216086663;

          break;

          case 2:

            posMat[i][j] = 1.820342608864927;

          break;
        }

      break;

      case 7:

        switch(j)
        {
          case 0:

            posMat[i][j] = -6.96994425311808;

          break;

          case 1:

            posMat[i][j] = 2.604488852821634;

          break;

          case 2:

            posMat[i][j] = 0.8031823150304553;

          break;
        }

      break;

      case 8:

        switch(j)
        {
          case 0:

            posMat[i][j] = -5.86994425311808;

          break;

          case 1:

            posMat[i][j] = 2.604488852821634;

          break;

          case 2:

            posMat[i][j] = 0.8031823150304553;

          break;
        }

      break;

      case 9:

        switch(j)
        {
          case 0:

            posMat[i][j] = -3.96994425311808;

          break;

          case 1:

            posMat[i][j] = 4.504488852821634;

          break;

          case 2:

           posMat[i][j] = 0.6031823150304553;

          break;
        }

      break;

      case 10:

        switch(j)
        {
          case 0:

            posMat[i][j] = -3.96994425311808;

          break;

          case 1:

            posMat[i][j] = 4.504488852821634;

          break;

          case 2:

           posMat[i][j] = 0.6031823150304553;

          break;
        }

      break;

      case 11:

        switch(j)
        {
          case 0:

            posMat[i][j] = -4.16994425311808;

          break;

          case 1:

            posMat[i][j] = 4.504488852821634;

          break;

          case 2:

           posMat[i][j] = 0.6031823150304553;

          break;
        }

      break;
      
    }
  }
}

for(let row of posMat)
{
  const rowString = row.join(' ');
  console.log(rowString);
}

let popupMessage = document.getElementById("popupWindow");

let smokeyCurtain = document.querySelector(".smokeyCurtain");

let closeButton = document.getElementById("close");

let progressBarElement = document.getElementById("progress-bar");

let progressBar = document.getElementById("bar");

let loadingThrobber = document.getElementById("loadingSpinner");

let userBar = document.getElementById("userBar");

const GLoader = new GLTFLoader()

closeButton.addEventListener("click", function(e){closePopup()});

window.addEventListener("load", function() {
  popupMessage.classList.add("open-welcomeWindow");
  smokeyCurtain.classList.add("open-welcomeWindow");  
});

function closePopup()
{
  popupMessage.classList.remove("open-welcomeWindow"); 

  smokeyCurtain.classList.remove("open-welcomeWindow");

  progressBarElement.classList.add("open-welcomeWindow");

  nextButton.addEventListener('click', function(e) {safeTimeOut()});

  //userBar.classList.add("openStepSign");

  GLoader.load("assets/cocina_180_mi.glb", function (gltf) {

    let animations = gltf.animations;

    gltf.scene;
    gltf.scenes;
    gltf.cameras;

    const model = gltf.scene;

    for(let i = 0; i <= 403; i++)
    {
      Anim[i] = mixer.clipAction(animations[i], model); 
    }

    scene.add(model);

    for(let i = 0; i <= 403; i++)
    {
      Anim[i].clampWhenFinished = true;

      Anim[i].setLoop(THREE.LoopOnce);

      mixer.timeScale = 0;

      Anim[i].play();
    }

    model.translateY(1.7);
    model.translateZ(-0.0);
    model.translateX(0.0);
    model.rotateX(0.0);

    gltf.asset;}, 
      function(xhr) {percentValue = xhr.loaded/xhr.total * 100;

        progressBar.style.setProperty("--width", percentValue);

        console.log(percentValue);

        setTimeout(function(){
          if(percentValue >= 100)
            {
              progressBarElement.classList.remove("open-welcomeWindow");
            }
        }, 2000);
      },
      function(error) {console.log('An error happened');}
  );
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xB0C4DE, 0.5);

const scene = new THREE.Scene();
//const axesHelper = new THREE.AxesHelper(7);

let mixer = new THREE.AnimationMixer();

//scene.add(axesHelper);
scene.background = new THREE.Color(0Xffffff);

const planeGeo = new THREE.PlaneGeometry(30, 30);
const planeMat = new THREE.MeshPhongMaterial({color: 0XFFFFFF, shininess:1200})
const plane1 = new THREE.Mesh(planeGeo, planeMat);
plane1.rotateX(Math.PI/-2);
scene.add(plane1);
plane1.receiveShadow = true;

const aspect = w/h;
const fov = 50;
let near = 0.1;
let far = 50;
let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-4,4,3);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.maxAzimuthAngle = Math.PI/2;
controls.maxDistance = 15;

const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.0);
//const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);
dirLight.castShadow = true;
dirLight.position.x = -1.5;
dirLight.position.y = 3.1;
dirLight.position.z = 1.3;
dirLight.rotateY(1.0);
dirLight.rotateZ(0.8);
scene.add(dirLight);
//scene.add(dirLightHelper);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemiLight);

/*const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);*/

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function safeTimeOut()
{

    console.log(timeOutVal);

    value3++;

    nextButton.classList.add("buttonDisable");

    loadingThrobber.classList.add("throbberAnim");

    stepButtonFun(value3);

    if(value3 == 15)
    {
      timeOutVal = 7500;
    }
    else
    {
      timeOutVal = 6500;
    }

    setTimeout(function incrementValue(){

      loadingThrobber.classList.remove("throbberAnim");

      nextButton.classList.remove("buttonDisable");

      }, timeOutVal

    );

}

function completedAnims()
{
  if(mixer.timeScale == 1)
  {
    value2 = 1;
  }
  else if (mixer.timeScale == -1)
  {
    value2 = -1;
  }
}

let stepOne = document.getElementById("stepOne");
let stepTwo = document.getElementById("stepTwo");
let stepThree = document.getElementById("stepThree");
let stepFour = document.getElementById("stepFour");
let stepFive = document.getElementById("stepFive");
let stepSix = document.getElementById("stepSix");
let stepSeven = document.getElementById("stepSeven");
let stepEight = document.getElementById("stepEight");
let stepNine = document.getElementById("stepNine");
let stepTen = document.getElementById("stepTen");
let stepEleven = document.getElementById("stepEleven");
let stepTwelve = document.getElementById("stepTwelve");
let stepThirteen = document.getElementById("stepThirteen");
let stepFourteen = document.getElementById("stepFourteen");
let stepFifteen = document.getElementById("stepFifteen");
let stepSixteen = document.getElementById("stepSixteen");

let finalStepVideo = document.getElementById("congratsVideo");

function stepSignHide(input)
{
  switch(input)
  {
    case 1:

      stepOne.classList.remove("openStepSign");

    break;

    case 4:

      stepTwo.classList.remove("openStepSign");

    break;

    case 5:

      stepThree.classList.remove("openStepSign");

    break;

    case 6:

      stepFour.classList.remove("openStepSign");

    break;

    case 7:

      stepFive.classList.remove("openStepSign");

    break;

    case 9:

      stepSix.classList.remove("openStepSign");

    break;

    case 10:

      stepSeven.classList.remove("openStepSign");

    break;

    case 13:

      stepEight.classList.remove("openStepSign");

    break;

    case 15:

      stepNine.classList.remove("openStepSign");

    break;

    case 17:

      stepTen.classList.remove("openStepSign");

    break;

    case 18:

      stepEleven.classList.remove("openStepSign");

    break;

    case 19:

      stepTwelve.classList.remove("openStepSign");

    break;

    case 20:

      stepThirteen.classList.remove("openStepSign");

    break;

    case 21:

      stepFourteen.classList.remove("openStepSign");

    break;

    case 23:

      stepFifteen.classList.remove("openStepSign");

    break;

    case 25:

      stepSixteen.classList.remove("openStepSign");

    break;

  }
}

function stepSignShow(input)
{
  switch(input)
  {
    case 1:

      stepOne.classList.add("openStepSign");

    break;

    case 4:

      stepTwo.classList.add("openStepSign");

    break;

    case 5:

      stepThree.classList.add("openStepSign");

    break;

    case 6:

      stepFour.classList.add("openStepSign");

    break;

    case 7:

      stepFive.classList.add("openStepSign");

    break;

    case 9:

      stepSix.classList.add("openStepSign");

    break;

    case 11:

      stepSeven.classList.add("openStepSign");

    break;

    case 13:

      stepEight.classList.add("openStepSign");

    break;

    case 15:

      stepNine.classList.add("openStepSign");

    break;

    case 17: 
    
      stepTen.classList.add("openStepSign");

    break;

    case 18:

      stepEleven.classList.add("openStepSign");

    break;

    case 19:

      stepTwelve.classList.add("openStepSign");

    break;

    case 20:

      stepThirteen.classList.add("openStepSign");

    break;

    case 21:

      stepFourteen.classList.add("openStepSign");

    break;

    case 23:

      stepFifteen.classList.add("openStepSign");

    break;

    case 25:

      stepSixteen.classList.add("openStepSign");

    break;
  }
}

function stepAnimation(input)
{
  switch(input)
  {
    case 2:

      gsap.to(mixer.timeScale = 1, {duration: 5, onComplete: () => mixer.timeScale = 0});

    break;

    case 3:

      gsap.to(mixer.timeScale = 1, {duration: 5.5, onComplete: () => mixer.timeScale = 0});

    break;

    case 6:

      gsap.to(mixer.timeScale = 1, {duration: 6.5, onComplete: () => mixer.timeScale = 0});

    break;

    case 8:

      gsap.to(mixer.timeScale = 1, {duration: 2, onComplete: () => mixer.timeScale = 0});

    break;

    case 9:

      gsap.to(mixer.timeScale = 1, {duration: 1.3, onComplete: () => mixer.timeScale = 0});

    break;

    case 10:

      gsap.to(mixer.timeScale = 1, {duration: 1.1, onComplete: () => mixer.timeScale = 0});

    break;

    case 11:

      gsap.to(mixer.timeScale = 1, {duration: 3.7, onComplete: () => mixer.timeScale = 0});

    break;

    case 12:

      gsap.to(mixer.timeScale = 1, {duration: 3, onComplete: () => mixer.timeScale = 0});

    break;

    case 13:

      gsap.to(mixer.timeScale = 1, {duration: 3, onComplete: () => mixer.timeScale = 0});

    break;

    case 14:

      gsap.to(mixer.timeScale = 1, {duration: 1.3, onComplete: () => mixer.timeScale = 0});

    break;

    case 15:

      gsap.to(mixer.timeScale = 1, {duration: 2.4, onComplete: () => mixer.timeScale = 0});

    break;

    case 16:

      gsap.to(mixer.timeScale = 1, {duration: 7, onComplete: () => mixer.timeScale = 0});

    break;

    case 17:

      gsap.to(mixer.timeScale = 1, {duration: 3, onComplete: () => mixer.timeScale = 0});

    break;

    case 18:

      gsap.to(mixer.timeScale = 1, {duration: 4, onComplete: () => mixer.timeScale = 0});

    break;

    case 22:

      gsap.to(mixer.timeScale = 1, {duration: 6, onComplete: () => mixer.timeScale = 0});

    break;

    case 23:

      gsap.to(mixer.timeScale = 1, {duration: 2, onComplete: () => mixer.timeScale = 0});

    break;

    case 24:

      gsap.to(mixer.timeScale = 1, {duration: 4, onComplete: () => mixer.timeScale = 0});

    break;

    case 25:

      gsap.to(mixer.timeScale = 1, {duration: 2, onComplete: () => mixer.timeScale = 0});

    break;

    case 26:

      gsap.to(mixer.timeScale = 1, {duration: 8, onComplete: () => mixer.timeScale = 0});

    break;
  }
}

mixer.addEventListener('finished', function(e) {completedAnims()});

const dofiLink = document.createElement('a');
document.getElementById("Link-Picture").appendChild(dofiLink);
dofiLink.setAttribute('href', 'https://www.moduofi.com/industrias-dofi/');
dofiLink.setAttribute('id','Link-De-Dofi');
dofiLink.setAttribute('target', '_blank');

const LinkPicture = document.createElement('img');
document.getElementById("Link-De-Dofi").appendChild(LinkPicture);
LinkPicture.setAttribute('src', 'assets/Logo_Dofi.png');
LinkPicture.setAttribute('id','Logo-De-Dofi');
LinkPicture.setAttribute('class', 'stylePNG');

//Botón para siguiente paso ------------------------------------

const nextButton = document.createElement('button');
document.getElementById("ButtonsIn").appendChild(nextButton);
nextButton.setAttribute('id', 'toNext');
nextButton.setAttribute('style', 'border:none;');
nextButton.setAttribute('class', 'nextButton');

const nextIMG = document.createElement('img');
document.getElementById('toNext').appendChild(nextIMG);
nextIMG.setAttribute('src', 'assets/Siguiente.png');
nextIMG.setAttribute('class', 'nextIMG');

//nextButton.addEventListener('click', function(e) {safeTimeOut()});

//--------------------------------------------------------------

// Botón para paso anterior ------------------------------------

/*const prevButton = document.createElement('button');
document.getElementById("ButtonsIn").appendChild(prevButton);
prevButton.setAttribute('id', 'toPrev');
prevButton.setAttribute('style', 'border:none;');
prevButton.setAttribute('class', 'prevButton');

const prevIMG = document.createElement('img');
document.getElementById('toPrev').appendChild(prevIMG);
prevIMG.setAttribute('src', 'assets/Anterior.png');
prevIMG.setAttribute('class', 'prevIMG');

prevButton.addEventListener('click', function(e) {prevButtonFun()});*/

// Botón para reiniciar los pasos ------------------------------

const resetButton = document.createElement('button');
document.getElementById("ButtonsIn").appendChild(resetButton);
resetButton.setAttribute('id', 'toReset');
resetButton.setAttribute('style', 'border:none;');
resetButton.setAttribute('class', 'resetButton');

const resetIMG = document.createElement('img');
document.getElementById('toReset').appendChild(resetIMG);
resetIMG.setAttribute('src', 'assets/Restart.png');
resetIMG.setAttribute('class', 'resetIMG');

resetButton.addEventListener('click', function(e) {resetButtonFun()});

//--------------------------------------------------------------

function stepButtonFun(value1)
{
  if(value2 == 1 && value1 == 29)
  {
    location.reload();
  }

  console.log(value1);

  switch(value1)
  {

    case 1:
    
      gsap.to(camera.position, {x: posMat[0][0], y: posMat[0][1], z: posMat[0][2], duration: 1.5, onComplete: () => stepSignShow(value1)});

    break;

    case 2:

      console.log(camera.position);

      gsap.to(camera.position, {x: posMat[1][0], y: posMat[1][1], z: posMat[1][2], duration: 1.5});

    break;

    case 3:

      console.log(camera.position);

      gsap.to(camera.position, {x: posMat[2][0], y: posMat[2][1], z: posMat[2][2], duration: 1.5, onComplete: () => stepAnimation(value1)});
      
      stepSignHide(value1 - 2);

    break;

    case 4:

      console.log(camera.position);

      stepSignShow(value1);

    break;

    case 5:

      stepSignHide(value1 - 1);

      console.log(camera.position);

      gsap.to(camera.position, {x: posMat[3][0], y: posMat[3][1], z: posMat[3][2], duration: 1.5, onComplete: () => stepSignShow(value1)});

    break; 

    case 6:

      stepSignHide(value1 - 1);

      gsap.to(camera.position, {x: posMat[3][0], y: posMat[3][1], z: posMat[3][2], duration: 6.5, onComplete: () => stepSignShow(value1)});

      stepAnimation(value1);

    break;

    case 7: 

      stepSignHide(value1 - 1);

      console.log(camera.position);

      gsap.to(camera.position, {x: posMat[4][0], y: posMat[4][1], z: posMat[4][2], duration: 1.5, onComplete: () => stepSignShow(value1)});

    break;

    case 8:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

    break;

    case 9:

      stepSignShow(value1);

      gsap.to(camera.position, {x: posMat[5][0], y: posMat[5][1], z: posMat[5][2], duration: 1.5, onComplete: () => stepAnimation(value1)});

    break;

    case 10:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

    break;

    case 11:

      stepSignShow(value1);

      stepAnimation(value1);

    break;

    case 12:

      stepSignHide(value1 - 2);

      console.log(camera.position);

      gsap.to(camera.position, {x: posMat[6][0], y: posMat[6][1], z: posMat[6][2], onComplete: () => stepAnimation(value1)});

    break;

    case 13:

      stepSignShow(value1);

    break;

    case 14:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

    break;

    case 15:

      stepSignShow(value1);

      gsap.to(camera.position, {x: -4, y: 4, z: 3, duration: 1.5, onComplete: () => stepAnimation(value1)});

    break;

    case 16:

      stepSignHide(value1 - 1);

      console.log(camera.position);

      gsap.to(camera.position, {x: posMat[7][0], y: posMat[7][1], z: posMat[7][2], duration: 2.5, onComplete: () => stepAnimation(value1)});

    break;

    case 17:

      stepSignShow(value1);

      stepAnimation(value1);

    break;

    case 18:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

      gsap.to(camera.position, {x: posMat [7][0], y: posMat[7][1], z: posMat[7][2], duration: 1, onComplete: () => stepSignShow(value1)});

      console.log(camera.position);

    break;

    case 19:

      stepSignHide(value1 -1);

      gsap.to(camera.position, {x: posMat[8][0], y: posMat[8][1], z: posMat[8][2], duration: 1, onComplete: () => stepSignShow(value1)});

    break;

    case 20:

      stepSignHide(value1 - 1);

      gsap.to(camera.position, {x: posMat[8][0], y: posMat [8][1], z: posMat[8][2], duration: 1, onComplete: () => stepSignShow(value1)});

    break;

    case 21:

      stepSignHide(value1 - 1);

      gsap.to(camera.position, {x: (posMat[9][0]), y: posMat [9][1], z: posMat[9][2], duration: 1, onComplete: () => stepSignShow(value1)});

    break;

    case 22:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

    break;

    case 23:

      stepSignShow(value1);

      gsap.to(camera.position, {x: posMat[10][0], y: posMat[10][1], z: posMat[10][2], duration: 1.5, onComplete: () => stepAnimation(value1)});

    break;

    case 24:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

    break;

    case 25:

      stepSignShow(value1);

      gsap.to(camera.position, {x: posMat[11][0], y: posMat[11][1], z: posMat[11][2], duration: 1.5, onComplete: () => stepAnimation(value1)});

    break;

    case 26:

      stepSignHide(value1 - 1);

      stepAnimation(value1);

    break;

    case 27:

      gsap.to(camera.position, {x: -3.5, y: 3.5, z: 2, duration: 1.5});

      plane1.position.y = 1.15;

    break;

    case 28:

      finalStepVideo.play();

    break;
  }
}

function resetButtonFun()
{
  mixer.timeScale = 0;

  gsap.to(camera.position, {x: -4, y: 4, z: 3, onComplete: () => location.reload()});
}

function prevButtonFun()
{
  if(value2 == -1)
  {
    location.reload();
  }
  else
  {
    value1--;

    console.log(value1);
  }
}

function animate()
{
    requestAnimationFrame(animate);

    renderer.render(scene, camera);

    mixer.update(1/60);

    controls.update();
}

animate();
