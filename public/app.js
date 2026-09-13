

(() => {
  'use strict';
  const BANK = window.QUESTION_BANK || [];
  const STORAGE_KEY = 'atrapaClaret.v01';
  const PHASES = [
    {name:'INFANCIA Y FORMACIÓN', description:'Conoce la familia de Claret, sus primeros años en Sallent, sus estudios, el trabajo en el mundo textil y el despertar de su vocación.', badge:'APRENDIZ CLARETIANO', icon:'📖🔥', img:'assets/asset-2.webp'},
    {name:'CLARET MISIONERO', description:'Descubre su vocación sacerdotal, sus viajes y su intensa labor misionera en Cataluña y Canarias.', badge:'CONOCEDOR CLARETIANO', icon:'🧭🔥', img:'assets/asset-3.webp'},
    {name:'OBISPO DE CUBA Y CONFESOR DE LA REINA', description:'Recorre su etapa como arzobispo de Santiago de Cuba, su actividad pastoral, el atentado de Holguín y su misión junto a Isabel II.', badge:'EXPERTO CLARETIANO', icon:'👤📖', img:'assets/asset-4.webp'},
    {name:'FUNDACIÓN DE LOS MISIONEROS CLARETIANOS Y ÚLTIMOS AÑOS', description:'Conoce la fundación de la Congregación, sus últimos años, su exilio y su muerte en Fontfroide.', badge:'MAESTRO CLARETIANO', icon:'🔥CMF', img:'assets/asset-5.webp'},
    {name:'CULTURA CLARETIANA', description:'Pon a prueba todo lo que sabes sobre la canonización de Claret, los mártires, la Provincia de Fátima, la oración apostólica y la misión claretiana actual.', badge:'EMBAJADOR CLARETIANO', icon:'🌍💗', img:'assets/asset-6.webp'},
  ];
  const state = {
    phase:1, phaseScore:0, lives:3, jokers:{'5050':true,hint:true,swap:true},
    usedThisQuestion:false, current:null, renderedOptions:[], usedQuestionIds:new Set(),
    gameId:Date.now(), totalCorrect:0, totalWrong:0, locked:false, sound:true
  };
  let persist = loadPersist();
  let audioCtx = null;
 let answerTimer=null, questionToken=0;
 function inGame(){return document.getElementById('screen-game').classList.contains('active');}
 function pose(name){document.getElementById('claretImg').src='assets/claret-'+name+'.webp';}
 function nextOnce(fn){return function(){if(this.disabled)return;this.disabled=true;fn();};}

  function defaultPersist(){return {history:{}, discovered:[], highestBadge:0, everCompleted:false, sound:true, games:0};}
  function loadPersist(){const d=defaultPersist();try{const p=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');if(!p||typeof p!=='object')return d;
 d.sound=p.sound!==false;d.games=Number.isSafeInteger(p.games)&&p.games>=0?p.games:0;
 d.highestBadge=Number.isInteger(p.highestBadge)?Math.max(0,Math.min(5,p.highestBadge)):0;d.everCompleted=p.everCompleted===true;
 d.discovered=Array.isArray(p.discovered)?[...new Set(p.discovered.filter(id=>BANK.some(q=>q.id===id)))]:[];
 if(p.history&&typeof p.history==='object')for(const q of BANK){const h=p.history[q.id];if(h&&['shown','correct','wrong','lastGame'].every(k=>Number.isSafeInteger(h[k])&&h[k]>=0))d.history[q.id]=h;}
 return d;}catch{return d;}}
 function savePersist(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(persist));}catch{/* Play continues without persistent storage. */}}
  function historyFor(id){if(!persist.history[id]) persist.history[id]={shown:0,correct:0,wrong:0,lastGame:0}; return persist.history[id];}
  function showScreen(id){if(id!=='screen-game'){clearTimeout(answerTimer);questionToken++;}document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');const home=document.getElementById('homeToggle');if(home)home.hidden=id==='screen-home';document.body.dataset.screen=id;window.scrollTo(0,0);const el=document.getElementById(id);el.tabIndex=-1;el.focus({preventScroll:true});}
  function shuffle(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x}
  function ensureAudio(){if(!audioCtx) audioCtx=new (window.AudioContext||window.webkitAudioContext)(); if(audioCtx.state==='suspended')audioCtx.resume()}
  function tone(type){if(!state.sound)return;try{ensureAudio();}catch{return;}const cfg={click:[440,.045,'sine'],select:[520,.08,'triangle'],success:[740,.18,'sine'],error:[180,.24,'sawtooth'],life:[260,.3,'triangle'],badge:[880,.3,'sine'],win:[1040,.45,'sine']}[type]||[400,.06,'sine']; const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=cfg[2];o.frequency.setValueAtTime(cfg[0],audioCtx.currentTime);if(type==='success'||type==='badge'||type==='win')o.frequency.exponentialRampToValueAtTime(cfg[0]*1.35,audioCtx.currentTime+cfg[1]);g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.11,audioCtx.currentTime+.015);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+cfg[1]);o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+cfg[1]+.02)}
  function setSound(on){state.sound=on;persist.sound=on;savePersist();const b=document.getElementById('soundToggle');b.textContent=on?'🔊':'🔇';b.setAttribute('aria-pressed',String(on));b.setAttribute('aria-label',on?'Desactivar sonido':'Activar sonido');b.title=on?'Desactivar sonido':'Activar sonido'}

  function renderLives(){const box=document.getElementById('lives');box.innerHTML='';for(let i=0;i<3;i++){const img=document.createElement('img');img.src='assets/asset-7.webp';img.alt=i<state.lives?'Corazón de María activo':'Corazón de María perdido';img.className='heart-life'+(i>=state.lives?' lost':'');box.appendChild(img)}}
  function renderProgress(){const d=document.getElementById('progressDots');d.innerHTML='';d.setAttribute('aria-label',`${state.phaseScore} de 5 aciertos en esta fase`);for(let i=0;i<5;i++){const s=document.createElement('span');s.className='progress-dot'+(i<state.phaseScore?' done':'');s.setAttribute('aria-hidden','true');d.appendChild(s)}}
  function renderJokers(){document.querySelectorAll('.lifeline').forEach(b=>{const key=b.dataset.lifeline;const available=state.jokers[key];b.disabled=!available||state.locked||state.usedThisQuestion;b.classList.toggle('used',!available)})}
  function updateHUD(){document.querySelector('.game-backdrop').style.backgroundImage=`linear-gradient(#07325110,#07325155),url(assets/fase-${state.phase}.webp)`;document.getElementById('phaseIndex').textContent=`FASE ${state.phase}/5`;document.getElementById('phaseName').textContent=PHASES[state.phase-1].name;document.getElementById('phaseScore').textContent=`${state.phaseScore}/5`;renderLives();renderProgress();renderJokers()}

  function pickQuestion({sameDifficulty=null,excludeId=null}={}){
    let pool=BANK.filter(q=>q.phase===state.phase && q.id!==excludeId && !state.usedQuestionIds.has(q.id));
    if(sameDifficulty){const p2=pool.filter(q=>q.difficulty===sameDifficulty);if(p2.length)pool=p2}
    if(!pool.length){pool=BANK.filter(q=>q.phase===state.phase && q.id!==excludeId)}
    // Prefer questions shown less often and not in the immediately previous game.
    const ranked=pool.map(q=>{const h=historyFor(q.id);const recentPenalty=h.lastGame===persist.games?80:h.lastGame===persist.games-1?25:0;const score=h.shown*8+recentPenalty+Math.random()*7;return {q,score}}).sort((a,b)=>a.score-b.score);
    // select among best few to keep variation
    const slice=ranked.slice(0,Math.min(4,ranked.length));
    return slice[Math.floor(Math.random()*slice.length)].q;
  }

  function prepareQuestion(q){
    clearTimeout(answerTimer);questionToken++;pose('presentador');state.current=q;state.usedThisQuestion=false;state.locked=false;state.usedQuestionIds.add(q.id);
    const h=historyFor(q.id);h.shown++;h.lastGame=persist.games;
    if(!persist.discovered.includes(q.id))persist.discovered.push(q.id);savePersist();
    const optionObjects=q.options.map((text,i)=>({text,correct:'ABCD'[i]===q.correct}));
    state.renderedOptions=shuffle(optionObjects);
    renderQuestion();
  }
  function renderQuestion(){
    const q=state.current;updateHUD();
    document.getElementById('questionText').textContent=q.question;
    document.querySelector('.panel-label').textContent=`PREGUNTA · ${String(q.difficulty||'').toUpperCase()}`;
    document.getElementById('hintBox').classList.add('hidden');document.getElementById('hintText').textContent='';
    const answers=document.getElementById('answers');answers.innerHTML='';
    state.renderedOptions.forEach((opt,i)=>{const b=document.createElement('button');b.className='answer-btn';b.dataset.index=i;b.setAttribute('aria-label',`Respuesta ${'ABCD'[i]}: ${opt.text}`);b.innerHTML=`<span class="letter">${'ABCD'[i]}</span><span>${escapeHtml(opt.text)}</span>`;b.addEventListener('click',()=>answer(i,b));answers.appendChild(b)});
    const fb=document.getElementById('feedback');fb.className='feedback-bar';fb.innerHTML='<span class="feedback-icon">☝</span><span id="feedbackText">Selecciona una respuesta</span>';
    say('Piensa bien… ¡tú puedes!',1500);renderJokers();
  }
  function say(text,ms=1900){const b=document.getElementById('claretBubble');b.textContent=text;b.classList.add('show');clearTimeout(say._t);say._t=setTimeout(()=>b.classList.remove('show'),ms)}
  function escapeHtml(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

  function answer(i,btn){
    if(!inGame()||state.locked||!state.renderedOptions[i]||btn.disabled)return;const token=questionToken;state.locked=true;tone('select');btn.classList.add('selected');document.querySelectorAll('.answer-btn').forEach(x=>x.disabled=true);renderJokers();
    answerTimer=setTimeout(()=>{
      if(token!==questionToken||!inGame())return;
      const opt=state.renderedOptions[i];const correctIndex=state.renderedOptions.findIndex(o=>o.correct);const buttons=[...document.querySelectorAll('.answer-btn')];
      buttons[correctIndex]?.classList.add('correct');
      const fb=document.getElementById('feedback');
      if(opt.correct){
        btn.classList.remove('selected');btn.classList.add('correct');tone('success');pose('celebracion');state.phaseScore++;state.totalCorrect++;historyFor(state.current.id).correct++;
        fb.className='feedback-bar success source';fb.innerHTML=`<strong>¡CORRECTO!</strong><span>${escapeHtml(state.renderedOptions[correctIndex].text)}</span><small>Fuente: ${escapeHtml(state.current.source)}</small><button class="btn btn-primary next-btn" id="nextBtn">${state.phaseScore>=5?'VER RESULTADO':'SIGUIENTE PREGUNTA'}</button>`;
        say('¡Muy bien! ¡Seguimos!',1800);savePersist();updateHUD();document.getElementById('nextBtn').onclick=nextOnce(()=>{tone('click'); if(state.phaseScore>=5)phaseComplete(); else prepareQuestion(pickQuestion())});document.getElementById('nextBtn').focus();
      }else{
        btn.classList.remove('selected');btn.classList.add('wrong');tone('error');pose('animo');state.totalWrong++;historyFor(state.current.id).wrong++;state.lives--;savePersist();updateHUD();setTimeout(()=>tone('life'),120);
        fb.className='feedback-bar error source';fb.innerHTML=`<strong>NO ERA ESA</strong><span>La respuesta correcta era: <b>${escapeHtml(state.renderedOptions[correctIndex].text)}</b></span><small>Fuente: ${escapeHtml(state.current.source)}</small><button class="btn btn-primary next-btn" id="nextBtn">${state.lives<=0?'VER RESULTADO':'CONTINUAR'}</button>`;
        say(state.lives>0?'Ánimo. Ya sabes una más. ¡Sigue!':'No pasa nada. Volvemos a intentarlo.',2200);
        document.getElementById('nextBtn').onclick=nextOnce(()=>{tone('click');if(state.lives<=0)gameOver();else prepareQuestion(pickQuestion())});document.getElementById('nextBtn').focus();
      }
    },800)
  }

  function useLifeline(key){
    if(!inGame()||!state.current||!state.jokers[key]||state.locked||state.usedThisQuestion)return;state.jokers[key]=false;state.usedThisQuestion=true;tone('click');
    if(key==='5050'){
      const wrong=[...document.querySelectorAll('.answer-btn')].filter((b,i)=>!state.renderedOptions[i].correct);shuffle(wrong).slice(0,2).forEach(b=>{b.classList.add('removed');b.disabled=true});say('Dos opciones fuera. Ahora, ¡a decidir!',1800)
    }
    if(key==='hint'){
      document.getElementById('hintText').textContent=state.current.hint;document.getElementById('hintBox').classList.remove('hidden');say('Una pista puede marcar la diferencia.',1800)
    }
    if(key==='swap'){
      const prev=state.current;prepareQuestion(pickQuestion({sameDifficulty:prev.difficulty,excludeId:prev.id}));state.usedThisQuestion=true;renderJokers();say('Cambio de ruta. Nueva pregunta.',1800);return
    }
    renderJokers()
  }

  function showPhaseIntro(){
    const p=PHASES[state.phase-1];
    document.getElementById('introPhaseIndex').textContent=`FASE ${state.phase} DE 5`;
    document.getElementById('introPhaseTitle').textContent=p.name;
    document.getElementById('introPhaseDescription').textContent=p.description;
    document.querySelector('.phase-intro-goal').innerHTML=state.phase===5?'<strong>Tu reto final:</strong> consigue los últimos 5 aciertos y alcanza el nivel de Embajador Claretiano.':'<strong>Tu reto:</strong> consigue 5 aciertos antes de perder los 3 Corazones de María.';
    document.getElementById('phaseIntroBackdrop').style.backgroundImage=`linear-gradient(90deg,rgba(3,18,56,.34),rgba(3,18,56,.68)),url(assets/fase-${state.phase}.webp)`;
    const b=document.getElementById('introStartBtn');b.disabled=false;b.textContent=state.phase===1?'COMENZAR AVENTURA':state.phase===5?'COMENZAR FASE FINAL':'COMENZAR FASE';
    showScreen('screen-phase-intro');b.focus();
  }
  function beginPhase(){tone('click');showScreen('screen-game');prepareQuestion(pickQuestion());}

  function phaseComplete(){
    tone('badge');persist.highestBadge=Math.max(persist.highestBadge,state.phase);savePersist();
    const p=PHASES[state.phase-1];
    document.getElementById('resultBadge').textContent=p.badge;
    document.getElementById('resultPhase').textContent=`Has conseguido 5 aciertos en la Fase ${state.phase}.`;
    const revealImg=document.getElementById('badgeRevealImg');
    const revealName=document.getElementById('badgeRevealName');
    revealImg.src=p.img; revealName.textContent=p.badge;
    revealImg.classList.remove('animate'); void revealImg.offsetWidth; revealImg.classList.add('animate');
    const track=document.getElementById('badgeTrack'); track.innerHTML='';
    PHASES.forEach((x,i)=>{
      const d=document.createElement('div');
      d.className='badge-chip'+(i<state.phase?' earned':'');
      d.innerHTML=`<img src="${x.img}" alt="${escapeHtml(x.badge)}"><span>${x.badge.replace(' CLARETIANO','')}</span>`;
      track.appendChild(d)
    });
    showScreen('screen-phase-result');
    document.getElementById('continuePhaseBtn').disabled=false;document.getElementById('continuePhaseBtn').onclick=nextOnce(()=>{tone('click');if(state.phase>=5)victory();else{state.phase++;state.phaseScore=0;state.usedQuestionIds=new Set();showPhaseIntro()}})
  }
  function gameOver(){
    const achievedCount=Math.max(0,state.phase-1);
    const achievedName=achievedCount>0?PHASES[achievedCount-1].badge:'SIN INSIGNIA';
    const txt=`Has llegado hasta la Fase ${state.phase} de 5 · ${state.totalCorrect} aciertos en esta partida.`;
    document.getElementById('gameoverText').textContent=txt;
    document.getElementById('gameoverLevel').textContent=achievedCount>0
      ? `Lograste llegar al nivel ${achievedName}.`
      : 'Todavía no has conseguido una insignia. ¡Vamos a por la primera!';
    const track=document.getElementById('gameoverBadgeTrack');
    track.innerHTML='';
    PHASES.forEach((x,i)=>{
      const d=document.createElement('div');
      d.className='badge-chip'+(i<achievedCount?' earned':'');
      d.innerHTML=`<img src="${x.img}" alt="${escapeHtml(x.badge)}"><span>${x.badge.replace(' CLARETIANO','')}</span>`;
      track.appendChild(d)
    });
    const l=document.getElementById('gameoverLives');l.innerHTML='';l.setAttribute('aria-label','Sin corazones disponibles');
    for(let i=0;i<3;i++){
      const img=document.createElement('img');img.alt='Corazón de María perdido';img.className='lost';
      img.src='assets/asset-7.webp';img.alt='Corazón de María';if(i<state.lives)img.style.opacity='1';l.appendChild(img)}
    showScreen('screen-gameover')
  }
  function victory(){
    tone('win');persist.everCompleted=true;persist.highestBadge=5;savePersist();
    const used=3-Object.values(state.jokers).filter(Boolean).length;document.getElementById('victoryStats').innerHTML=`<div class="stat-card"><span>Corazones restantes</span><b>${state.lives}/3</b></div><div class="stat-card"><span>Comodines usados</span><b>${used}/3</b></div><div class="stat-card"><span>Preguntas descubiertas</span><b>${persist.discovered.length}/${BANK.length}</b></div>`;showScreen('screen-victory')
  }
  function startGame(){
    tone('click');persist.games=(persist.games||0)+1;savePersist();Object.assign(state,{phase:1,phaseScore:0,lives:3,jokers:{'5050':true,hint:true,swap:true},usedThisQuestion:false,current:null,renderedOptions:[],usedQuestionIds:new Set(),gameId:Date.now(),totalCorrect:0,totalWrong:0,locked:false});showPhaseIntro()
  }

  function handleAction(action){if(action==='home'){tone('click');showScreen('screen-home')}if(action==='play')startGame();if(action==='how'){tone('click');showScreen('screen-how')}if(action==='credits'){tone('click');showScreen('screen-credits')}if(action==='begin-phase')beginPhase();if(action==='propose'){tone('click');if(persist.everCompleted)showScreen('screen-propose');else alert('Esta opción se desbloquea al completar las cinco fases.')}}
  document.addEventListener('click',e=>{const a=e.target.closest('[data-action]');if(a)handleAction(a.dataset.action);const l=e.target.closest('[data-lifeline]');if(l)useLifeline(l.dataset.lifeline)});
  document.getElementById('soundToggle').addEventListener('click',()=>setSound(!state.sound));
  document.getElementById('proposalForm').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const body=`Nueva pregunta propuesta · Atrapa a Claret\n\nPregunta: ${f.get('question')}\nA: ${f.get('a')}\nB: ${f.get('b')}\nC: ${f.get('c')}\nD: ${f.get('d')}\nCorrecta: ${f.get('correct')}\nFuente: ${f.get('source')}\nN.º Autobiografía: ${f.get('aut')||'-'}\nCentro: ${f.get('school')||'-'}\nCurso: ${f.get('course')||'-'}`;location.href=`mailto:luisalfonsogarcia@claretsevilla.org?subject=${encodeURIComponent('Nueva pregunta propuesta · Atrapa a Claret')}&body=${encodeURIComponent(body)}`});
  // keyboard accessibility: A-D selects answers, 1-3 lifelines while a question is active
  window.addEventListener('keydown',e=>{if(e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable=true]'))return;if(e.key==='Escape'&&!document.getElementById('screen-home').classList.contains('active')){showScreen('screen-home');return}if(!document.getElementById('screen-game').classList.contains('active'))return;const map={a:0,b:1,c:2,d:3};if(map[e.key.toLowerCase()]!==undefined){document.querySelectorAll('.answer-btn')[map[e.key.toLowerCase()]]?.click()}if(e.key==='1')useLifeline('5050');if(e.key==='2')useLifeline('hint');if(e.key==='3')useLifeline('swap')});

  state.sound=persist.sound!==false;setSound(state.sound);showScreen('screen-home');
})();

