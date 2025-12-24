import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const getFormEl = document.querySelector('.feedback-form');
const { email, message } = getFormEl.elements;
const STORAGE_KEY = 'feedback-form-state';

getFormEl.addEventListener('input', handlerFormHelper);
getFormEl.addEventListener('submit', handlerFormSubmit);

const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};

const formData = {
  email: savedData.email ?? '',
  message: savedData.message ?? '',
};

email.value = formData.email;
message.value = formData.message;

function handlerFormHelper(event) {
  const { name, value } = event.target;
  if (!name) {
    return;
  }
  formData[name] = value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function handlerFormSubmit(event) {
  event.preventDefault();
  if (email.value.trim() === '' || message.value.trim() === '') {
    iziToast.show({
      message: 'Заповніть усі поля!',
      position: `topRight`,
      color: `red`,
    });
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  getFormEl.reset();
  iziToast.show({
    message: `Дані успішно відправлені!`,
    position: `topRight`,
    color: `green`,
  });
}
