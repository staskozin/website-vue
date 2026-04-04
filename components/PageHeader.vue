<template>
  <header class="header">
    <div class="top-row">
      <div
        v-if="route.path === '/'"
        class="name"
      >
        <NuxtImg
          class="photo"
          src="/img/stas.png"
          alt="Profile photo"
          width="80"
          height="80"
        />
        <span>&#1057;&#1090;&#1072;&#1085;&#1080;&#1089;&#1083;&#1072;&#1074; &#1050;&#1086;&#1079;&#1080;&#1085;</span>
      </div>
      <NuxtLink
        v-else
        class="name"
        to="/"
      >
        <NuxtImg
          class="photo"
          src="/img/stas.png"
          alt="Profile photo"
          width="80"
          height="80"
        />
        <span>&#1057;&#1090;&#1072;&#1085;&#1080;&#1089;&#1083;&#1072;&#1074; &#1050;&#1086;&#1079;&#1080;&#1085;</span>
      </NuxtLink>
      <button
        type="button"
        class="theme-toggle"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        :title="isDark ? 'Light theme' : 'Dark theme'"
        @click="toggleTheme"
      >
        <span
          class="theme-toggle-icon"
          aria-hidden="true"
        ></span>
        <span>Theme: {{ isDark ? 'Dark' : 'Light' }}</span>
      </button>
    </div>

    <h1 class="title">
      {{ props.title }}
    </h1>

    <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
    <MyContacts v-else />
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const props = defineProps<{
  title: string
  subtitle?: string
}>()
</script>

<style scoped>
.header {
  margin-bottom: 1.5em;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5em;
  margin-bottom: 0.333333em;
}

.name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  border: 1px solid var(--theme-toggle-border);
  background-color: var(--theme-toggle-bg);
  color: var(--theme-toggle-text);
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.75em;
  line-height: 1;
  padding: 0.42em 0.72em 0.5em;
  cursor: pointer;
  -webkit-transition-property: background-color, border-color, color;
  transition-property: background-color, border-color, color;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  -webkit-transition-duration: .22s;
  transition-duration: .22s;
}

.theme-toggle-icon {
  width: 0.85em;
  height: 0.85em;
  border-radius: 50%;
  background-color: var(--theme-toggle-icon-bg);
  box-shadow: inset -0.2em -0.2em 0 var(--theme-toggle-icon-shadow);
}

.theme-toggle:focus-visible {
  outline-width: 2px;
  outline-style: solid;
  outline-color: var(--focus-color);
}

.photo {
  width: 32px;
  height: 32px;
}

.title {
  font-size: 32px;
  margin: 10px 0 18px;
  font-weight: normal;
}

.subtitle {
  margin: 0;
}

@media screen and (min-width: 667px) {
  .header {
    margin-bottom: 1.666666em;
  }

  .theme-toggle {
    font-size: 0.666666em;
  }

  .photo {
    width: 40px;
    height: 40px;
  }

  .title {
    font-size: 48px;
    margin: 2px 0 20px;
  }
}

@media (hover: hover) {
  .theme-toggle:hover {
    background-color: var(--theme-toggle-hover-bg);
    -webkit-transition: none;
    transition: none;
  }
}
</style>
