
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(toggle) toggle.addEventListener('click',()=>nav.classList.toggle('open'));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
