// export default

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// console.log(images);



const gallaryContainer = document.querySelector(".js-gallery");

const modal = document.querySelector(".js-lightbox");

const modalClose = document.querySelector('[data-action="close-lightbox"]');

const modalOriginalImage = document.querySelector(".lightbox__image")


// Added murkup gallery


const imgMarkup = createImageCardsMarkup(images)

gallaryContainer.innerHTML = imgMarkup;



function createImageCardsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {

      return `
         <li class="gallery__item">
            <a
                class="gallery__link"
             href="${original}"
            >
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
         </li >
            `;

    })
    .join('');
}





// Opened modal

gallaryContainer.addEventListener('click', onGallaryContainerClick)


function onGallaryContainerClick(event) {

  event.preventDefault()

  const isImageSwatchEl = event.target.classList.contains("gallery__image")

  if (!isImageSwatchEl) {
    return
  }

  const urlOrigImg = event.target.dataset.source;

  modal.classList.add("is-open");

  modalOriginalImage.src = urlOrigImg

  console.log(urlOrigImg);
}



// Closed modal 

modalClose.addEventListener('click', onModalCloseClick);

function onModalCloseClick(_event) {

  modal.classList.remove("is-open");

  modalOriginalImage.src = ''

  // console.log("close", modalClose);
}


// Closed modal esc.

document.addEventListener('keydown', escModalClose);
function escModalClose(event) {
  if (event.keyCode === 27) {
    modal.classList.remove("is-open")
    modalOriginalImage.src = ''
  };
  return
};



// // Закрытие модалки кликом по полю модалки ---------------------

modal.addEventListener('click', onOutModalWindowClick);

function onOutModalWindowClick(event) {
  const isModalImageEl = event.target.classList.contains("lightbox__image");
  if (isModalImageEl) {
    return
  }
  modal.classList.remove("is-open");
  modalOriginalImage.src = ''
}
// //---------------------------------------------------------------
// // Слайдшоу стрелками  ArrowLeft || ArrowRight---------------------

const arrImgs = [];
images.forEach(({ original }) => {
  arrImgs.push(original);

})
console.log(arrImgs);

document.addEventListener('keydown', onBtnArrClick);
function onBtnArrClick(event) {
  let newImgIndx;
  const currentImgId = arrImgs.indexOf(modalOriginalImage.src);
  if (event.key === 'ArrowLeft') {
    if (currentImgId > -1) {
      newImgIndx = currentImgId - 1;
    }
    if (newImgIndx === -1) {
      newImgIndx = arrImgs.length - 1;
    }
  } else if (event.key === 'ArrowRight' || 'Space') {
    newImgIndx = currentImgId + 1;
    if (newImgIndx === arrImgs.length) {
      newImgIndx = 0;
    }
  }

  modalOriginalImage.src = arrImgs[newImgIndx];
};
