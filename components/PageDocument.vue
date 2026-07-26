<template>
  <article class="document">
    <slot />
  </article>
</template>

<style scoped>
.document {
  max-width: 59ch;
  line-height: 1.4;
}

.document :deep(h2) {
  font-weight: normal;
  margin: 1.1em 0 -0.25em;
}

.document :deep(p) {
  margin: 1em 0;
}

.document :deep(ul) {
  list-style-type: none;
  padding-left: 1.2em;
}

.document> :deep(ul) {
  padding: 0;
}

.document :deep(li) {
  margin: 0.3em 0;
}

.document :deep(ul li::before) {
  content: '—';
  color: #bcbcbc;
  margin-right: 0.3em;
}
</style>
