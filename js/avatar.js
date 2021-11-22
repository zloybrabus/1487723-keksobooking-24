const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const fileChooser = document.querySelector('.ad-form-header__upload input[type="file"]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileFotoChooser = document.querySelector('.ad-form__photo-container input[type="file"]');
const previewFoto = document.querySelector('.ad-form__photo');


export const onfileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

export  const onfileFotoChooserChange = () => {
  const file = fileFotoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewFoto.style.background = `url(${reader.result}`;
      previewFoto.style.backgroundSize = 'cover';
      previewFoto.style.backgroundRepeat = 'no-repeat';
    });

    reader.readAsDataURL(file);
  }
};

const resetImages = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewFoto.style.background = '';
};

fileChooser.addEventListener('change', onfileChooserChange);
fileFotoChooser.addEventListener('change', onfileFotoChooserChange);

export {resetImages};


/*/
export const loadAvatar = () => {
  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};


export const loadFotoLodging = () => {
  fileFotoChooser.addEventListener('change', () => {
    const file = fileFotoChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const previewFotoImg = document.createElement('img');
      previewFotoImg.style.width = '70px';
      previewFotoImg.style.height = '70px';
      previewFotoImg.src = URL.createObjectURL(file);
      previewFoto.appendChild(previewFotoImg);
    }
  });
};

export const removeAvatarFoto = () => {
  previewAvatar.src = DEFAULT_AVATAR;
  previewFoto.querySelectorAll('img').forEach((element) => element.remove());
};
/*/
