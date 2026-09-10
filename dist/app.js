document.querySelectorAll('[data-art]').forEach(el=>{const img=document.createElement('img');img.src='assets/dreamscape.png';img.alt=el.closest('.art-card')?'분홍빛 풍경과 수면 위 유리 구체를 표현한 AI 이미지':'';img.loading=el.closest('.art-card')?'lazy':'eager';el.prepend(img);});
const dialog=document.querySelector('#lightbox');
document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');dialog.querySelector('img').style.filter=getComputedStyle(img).filter;dialog.querySelector('h2').textContent=button.dataset.title;dialog.showModal();}));
document.querySelector('[data-close]')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
document.querySelector('a[href="#featured-story"]')?.addEventListener('click',()=>{document.querySelector('#featured-story details').open=true;});
