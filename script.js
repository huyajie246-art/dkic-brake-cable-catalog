const products = [
  {code:'086691', brand:'Chevrolet', model:'Arauca 1.3', years:'2011–2017', oem:'S12-1602040', image:'assets/01_GUAYA_CROCHE_ARAUCA_086691.png'},
  {code:'086692', brand:'Chevrolet', model:'Chevy C2 Confort 1.6', years:'Aplicación según catálogo', oem:'93302370', image:'assets/02_GUAYA_CROCHE_CHEVY_C2_086692.png'},
  {code:'086693', brand:'Chevrolet', model:'Corsa 1.3 / 1.4 / 1.6', years:'1996–2006', oem:'92098697', image:'assets/03_GUAYA_CROCHE_CORSA_086693.png'},
  {code:'086694', brand:'Ford', model:'Festiva / Turpial 1.3', years:'1992–2011', oem:'KDA01-41-150D', image:'assets/04_GUAYA_CROCHE_FESTIVA_TURPIAL_086694.png'},
  {code:'086695', brand:'Daewoo / Chery', model:'Matiz / Tico / Chery QQ', years:'0.8 / 1.1', oem:'96315242', image:'assets/05_GUAYA_CROCHE_MATIZ_TICO_CHERY_QQ_086695.png'},
  {code:'086696', brand:'Fiat', model:'Palio / Siena Fire 1.3', years:'Base ancha', oem:'46781018', image:'assets/06_GUAYA_CROCHE_PALIO_SIENA_FIRE_086696.png'},
  {code:'086697', brand:'Fiat', model:'Palio / Siena MPI 1.3', years:'1998–2003 · Base pequeña', oem:'46459923', image:'assets/07_GUAYA_CROCHE_PALIO_SIENA_MPI_086697.png'},
  {code:'086698', brand:'Chevrolet', model:'Spark 1.0', years:'2005–2014', oem:'96590793', image:'assets/08_GUAYA_CROCHE_SPARK_086698.png'}
];

const grid = document.querySelector('#product-grid');
const search = document.querySelector('#search');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
const dialog = document.querySelector('#product-dialog');
let activeBrand = 'all';

function showProduct(product){
  document.querySelector('#dialog-image').src = product.image;
  document.querySelector('#dialog-image').alt = `Etiqueta DKIC ${product.code} para ${product.model}`;
  document.querySelector('#dialog-brand').textContent = product.brand;
  document.querySelector('#dialog-title').textContent = product.model;
  document.querySelector('#dialog-code').textContent = product.code;
  document.querySelector('#dialog-oem').textContent = product.oem;
  document.querySelector('#dialog-years').textContent = product.years;
  dialog.showModal();
}

function render(){
  const term = search.value.trim().toLowerCase();
  const visible = products.filter(p => (activeBrand === 'all' || p.brand === activeBrand) && Object.values(p).join(' ').toLowerCase().includes(term));
  grid.replaceChildren(...visible.map(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.tabIndex = 0;
    card.setAttribute('role','button');
    card.setAttribute('aria-label',`Ver detalles de ${product.model}, referencia ${product.code}`);
    card.innerHTML = `<div class="product-image"><span class="sample-badge">Imagen de muestra</span><img src="${product.image}" alt="Imagen de muestra para ${product.model}" loading="lazy"></div><div class="product-copy"><div class="product-top"><span>${product.brand}</span><span>${product.code}</span></div><h3>${product.model}</h3><p>${product.years} · Ref. ${product.oem}</p></div>`;
    card.addEventListener('click',()=>showProduct(product));
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showProduct(product)}});
    return card;
  }));
  count.textContent = visible.length;
  empty.hidden = visible.length > 0;
}

search.addEventListener('input', render);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active').classList.remove('active');
  button.classList.add('active');
  activeBrand = button.dataset.brand;
  render();
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelector('#year').textContent = new Date().getFullYear();
render();
