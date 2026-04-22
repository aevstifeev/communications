# Design System Rules

В проекте используется файл `design-tokens.json` как источник истины.

Правила:

* Всегда использовать токены из `design-tokens.json`
* Не хардкодить цвета (#xxxxxx) напрямую
* Не придумывать новые размеры текста
* Для текста использовать `styles.textStyles`
* Для цветов использовать `styles.colors`
* Для теней использовать `styles.effectStyles`

Кнопки:

* Использовать Button/XS, Button/S, Button/M
* textTransform: uppercase

Если нужно что-то, чего нет в токенах — сначала предложить добавить токен.
