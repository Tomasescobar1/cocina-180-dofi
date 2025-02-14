import * as THREE from "three";
import { OrbitControls} from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import gsap from "gsap";

const w = window.innerWidth;
const h = window.innerHeight;

let value1 = 0;

let value2 = 0;

let percentValue = 0;

let Anim = [];

let posMat = [ [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0],
[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0] ];

for(let i = 0; i < 5; i++)
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

            posMat[i][j] = 3.0391814696;

          break;

          case 2:

            posMat[i][j] = 0.8988204298;

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
renderer.shadowMap.enabled = false;
renderer.setClearColor(0xB0C4DE, 0.5);

const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(7);

let mixer = new THREE.AnimationMixer();

scene.add(axesHelper);
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
controls.maxDistance = 7;

const dirLight = new THREE.DirectionalLight(0xFFFFFF, 2.0);
const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);
dirLight.castShadow = true;
dirLight.position.x = -1.5;
dirLight.position.y = 3.1;
dirLight.position.z = 1.3;
dirLight.rotateY(1.0);
dirLight.rotateZ(0.8);
scene.add(dirLight);
scene.add(dirLightHelper);

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

nextButton.addEventListener('click', function(e) {stepButtonFun()});

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

resetButton.addEventListener('click', function(e) {pauseButtonFun()});

//--------------------------------------------------------------

function stepButtonFun()
{
  if(value2 == 1)
  {
    location.reload();
  }
  else
  {
    value1++;
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
  }
}

function pauseButtonFun()
{
  mixer.timeScale = 0;
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
