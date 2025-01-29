import * as THREE from "three";
import { OrbitControls, ThreeMFLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import gsap from "gsap";

const w = window.innerWidth;
const h = window.innerHeight;

let value1 = 0;

let value2 = 0;

let Anim = [];

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
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
const near = 0.1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.x = -4;
camera.position.y = 4;
camera.position.z = 3;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;

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

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
labelRenderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(labelRenderer.domElement);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(this.window.innerWidth, this.window.innerHeight);
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
document.getElementById("Next").appendChild(nextButton);
nextButton.setAttribute('id', 'toNext');
nextButton.setAttribute('style', 'border:none;');
nextButton.setAttribute('class', 'nextButton');

const nextIMG = document.createElement('img');
document.getElementById('toNext').appendChild(nextIMG);
nextIMG.setAttribute('src', 'assets/Siguiente.png');
nextIMG.setAttribute('class', 'nextIMG');

const nextLabel= new CSS2DObject(nextButton);
scene.add(nextLabel);
nextLabel.position.set(0, 0, 0);

nextButton.addEventListener('click', function(e) {stepButtonFun()});

//--------------------------------------------------------------

// Botón para paso anterior ------------------------------------

const prevButton = document.createElement('button');
document.getElementById("Previous").appendChild(prevButton);
prevButton.setAttribute('id', 'toPrev');
prevButton.setAttribute('style', 'border:none;');
prevButton.setAttribute('class', 'prevButton');

const prevIMG = document.createElement('img');
document.getElementById('toPrev').appendChild(prevIMG);
prevIMG.setAttribute('src', 'assets/Anterior.png');
prevIMG.setAttribute('class', 'prevIMG');

const prevLabel = new CSS2DObject(prevButton);
scene.add(prevLabel);
prevLabel.position.set(0, 0, 0);

prevButton.addEventListener('click', function(e) {prevButtonFun()});

// Botón para reiniciar los pasos ------------------------------

const resetButton = document.createElement('button');
document.getElementById("Reset").appendChild(resetButton);
resetButton.setAttribute('id', 'toReset');
resetButton.setAttribute('style', 'border:none;');
resetButton.setAttribute('class', 'resetButton');

const resetIMG = document.createElement('img');
document.getElementById('toReset').appendChild(resetIMG);
resetIMG.setAttribute('src', 'assets/Restart.png');
resetIMG.setAttribute('class', 'resetIMG');

const resetLabel = new CSS2DObject(resetButton);
scene.add(resetLabel);
resetLabel.position.set(0, 0, 0);

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
    mixer.timeScale = 1;
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
    mixer.timeScale = -1;
  }
}


const GLoader = new GLTFLoader();
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

  model.traverse(function(node)
  {
    if(node.isMesh)
    {
      node.castShadow = true;
    }
  });

  gltf.asset;}, 
    function(xhr) {console.log(( xhr.loaded/xhr.total * 100 ) + '%loaded');},
    function(error) {console.log('An error happened');}
);

function animate()
{
    requestAnimationFrame(animate);

    labelRenderer.render(scene, camera);

    renderer.render(scene, camera);

    mixer.update(1/60);

    controls.update();
}

animate();
