# Kaiten Communication Prototypes

Репозиторий с интерактивными HTML-прототипами для проработки интерфейсов Kaiten и сценариев модуля коммуникации.

## Что в репозитории

- `index.html` - корневая витрина проекта для GitHub Pages / Vercel.
- `prototypes/communication/` - активные веб-прототипы для сравнения.
- `styles/` - общие токены и базовые стили.
- `scripts/` - общая логика shell-уровня.
- `docs/` - контекст проекта, решения и описание вариантов.
- `concepts/` - дополнительные продуктовые направления и legacy-структура исследования.

## Активные прототипы

- `prototypes/communication/base/` - базовая версия (`Base`).
- `prototypes/communication/distributed/` - распределённая концепция модуля коммуникации.
- `prototypes/communication/centralized/` - централизованная концепция модуля коммуникации.
- `prototypes/communication/quick-start/` - концепция быстрого старта ВКС с мгновенным созданием встречи и входом по ссылке.

Корневой `index.html` и `prototypes/communication/index.html` ведут в единый хаб с тремя текущими концепциями.

## Публикация

Проект собран как статический сайт без обязательного build-step.

Для Vercel:

1. Загрузить репозиторий на GitHub.
2. Импортировать репозиторий в Vercel как обычный static project.
3. В качестве root entry использовать корневой `index.html`.

## Принцип работы

- `Base` хранит контрольную точку.
- Новые направления сравниваются как самостоятельные прототипы, а не через хаотичные правки одного экрана.
- Общие токены и базовая оболочка переиспользуются между прототипами.
## Icon Source Of Truth

- Always check the shared Figma icon library first before choosing or drawing an icon for any prototype screen.
- Primary icon source: `https://www.figma.com/design/PvS0Kr2GlAatamN0Mr8kdl/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B?node-id=1090-14270&m=dev`
- Use icons from that section for left rail, top bar, right rail, drawers, meeting controls, composer actions, and any other icon-only UI.
- Only look for an alternative if the needed icon does not exist in that Figma section.
