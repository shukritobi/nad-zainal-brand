const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav-links');

menuButton?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded',String(open));
});

nav?.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click',()=>nav.classList.remove('open'));
});

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sourcePage='https://www.nona.my/mahu-jadi-usahawan-pelakon-lebih-matang-kejelitaan-nad-zainal-makin-terserlah/';
const fallbackImage='https://tse2.mm.bing.net/th/id/OIP.6ci0zCUxZd0rWfUhyGT07wHaEW?pid=Api';
const nadImages=[
  {src:'https://cdn.nona.my/2021/10/410445.jpeg',alt:'Nad Zainal editorial portrait'},
  {src:'https://cdn.nona.my/2021/10/410444.jpeg',alt:'Nad Zainal studio portrait'},
  {src:'https://cdn.nona.my/2021/10/410443.jpeg',alt:'Nad Zainal fashion portrait'},
  {src:'https://cdn.nona.my/2021/10/410442.jpeg',alt:'Nad Zainal beauty portrait'},
  {src:'https://cdn.nona.my/2021/10/410441.jpeg',alt:'Nad Zainal campaign portrait'},
  {src:'https://cdn.nona.my/2021/10/410440.jpeg',alt:'Nad Zainal editorial photograph'},
  {src:'https://cdn.nona.my/2021/10/410446-696x365.jpeg',alt:'Nad Zainal feature image'},
  {src:'https://cdn.nona.my/2021/10/410444.jpeg',alt:'Nad Zainal smiling portrait'},
  {src:'https://cdn.nona.my/2021/10/410442.jpeg',alt:'Nad Zainal lifestyle portrait'},
  {src:'https://cdn.nona.my/2021/10/410440.jpeg',alt:'Nad Zainal close-up portrait'},
  {src:'https://cdn.nona.my/2021/10/410445.jpeg',alt:'Nad Zainal creator portrait'},
  {src:'https://cdn.nona.my/2021/10/410441.jpeg',alt:'Nad Zainal editorial pose'}
];

function applyEditorialImage(img,src){
  if(!img)return;
  const original=img.getAttribute('src')||fallbackImage;
  img.referrerPolicy='no-referrer';
  img.src=src;
  img.addEventListener('error',()=>{
    if(img.src!==original){
      img.src=original;
    }else if(img.src!==fallbackImage){
      img.src=fallbackImage;
    }
  },{once:true});
}

applyEditorialImage(document.querySelector('.hero-photo-wrap img'),nadImages[0].src);
applyEditorialImage(document.querySelector('.about-image img'),nadImages[2].src);
applyEditorialImage(document.querySelector('.campaign-image img'),nadImages[4].src);

const mosaic=document.querySelector('.social-mosaic');
if(mosaic){
  mosaic.textContent='';
  nadImages.forEach(({src,alt})=>{
    const link=document.createElement('a');
    link.className='gallery-item';
    link.href=sourcePage;
    link.target='_blank';
    link.rel='noopener';
    link.setAttribute('aria-label',`${alt}, open source`);

    const image=document.createElement('img');
    image.src=src;
    image.alt=alt;
    image.loading='lazy';
    image.referrerPolicy='no-referrer';
    image.addEventListener('error',()=>{
      image.src=fallbackImage;
    },{once:true});

    link.appendChild(image);
    mosaic.appendChild(link);
  });

  if(!mosaic.nextElementSibling?.classList.contains('image-credit')){
    const credit=document.createElement('p');
    credit.className='image-credit';
    credit.innerHTML='Editorial image references: <a href="'+sourcePage+'" target="_blank" rel="noopener">Nona</a>, credited by the publisher to Instagram @nad.zainal. Replace with management-approved originals before an official commercial launch.';
    mosaic.insertAdjacentElement('afterend',credit);
  }
}

if(!document.getElementById('nad-gallery-fix')){
  const style=document.createElement('style');
  style.id='nad-gallery-fix';
  style.textContent=`
    .social-mosaic{
      display:grid;
      grid-template-columns:repeat(6,minmax(0,1fr));
      grid-auto-rows:105px;
      grid-auto-flow:dense;
      gap:10px
    }
    .social-mosaic .gallery-item{
      position:relative;
      display:block;
      overflow:hidden;
      min-width:0;
      border-radius:18px;
      background:#eadfd8;
      box-shadow:0 14px 36px rgba(35,28,27,.08)
    }
    .social-mosaic .gallery-item:nth-child(1),
    .social-mosaic .gallery-item:nth-child(5),
    .social-mosaic .gallery-item:nth-child(9){
      grid-column:span 2;
      grid-row:span 3
    }
    .social-mosaic .gallery-item:nth-child(7){
      grid-column:span 2;
      grid-row:span 2
    }
    .social-mosaic .gallery-item:nth-child(2),
    .social-mosaic .gallery-item:nth-child(3),
    .social-mosaic .gallery-item:nth-child(4),
    .social-mosaic .gallery-item:nth-child(6),
    .social-mosaic .gallery-item:nth-child(8),
    .social-mosaic .gallery-item:nth-child(10),
    .social-mosaic .gallery-item:nth-child(11),
    .social-mosaic .gallery-item:nth-child(12){
      grid-column:span 1;
      grid-row:span 2
    }
    .social-mosaic .gallery-item::after{
      content:"View source ↗";
      position:absolute;
      left:12px;
      right:12px;
      bottom:12px;
      padding:8px 10px;
      color:#fff;
      background:rgba(35,28,27,.72);
      border-radius:999px;
      font-size:10px;
      font-weight:700;
      letter-spacing:.08em;
      text-align:center;
      text-transform:uppercase;
      opacity:0;
      transform:translateY(8px);
      transition:.25s ease;
      backdrop-filter:blur(10px)
    }
    .social-mosaic .gallery-item:hover::after{
      opacity:1;
      transform:translateY(0)
    }
    .social-mosaic .gallery-item img{
      width:100%;
      height:100%;
      max-width:none;
      aspect-ratio:auto;
      object-fit:cover;
      border-radius:0;
      transition:transform .45s ease
    }
    .social-mosaic .gallery-item:nth-child(3n+1) img{object-position:center 20%}
    .social-mosaic .gallery-item:nth-child(3n+2) img{object-position:center 35%}
    .social-mosaic .gallery-item:hover img{transform:scale(1.045)}
    .image-credit{
      max-width:900px;
      margin:18px 0 0;
      color:var(--muted);
      font-size:11px
    }
    .image-credit a{text-decoration:underline}
    @media(max-width:1050px){
      .social-mosaic{
        grid-template-columns:repeat(4,minmax(0,1fr));
        grid-auto-rows:110px
      }
    }
    @media(max-width:760px){
      .social-mosaic{
        grid-template-columns:repeat(2,minmax(0,1fr));
        grid-auto-rows:105px;
        gap:7px
      }
      .social-mosaic .gallery-item:nth-child(n){
        grid-column:span 1;
        grid-row:span 2
      }
      .social-mosaic .gallery-item:nth-child(1),
      .social-mosaic .gallery-item:nth-child(6),
      .social-mosaic .gallery-item:nth-child(9){
        grid-column:span 2;
        grid-row:span 3
      }
      .social-mosaic .gallery-item::after{display:none}
    }
  `;
  document.head.appendChild(style);
}

const form=document.getElementById('briefForm');
const toast=document.getElementById('toast');

function showToast(message){
  toast.textContent=message;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2800);
}

form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;

  const data=new FormData(form);
  const message=[
    'Hi Nad Zainal management, I would like to submit a collaboration brief.',
    '',
    `Brand: ${data.get('brand')}`,
    `Contact: ${data.get('contact')}`,
    `Email: ${data.get('email')}`,
    `Phone: ${data.get('phone')}`,
    `Collaboration: ${data.get('type')}`,
    `Budget: ${data.get('budget')}`,
    `Preferred date: ${data.get('date')||'To be discussed'}`,
    `Product sample available: ${data.get('sample')?'Yes':'No / to be discussed'}`,
    '',
    `Brief: ${data.get('brief')}`
  ].join('\n');

  const url=`https://wa.me/601125050216?text=${encodeURIComponent(message)}`;
  showToast('Opening the prepared WhatsApp brief…');
  setTimeout(()=>window.open(url,'_blank','noopener'),450);
});
