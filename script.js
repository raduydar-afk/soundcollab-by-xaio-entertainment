const FORM_ENDPOINT = "https://formsubmit.co/sound.collab.official@gmail.com";
const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuButton?.addEventListener("click", () => { const isOpen = mobileNav.classList.toggle("open"); menuButton.setAttribute("aria-expanded", String(isOpen)); });
mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => { mobileNav.classList.remove("open"); menuButton?.setAttribute("aria-expanded", "false"); }));

async function deliverForm(form, subject, messageElement) {
  const submit = form.querySelector("button[type='submit']");
  if (submit) submit.disabled = true;
  const data = new FormData(form); data.append("_subject", subject); data.append("_captcha", "false"); data.append("_template", "table");
  try {
    const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: data });
    if (!response.ok) throw new Error("Form delivery failed");
    messageElement.textContent = "Заявку надіслано. Команда SoundCollab зв’яжеться з вами."; form.reset(); return true;
  } catch (error) { messageElement.textContent = "Не вдалося надіслати автоматично. Відкриваємо резервний email."; return false; }
  finally { if (submit) submit.disabled = false; }
}
function mailtoFallback(form, subject) { const body = encodeURIComponent([...new FormData(form).entries()].map(([key, value]) => `${key}: ${value}`).join("\n")); window.location.href = `mailto:sound.collab.official@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`; }

const requestForm = document.querySelector("#request-form");
requestForm?.addEventListener("submit", async (event) => { event.preventDefault(); const message = document.querySelector("#form-message"); const service = new FormData(requestForm).get("service"); if (!service || service === "Оберіть послугу") { message.textContent = "Оберіть напрямок, щоб продовжити."; return; } if (!await deliverForm(requestForm, `Запит SoundCollab: ${service}`, message)) mailtoFallback(requestForm, `Запит SoundCollab: ${service}`); });
const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", async (event) => { event.preventDefault(); const message = document.querySelector("#contact-message"); if (!new FormData(contactForm).get("service")) { message.textContent = "Оберіть напрямок, щоб сформувати запит."; return; } if (!await deliverForm(contactForm, "Нова заявка SoundCollab", message)) mailtoFallback(contactForm, "Нова заявка SoundCollab"); });

const roleButtons = document.querySelectorAll("[data-role]"); const roleInput = document.querySelector("#role-input"); const clientFields = document.querySelector("#client-fields"); const specialistFields = document.querySelector("#specialist-fields"); const formEyebrow = document.querySelector("#form-eyebrow"); const formTitle = document.querySelector("#form-title"); const submitButton = document.querySelector("#registration-submit"); const registrationForm = document.querySelector("#registration-form"); const registrationMessage = document.querySelector("#registration-message");
function setRegistrationRole(role) { if (!roleInput) return; const specialist = role === "specialist"; roleInput.value = role; clientFields.hidden = specialist; specialistFields.hidden = !specialist; formEyebrow.textContent = specialist ? "Реєстрація виконавця" : "Реєстрація клієнта"; formTitle.textContent = specialist ? "Подати профіль спеціаліста" : "Створити акаунт клієнта"; submitButton.innerHTML = specialist ? "Подати профіль на перевірку <span>→</span>" : "Створити акаунт клієнта <span>→</span>"; roleButtons.forEach((button) => button.classList.toggle("role-button-active", button.dataset.role === role)); [...clientFields.querySelectorAll("input, select, textarea"), ...specialistFields.querySelectorAll("input, select, textarea")].forEach((field) => { field.required = field.closest("[hidden]") === null && ["service", "specialty", "custom_service", "custom_specialty", "genres", "portfolio"].includes(field.name) === false; }); }
roleButtons.forEach((button) => button.addEventListener("click", () => setRegistrationRole(button.dataset.role)));
if (new URLSearchParams(window.location.search).get("role") === "specialist") setRegistrationRole("specialist");
registrationForm?.addEventListener("submit", async (event) => { event.preventDefault(); const role = new FormData(registrationForm).get("role"); if (!await deliverForm(registrationForm, role === "specialist" ? "Реєстрація спеціаліста SoundCollab" : "Реєстрація клієнта SoundCollab", registrationMessage)) mailtoFallback(registrationForm, role === "specialist" ? "Реєстрація спеціаліста SoundCollab" : "Реєстрація клієнта SoundCollab"); });

document.querySelectorAll("[data-order-action]").forEach((button) => button.addEventListener("click", () => { const message = document.querySelector("#order-message"); const status = document.querySelector("#order-status"); const selected = document.querySelector("#specialist-status")?.value; const action = button.dataset.orderAction; if (action === "update" && selected) { status.textContent = selected; message.textContent = "Статус оновлено локально; команда отримає його після підключення кабінету."; } else if (action === "submit") { status.textContent = "На погодженні"; message.textContent = "Версію підготовлено до погодження."; } else if (action === "approve") { status.textContent = "Погоджено"; message.textContent = "Погодження підготовлено."; } else if (action === "comment") message.textContent = "Коментар підготовлено."; }));
document.querySelectorAll("[data-current-year]").forEach((node) => { node.textContent = String(new Date().getFullYear()); });
