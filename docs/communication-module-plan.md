# Communication Module Plan

## Goal

Подготовить набор параллельных веб-прототипов, который можно публиковать как Git-репозиторий и сразу деплоить в Vercel без дополнительной сборки.

## Working Model

- Корневой `index.html` теперь работает как publish-ready витрина репозитория.
- Активные версии модуля коммуникации живут в `prototypes/communication/`.
- `prototypes/communication/base/` хранит базовую версию (`Base`).
- `prototypes/communication/distributed/` хранит распределённую версию модуля коммуникации.
- `prototypes/communication/centralized/` хранит централизованную версию модуля коммуникации.
- `prototypes/communication/quick-start/` хранит минимальную ветку под сценарий мгновенного старта ВКС.
- `prototypes/communication/index.html` используется как отдельный хаб сравнения вариантов.

## Invariants

- Не смешиваем рабочие альтернативы в один HTML-файл.
- Общие токены, базовые стили и shell-логика остаются в `styles/` и `scripts/`.
- Для внешней публикации главным контуром считаем `index.html` и `prototypes/`.
- Исторические и промежуточные артефакты сохраняем отдельно от активного runtime-контура.

## Prototype Flow

1. Держим `Base` как контрольную точку.
2. Развиваем распределённую и централизованную версии как независимые entry points.
3. Фиксируем гипотезы и критерии сравнения в `docs/communication-variants.md`.
4. Используем корневой `index.html` как publish-ready вход и сохраняем `prototypes/communication/index.html` как тот же хаб внутри структуры прототипов.
5. После выбора итогового направления переносим выводы в следующий продуктовый контур.

## Naming Rule

- Используем смысловые имена уровня `base`, `distributed`, `centralized`.
- Названия должны быть понятны без знания внутренней истории папок.
- Legacy-структура допускается только как архивный слой, а не как основная навигация.

## Active Runtime Structure

- `prototypes/communication/base/`
- `prototypes/communication/distributed/`
- `prototypes/communication/centralized/`
- `prototypes/communication/quick-start/`
