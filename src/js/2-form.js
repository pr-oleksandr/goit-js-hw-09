const formData = {
  email: '',
  message: '',
};

const getFormEl = document.querySelector('.feedback-form');
getFormEl.addEventListener('input', handlerFormHelper);
getFormEl.addEventListener('submit', handlerFormSubmit);

const { email, message } = getFormEl.elements;
email.value =
  JSON.parse(localStorage.getItem('feedback-form-state')).email ?? '';
message.value =
  JSON.parse(localStorage.getItem('feedback-form-state')).message ?? '';

function handlerFormSubmit(event) {
  event.preventDefault();
  if (email.value.trim() === '' || message.value.trim() === '') {
    alert('Заповніть усі поля!');
    return;
  }
  localStorage.clear();
  getFormEl.reset();
  alert('Данні успішно відправленні!');
}

function handlerFormHelper(event) {
  for (let el in formData) {
    if (el === event.target.name) {
      formData[el] = event.target.value.trim();
      localStorage.setItem('feedback-form-state', JSON.stringify(formData));
    }
  }
}
