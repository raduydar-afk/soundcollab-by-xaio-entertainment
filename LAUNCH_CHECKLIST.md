# SoundCollab launch checklist

## Готово зараз

- Публічний responsive сайт і каталог послуг.
- Підтверджені контакти: sound.collab.official@gmail.com, +38 (093) 610-90-58.
- Order request через email fallback без збереження персональних даних на GitHub Pages.
- Сторінки правил оплати, прав, відповідальності та FAQ.
- GitHub Pages deployment з `main`.

## Не вмикати без підготовки

- Не додавати payment secret до frontend або репозиторію.
- Не називати профілі, відгуки, ціни, availability чи цифри реальними без джерела.
- Не приймати карткові дані через GitHub Pages.

## Перед production payment

1. Обрати PSP (LiqPay, WayForPay або Stripe) і створити merchant account.
2. Створити backend endpoint для checkout, webhook signature verification, refunds і payout ledger.
3. Зафіксувати юридичну особу, податки, terms, privacy, cancellation і rights templates.
4. Додати auth, database, private file storage, notifications і role permissions.
5. Пройти тестові платежі в sandbox, перевірити webhook replay/idempotency і лише потім увімкнути live mode.

До виконання цих пунктів сайт працює як lead-generation та ручний intake, а не як платіжний marketplace.
