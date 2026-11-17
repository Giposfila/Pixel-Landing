import * as THREE from 'three';

const isRussian = document.documentElement.lang === 'ru';
const translations = {
  "Close menu": "Закрыть меню",
  "Open menu": "Открыть меню",
  "Cut + finish": "Стрижка + укладка",
  "Colour + tone": "Цвет + тонирование",
  "Style + reset": "Уход + укладка",
  "01 / Choose your service": "01 / Выберите услугу",
  "Good hair<br>starts here.": "Ваш новый образ<br>начинается здесь.",
  "Pick your service. We’ll take care of the rest.": "Выберите услугу. Остальное мы возьмём на себя.",
  "FROM": "ОТ",
  "MIN": "МИН",
  "All prices are gender neutral. A consultation is included with every visit.<br>This is a booking preview. No appointment will be reserved.": "Цена не зависит от пола. Консультация включена в каждый визит.<br>Это демоверсия записи. Визит не будет забронирован.",
  "02 / Your appointment": "02 / Ваш визит",
  "Make it a<br>good hair day.": "Время для<br>нового образа.",
  "from": "от",
  "minutes": "мин",
  "Consultation included": "Консультация включена",
  "Your preferred date": "Удобная дата",
  "Your preferred time": "Удобное время",
  "Demo appointments only. This preview does not check availability or reserve a chair.": "Демонстрация записи. Доступность времени не проверяется, визит не бронируется.",
  "Preview appointment": "Посмотреть запись",
  "← Change service": "← Выбрать другую услугу",
  "03 / Appointment preview": "03 / Предварительная запись",
  "Looking good.": "Всё готово.",
  "This is a sample appointment, not a confirmed booking. Contact the studio to arrange your visit.": "Это пример записи, а не подтверждённая бронь. Свяжитесь со студией, чтобы договориться о визите.",
  "Contact the studio": "Связаться со студией",
  "← Back to the studio": "← Вернуться на сайт",
  "Pixel Hair Studio · 24 Redchurch Street, London E2 7DP": "Pixel Hair Studio · 24 Redchurch Street, Лондон E2 7DP"
};
const t = text => isRussian ? (translations[text] ?? text) : text;


const motion = matchMedia('(prefers-reduced-motion: reduce)');
const nav = document.querySelector('nav');
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? t("Close menu") : t("Open menu")); menu.textContent = open ? '×' : '☰'; nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', t("Open menu")); menu.textContent = '☰'; }));

// Content stays visible if JavaScript or WebGL is unavailable.
if (!motion.matches && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-enabled');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.09 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

const booking = document.querySelector('#booking');
const content = document.querySelector('#booking-content');
const services = [{name:t("Cut + finish"), price:65, duration:60}, {name:t("Colour + tone"), price:110, duration:120}, {name:t("Style + reset"), price:40, duration:45}];
let chosen = 0;
let trigger;
function openBooking(index, source) { trigger = source; if (index === undefined) chooseService(); else { chosen = index; appointment(); } booking.showModal(); }
function chooseService() {
  content.innerHTML = `<p class="eyebrow">${t("01 / Choose your service")}</p><h2 id="booking-title" class="dialog-title">${t("Good hair<br>starts here.")}</h2><p>${t("Pick your service. We\u2019ll take care of the rest.")}</p><div class="booking-options">${services.map((s,i) => `<button class="booking-option" data-choice="${i}"><span><strong>${s.name}</strong><small>${t("FROM")} £${s.price} / ${s.duration} ${t("MIN")}</small></span><span aria-hidden="true">↗</span></button>`).join('')}</div><p class="booking-note">${t("All prices are gender neutral. A consultation is included with every visit.<br>This is a booking preview. No appointment will be reserved.")}</p>`;
  content.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => { chosen = Number(button.dataset.choice); appointment(); content.querySelector('input').focus(); }));
}
function appointment() {
  const s = services[chosen];
  const minDate = new Date(); minDate.setDate(minDate.getDate()+1);
  const dateString = `${minDate.getFullYear()}-${String(minDate.getMonth()+1).padStart(2,'0')}-${String(minDate.getDate()).padStart(2,'0')}`;
  content.innerHTML = `<p class="eyebrow">${t("02 / Your appointment")}</p><h2 id="booking-title" class="dialog-title">${t("Make it a<br>good hair day.")}</h2><div class="booking-summary"><strong>${s.name} / ${t("from")} £${s.price}</strong><p>${s.duration} ${t("minutes")} · ${t("Consultation included")}<br>${t("Pixel Hair Studio \u00b7 24 Redchurch Street, London E2 7DP")}</p></div><form id="booking-form"><label class="field">${t("Your preferred date")}<input name="date" type="date" min="${dateString}" value="${dateString}" required></label><label class="field">${t("Your preferred time")}<select name="time"><option>10:00</option><option>11:30</option><option>14:00</option><option>15:30</option></select></label><p class="booking-note">${t("Demo appointments only. This preview does not check availability or reserve a chair.")}</p><button class="button submit-booking" type="submit">${t("Preview appointment")} <span>↗</span></button></form><button class="back-button">${t("\u2190 Change service")}</button>`;
  content.querySelector('.back-button').addEventListener('click', () => { chooseService(); content.querySelector('button').focus(); });
  content.querySelector('form').addEventListener('submit', event => { event.preventDefault(); const values = new FormData(event.currentTarget); const date = new Date(`${values.get('date')}T12:00:00`); const formatted = date.toLocaleDateString(isRussian ? 'ru-RU' : 'en-GB',{weekday:'long',day:'numeric',month:'long'}); content.innerHTML = `<p class="eyebrow">${t("03 / Appointment preview")}</p><div class="success-mark" aria-hidden="true">[ ✓ ]</div><h2 id="booking-title" class="dialog-title">${t("Looking good.")}</h2><div class="booking-summary"><strong>${s.name}</strong><p>${formatted} ${isRussian ? 'в' : 'at'} ${values.get('time')}<br>${s.duration} ${t("minutes")} / ${t("from")} £${s.price}</p></div><p class="booking-note">${t("This is a sample appointment, not a confirmed booking. Contact the studio to arrange your visit.")}</p><a class="button submit-booking" href="mailto:hello@pixelhairstudio.com">${t("Contact the studio")} <span>↗</span></a><button class="back-button">${t("\u2190 Back to the studio")}</button>`; content.querySelector('.back-button').addEventListener('click', () => booking.close()); content.querySelector('a').focus(); });
}
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => openBooking(undefined, button)));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => openBooking(Number(button.dataset.service), button)));
booking.addEventListener('close', () => trigger?.focus());
const lightbox = document.querySelector('#lightbox');
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click', () => { trigger = button; lightbox.querySelector('img').src = `${import.meta.env.BASE_URL}assets/${button.dataset.photo}`; lightbox.querySelector('img').alt = button.querySelector('img').alt; lightbox.querySelector('p').textContent = button.dataset.caption; lightbox.showModal(); }));
lightbox.addEventListener('close', () => trigger?.focus());
document.querySelectorAll('dialog').forEach(dialog => { dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } }); });

// Scroll owns parallax and progress; procedural time owns the particle drift.
const progressBar = document.querySelector('.reading-progress');
const heroImage = document.querySelector('.hero-photo img');
let scrollProgress = 0;
let scrollQueued = false;
function updateScroll() { scrollQueued = false; const range = document.documentElement.scrollHeight-innerHeight; scrollProgress = range > 0 ? Math.min(1, Math.max(0, scrollY/range)) : 0; progressBar.style.transform = `scaleX(${scrollProgress})`; heroImage.style.transform = motion.matches ? '' : `translateY(${Math.min(scrollY, 1000)*0.045}px)`; }
function requestScroll() { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateScroll); } }
addEventListener('scroll', requestScroll, {passive:true});
addEventListener('resize', requestScroll);
new ResizeObserver(requestScroll).observe(document.body);
motion.addEventListener('change', requestScroll);
updateScroll();

// A single BufferGeometry and shader keep the fine, warm dust to one draw call.
const canvas = document.querySelector('#particles');
let renderer;
try { renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'}); } catch { canvas.remove(); }
if (renderer) {
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(45,innerWidth/innerHeight,.1,30); camera.position.z = 8;
 const count = innerWidth < 600 ? 90 : 180;
 const positions = new Float32Array(count*3);
 const seeds = new Float32Array(count);
 let randomSeed = 814;
 const random = () => { randomSeed = (randomSeed * 16807) % 2147483647; return (randomSeed-1)/2147483646; };
 for(let i=0;i<count;i++){positions[i*3]=(random()-.5)*20; positions[i*3+1]=(random()-.5)*12;positions[i*3+2]=(random()-.5)*5; seeds[i]=random();}
 const geometry = new THREE.BufferGeometry();
 geometry.setAttribute('position',new THREE.BufferAttribute(positions,3));
 geometry.setAttribute('aSeed',new THREE.BufferAttribute(seeds,1));
 geometry.computeBoundingSphere();
 const uniforms = {uTime:{value:0},uScroll:{value:0},uPixelRatio:{value:Math.min(devicePixelRatio,1.5)}};
 const material = new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:false,vertexShader:`attribute float aSeed; uniform float uTime; uniform float uScroll; uniform float uPixelRatio; varying float vAlpha; void main(){vec3 p=position; p.x+=sin(uTime*.11+aSeed*30.)*.2; p.y=mod(p.y+6.+uTime*(.018+aSeed*.023)+uScroll*2.,12.)-6.; vec4 view=modelViewMatrix*vec4(p,1.); gl_Position=projectionMatrix*view; gl_PointSize=(1.+aSeed*1.5)*uPixelRatio; vAlpha=.12+aSeed*.21;}`,fragmentShader:`varying float vAlpha; void main(){float d=length(gl_PointCoord-.5); float a=1.-smoothstep(.15,.5,d); gl_FragColor=vec4(.86,.81,.69,a*vAlpha);}`});
 const points = new THREE.Points(geometry,material); points.frustumCulled=false; scene.add(points);
 const resize = () => {renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();uniforms.uPixelRatio.value=Math.min(devicePixelRatio,1.5);};
 resize();addEventListener('resize',resize);
 let raf=0,last=0,time=0;
 function frame(now){const delta=last ? Math.min((now-last)/1000,.05) : 0;last=now;time+=delta;uniforms.uTime.value=time;uniforms.uScroll.value=scrollProgress;renderer.render(scene,camera);raf=requestAnimationFrame(frame);}
 function visibility(){cancelAnimationFrame(raf);last=0;canvas.hidden=motion.matches;if(!document.hidden&&!motion.matches)raf=requestAnimationFrame(frame);}
 document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',visibility);visibility();
 canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();cancelAnimationFrame(raf);canvas.hidden=true;});
 addEventListener('pagehide',()=>{cancelAnimationFrame(raf);geometry.dispose();material.dispose();renderer.dispose();removeEventListener('resize',resize);document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',visibility);},{once:true});
}
