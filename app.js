document.querySelectorAll('[data-art]').forEach(el=>{const img=document.createElement('img');img.src='assets/dreamscape.png';img.alt=el.closest('.art-card')?'분홍빛 풍경과 수면 위 유리 구체를 표현한 AI 이미지':'';img.loading=el.closest('.art-card')?'lazy':'eager';el.prepend(img);});
const dialog=document.querySelector('#lightbox');
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');dialog.querySelector('img').style.filter=getComputedStyle(img).filter;dialog.querySelector('h2').textContent=button.dataset.title;dialog.showModal();}));
document.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('a[href="#featured-story"]')?.addEventListener('click',()=>{document.querySelector('#featured-story details').open=true;});

const finePointer=matchMedia('(pointer: fine)');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
if(finePointer.matches&&!reducedMotion.matches){
  const sparkleColors=['#f8d66d','#a7e17d','#efb9ca','#c9b7e3','#ffffff'];
  let lastSparkle=0;
  addEventListener('pointermove',event=>{
    const now=performance.now();
    if(now-lastSparkle<28)return;
    lastSparkle=now;
    const sparkle=document.createElement('i');
    sparkle.className='cursor-spark';
    sparkle.setAttribute('aria-hidden','true');
    sparkle.style.left=`${event.clientX-3}px`;
    sparkle.style.top=`${event.clientY-3}px`;
    sparkle.style.setProperty('--spark-color',sparkleColors[Math.floor(Math.random()*sparkleColors.length)]);
    const driftX=Math.round(Math.random()*18-9);
    const driftY=Math.round(Math.random()*16+7);
    sparkle.style.setProperty('--spark-x',`${driftX}px`);
    sparkle.style.setProperty('--spark-y',`${driftY}px`);
    sparkle.style.setProperty('--spark-x2',`${Math.round(driftX*1.8)}px`);
    sparkle.style.setProperty('--spark-y2',`${Math.round(driftY*1.8)}px`);
    document.body.append(sparkle);
    sparkle.addEventListener('animationend',()=>sparkle.remove(),{once:true});
  },{passive:true});
}

const soundButton=document.createElement('button');
soundButton.type='button';
soundButton.className='sound-toggle';
soundButton.setAttribute('aria-pressed','false');
soundButton.innerHTML='<span class="sound-icon" aria-hidden="true">♪</span><span>효과음 켜기</span>';
document.body.append(soundButton);

let audioContext;
let melodyTimer;
const melody=[659.25,783.99,880,783.99,1046.5,880,783.99,659.25];
function playTone(frequency,start,duration,type='triangle',volume=.035){
  const oscillator=audioContext.createOscillator();
  const gain=audioContext.createGain();
  oscillator.type=type;
  oscillator.frequency.setValueAtTime(frequency,start);
  gain.gain.setValueAtTime(.0001,start);
  gain.gain.exponentialRampToValueAtTime(volume,start+.018);
  gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(start);
  oscillator.stop(start+duration+.02);
}
function playCuteMelody(){
  if(!audioContext||audioContext.state==='closed')return;
  const start=audioContext.currentTime+.04;
  melody.forEach((note,index)=>{
    const when=start+index*.19;
    playTone(note,when,.14,index%2?'sine':'triangle',.035);
    if(index===0||index===4)playTone(note/2,when,.22,'sine',.018);
  });
}
function setSound(enabled){
  clearInterval(melodyTimer);
  soundButton.setAttribute('aria-pressed',String(enabled));
  soundButton.querySelector('span:last-child').textContent=enabled?'효과음 끄기':'효과음 켜기';
  if(enabled){
    audioContext??=new (window.AudioContext||window.webkitAudioContext)();
    audioContext.resume();
    playCuteMelody();
    melodyTimer=setInterval(playCuteMelody,2200);
  }else if(audioContext){
    audioContext.suspend();
  }
}
soundButton.addEventListener('click',()=>setSound(soundButton.getAttribute('aria-pressed')!=='true'));
