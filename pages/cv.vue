<template>
  <PageHeader title="Фронтенд-разработчик" />
  <div class="resume">
    <h2 id="skills">Ключевые навыки</h2>
    <ul class="skills">
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
      <li>TypeScript</li>
      <li>Vue</li>
      <li>Nuxt</li>
      <li>React</li>
      <li>Next.js</li>
    </ul>
    <h2 id="about">О&nbsp;себе</h2>
    <p>С&nbsp;2016 года занимался фрилансом (сайты, телеграм-боты, дизайн), сейчас хочу найти постоянную работу
      Frontend-разработчиком. Предпочитаю Vue или React. Чаще всего был единственным
      разработчиком на&nbsp;проекте, теперь хочу поработать в&nbsp;команде. Интереснее всего гибридный график работы
      (3&nbsp;дня удаленно, 2&nbsp;в офисе), но&nbsp;готов рассмотреть любые предложения.</p>
    <p>Люблю веб за&nbsp;то, что можно быстро создать приложение и&nbsp;запустить на&nbsp;любом устройстве. Умею
      гуглить, могу быстро набросать рабочий прототип на&nbsp;незнакомой технологии. Трудности не&nbsp;пугают, готов
      погрузиться в&nbsp;работу.</p>
    <h2 id="work">Чем занимался</h2>
    <p>На&nbsp;данный момент, самый крупный проект на&nbsp;Vue&nbsp;&mdash; лендинг с&nbsp;динамическим контентом:</p>
    <ul>
      <li>Редактирование содержимого через админку, состоящую из&nbsp;5&nbsp;страниц.</li>
      <li>Контент зависит от&nbsp;страны пользователя, страна определяется автоматически.</li>
      <li>Мной спроектирована&nbsp;БД и&nbsp;работа с&nbsp;ней осуществляется через Nuxt server API.</li>
    </ul>
    <p>Стек: Nuxt, Pinia, PrimeVue, PostgreSQL.</p>
    <br>
    <p>Мой отец занимается интернет-торговлей, а&nbsp;я&nbsp;помогаю ему со&nbsp;всем, что связано с&nbsp;ИТ.
      В&nbsp;частности:</p>
    <ul>
      <li>Cоздавал и&nbsp;поддерживал интернет-магазины на&nbsp;готовом движке: устанавливал и&nbsp;настраивал модули,
        модифицировал стандартный шаблон, верстал шаблоны с&nbsp;нуля.</li>
      <li>Для двух магазинов создал <a href="https://stolpodnos.ru/constructor">конструктор столиков для завтрака</a>
        и&nbsp;<a href="https://profkoptilnya.ru/constructor">конструктор коптилен</a>.<ul>
        </ul>
      </li>
      <li>Разработал программу, которая генерирует картинки для карточек товаров на&nbsp;маркетплейсах (инфографику).
        Для генерации нужно заполнить Excel-таблицу и&nbsp;сверстать HTML-шаблон. Программа распарсит таблицу, откроет
        Chrome, подставит в&nbsp;шаблон данные и&nbsp;сделает скриншоты, которые сохранятся по&nbsp;указанному пути.
      </li>
    </ul>
    <p>Стек: HTML, CSS, JavaScript, TypeScript, React, Redux, Puppeteer, OpenCart.</p>
    <br>
    <p>Другим заказчиком является компания, занимающаяся поставками электрооборудования. Для них я&nbsp;делал следующее:
    </p>
    <ul>
      <li>Разработал программу, интегрирующую каталог товаров Siemens в&nbsp;систему &laquo;Мой склад&raquo;.</li>
      <li>На&nbsp;основе интегратора сделал небольшую админку и&nbsp;телеграм-бота.</li>
      <li>Создал сайты-каталоги продукции, один реализован как полноценный интернет-магазин, а&nbsp;другой как
        сайт-визитка:<ul>
          <li><a href="https://vesko.info">https://vesko.info</a></li>
          <li><a href="https://avorio.biz">https://avorio.biz</a></li>
        </ul>
      </li>
    </ul>
    <p>Стек: Node.js, TypeScript, Fastify, Puppeteer, React, Telegram API, OpenCart.</p>
    <br>
    <p>Помимо этого, делал разные небольшие проекты. Например, <a href="https://salon-kartin.ru/">сайт для салона
        картин</a>, на&nbsp;котором, собственно, можно выбрать и&nbsp;заказать картину. Некоторые проекты, потерявшие
      актуальность, заархивированы на&nbsp;моём сайте.</p>
    <p>Мои сайты хорошо работают во&nbsp;всех браузерах, кроме совсем древних, типа IE11.</p>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Резюме Станислава Козина, веб-разработчика'
})
</script>

<style scoped>
.resume {
  max-width: 59ch;
  line-height: 1.4;
}

.resume h2 {
  font-weight: normal;
  margin: 1.1em 0 -0.25em;
}

.resume p {
  margin: 1em 0;
}

.resume ul {
  list-style-type: none;
  padding-left: 1.2em;
}

.resume>ul {
  padding: 0;
}

.resume li {
  margin: 0.3em 0;
}

.resume ul li::before {
  content: '—';
  color: #bcbcbc;
  margin-right: 0.3em;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8em;
  margin-top: 0.8em;
}

.skills li {
  display: inline-block;
  background: linear-gradient(to top, #deecf6, #e8f6ff);
  margin: 0;
  padding: 0.1em 0.6em 0.25em;
  border-radius: 0.3em;
}

.skills li::before,
.contacts li::before {
  content: none !important;
}
</style>