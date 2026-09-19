const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#request-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const service = new FormData(form).get("service");
  const message = document.querySelector("#form-message");
  if (!service || service === "Оберіть послугу") {
    message.textContent = "Оберіть послугу, щоб продовжити.";
    return;
  }
  const subject = encodeURIComponent(`Запит SoundCollab: ${service}`);
  const body = encodeURIComponent("Привіт! Хочу обговорити проєкт через SoundCollab.\n\nДеталі запиту:\n");
  message.textContent = "Готово — відкриваємо поштовий клієнт для безпечного демо-запиту.";
  window.setTimeout(() => {
    window.location.href = `mailto:sound.collab.official@gmail.com?subject=${subject}&body=${body}`;
  }, 350);
});

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const message = document.querySelector("#contact-message");
  const service = data.get("service");
  if (!service) {
    message.textContent = "Оберіть напрямок, щоб сформувати запит.";
    return;
  }
  const subject = encodeURIComponent(`SoundCollab — ${service}`);
  const body = encodeURIComponent(
    `Ім'я: ${data.get("name")}\nEmail: ${data.get("email")}\nПослуга: ${service}\n\nБриф:\n${data.get("brief")}`,
  );
  message.textContent = "Готово — відкриваємо ваш поштовий клієнт.";
  window.setTimeout(() => {
    window.location.href = `mailto:sound.collab.official@gmail.com?subject=${subject}&body=${body}`;
  }, 350);
});

document.querySelector("[data-demo-action='status']")?.addEventListener("click", () => {
  const message = document.querySelector("#demo-message");
  message.textContent = "Демо: статус оновлено локально. У production це збереже зміни в order workspace.";
});
const roleButtons = document.querySelectorAll("[data-role]");
const roleInput = document.querySelector("#role-input");
const clientFields = document.querySelector("#client-fields");
const specialistFields = document.querySelector("#specialist-fields");
const formEyebrow = document.querySelector("#form-eyebrow");
const formTitle = document.querySelector("#form-title");
const submitButton = document.querySelector("#registration-submit");
const registrationForm = document.querySelector("#registration-form");
const registrationMessage = document.querySelector("#registration-message");

function setRegistrationRole(role) {
  const specialist = role === "specialist";
  roleInput.value = role;
  clientFields.hidden = specialist;
  specialistFields.hidden = !specialist;
  formEyebrow.textContent = specialist ? "Реєстрація виконавця" : "Реєстрація клієнта";
  formTitle.textContent = specialist ? "Подати профіль спеціаліста" : "Створити акаунт клієнта";
  submitButton.innerHTML = specialist ? "Подати профіль на перевірку <span>→</span>" : "Створити акаунт клієнта <span>→</span>";
  roleButtons.forEach((button) => button.classList.toggle("role-button-active", button.dataset.role === role));
  [...clientFields.querySelectorAll("input, select, textarea"), ...specialistFields.querySelectorAll("input, select, textarea")].forEach((field) => { field.required = field.closest("[hidden]") === null && ["service", "specialty", "custom_service", "custom_specialty", "genres", "portfolio"].includes(field.name) === false; });
}
roleButtons.forEach((button) => button.addEventListener("click", () => setRegistrationRole(button.dataset.role)));
const initialRole = new URLSearchParams(window.location.search).get("role");
if (initialRole === "specialist") setRegistrationRole("specialist");
registrationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(registrationForm);
  const role = data.get("role");
  const subject = encodeURIComponent(role === "specialist" ? "Реєстрація спеціаліста SoundCollab" : "Реєстрація клієнта SoundCollab");
  const body = encodeURIComponent([...data.entries()].filter(([key]) => key !== "consent").map(([key, value]) => `${key}: ${value}`).join("\n"));
  registrationMessage.textContent = "Заявку підготовлено — відкриваємо ваш поштовий клієнт.";
  window.setTimeout(() => { window.location.href = `mailto:sound.collab.official@gmail.com?subject=${subject}&body=${body}`; }, 350);
});
document.querySelectorAll("[data-order-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const message = document.querySelector("#order-message");
    const status = document.querySelector("#order-status");
    const selected = document.querySelector("#specialist-status")?.value;
    const action = button.dataset.orderAction;
    if (action === "update" && selected) { status.textContent = selected; message.textContent = "Статус замовлення оновлено для команди."; }
    else if (action === "submit") { status.textContent = "На погодженні"; message.textContent = "Версію передано клієнту на погодження."; }
    else if (action === "approve") { status.textContent = "Погоджено"; message.textContent = "Етап погоджено. Команда отримала оновлення."; }
    else if (action === "comment") { message.textContent = "Коментар додано до замовлення."; }
  });
});
