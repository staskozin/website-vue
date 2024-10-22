<template>
  <masonry-wall :items="items" :column-width="296" :gap="30" :min-columns="1" :max-columns="3">
    <template #default="{ item }">
      <ProjectItem :text="item.text" :href="item.href">
        <ImageScrollable :src="item.src" :width="item.width" :height="item.height"
          :number-of-images="item.numberOfImages" :per-row="item.perRow" :perspective="item.perspective"
          :rounded="item.rounded" />
      </ProjectItem>
    </template>
  </masonry-wall>
</template>

<script setup lang="ts">
type Item = {
  href: string
  text: string
  src: string
  width: number
  height: number
  numberOfImages: number
  perRow?: number
  perspective?: boolean
  rounded?: boolean
}
const items: Item[] = [
  {
    href: '/rice-calculator',
    text: 'Как варить рис',
    src: '/img/project/rice.jpg',
    width: 550,
    height: 413,
    numberOfImages: 5,
    perspective: true,
    rounded: true
  },
  {
    href: 'https://salon-kartin.ru',
    text: 'Сайт салона картин на\xa0Южной',
    src: '/img/project/salon.jpg',
    width: 550,
    height: 464,
    numberOfImages: 4,
    perspective: true
  },
  {
    href: 'https://avorio.biz',
    text: 'Сайт компании Авориоматикс',
    src: '/img/project/avorio.jpg',
    width: 550,
    height: 623,
    numberOfImages: 4
  },
  {
    href: 'https://vesko.info',
    text: 'Сайт компании Вэско-электро',
    src: '/img/project/vesko.jpg',
    width: 550,
    height: 731,
    numberOfImages: 3
  },
  {
    href: 'https://github.com/staskozin/url-apps',
    text: 'Приложения, умещающиеся в\xa0адресной строке',
    src: '/img/project/url-apps.png',
    width: 518,
    height: 192,
    numberOfImages: 42,
    perRow: 4
  },
  {
    href: 'https://profkoptilnya.ru/constructor',
    text: 'Конструктор коптилен',
    src: '/img/project/smoker.jpg',
    width: 550,
    height: 391,
    numberOfImages: 5
  },
  {
    href: 'https://stolpodnos.ru/constructor',
    text: 'Конструктор столиков для\xa0завтрака в\xa0постель',
    src: '/img/project/table.jpg',
    width: 550,
    height: 465,
    numberOfImages: 4
  },
  {
    href: 'https://gradremont.staskozin.ru',
    text: 'Сайт компании Град Ремонт',
    src: '/img/project/gradremont.jpg',
    width: 550,
    height: 558,
    numberOfImages: 12,
    perRow: 4
  },
  {
    href: 'https://2ch.hk',
    text: 'Сайт фотостудии Превращение',
    src: '/img/project/3dphoto.jpg',
    width: 550,
    height: 904,
    numberOfImages: 48,
    perRow: 8,
  },
  {
    href: 'https://cinema.staskozin.ru',
    text: 'Сайт кинотеатра для\xa0курсовой работы',
    src: '/img/project/cinema.jpg',
    width: 552,
    height: 735,
    numberOfImages: 3,
    rounded: true
  }
]
</script>
