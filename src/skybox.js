import * as THREE from 'three';
import { DirectionalLightHelper, Fog, PointLightHelper } from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

if (WEBGL.isWebGLAvailable()) {
  // 장면 추가
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // axes helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // 카메라 추가
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    4000
  );
  camera.position.set(0, 20, 100);
  camera.lookAt(0, 0, 0);

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 카메라 이후에 등장 필요
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 20; // 최소줌
  controls.maxDistance = 800; // 최대줌
  controls.update();

  // 빛
  const light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(light);

  const skyMaterialArr = [];
  const texture_ft = new THREE.TextureLoader().load(
    '../static/images/penguins-2/arid2_ft.jpg'
  );
  const texture_bk = new THREE.TextureLoader().load(
    '../static/images/penguins-2/arid2_bk.jpg'
  );
  const texture_up = new THREE.TextureLoader().load(
    '../static/images/penguins-2/arid2_up.jpg'
  );
  const texture_dn = new THREE.TextureLoader().load(
    '../static/images/penguins-2/arid2_dn.jpg'
  );
  const texture_rt = new THREE.TextureLoader().load(
    '../static/images/penguins-2/arid2_rt.jpg'
  );
  const texture_lf = new THREE.TextureLoader().load(
    '../static/images/penguins-2/arid2_lf.jpg'
  );

  skyMaterialArr.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_up,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  );

  for (let i = 0; i < skyMaterialArr.length; i++) {
    skyMaterialArr[i].side = THREE.BackSide;
  }

  // 매쉬 추가
  const skyGeometry = new THREE.BoxGeometry(2400, 2400, 2400);
  //   const skyMaterial = new THREE.MeshStandardMaterial({
  //     color: 0x333333,
  //     // map: texture,
  //   });

  //   skyMaterial.side = THREE.BackSide;
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArr);
  scene.add(sky);

  function animate(time) {
    renderer.render(scene, camera);

    requestAnimationFrame(animate);

    controls.update();
  }
  animate();

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
