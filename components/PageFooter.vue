<template>
  <footer class="footer">
    <span>Станислав Козин, 2016–н.в.</span>
    <SiteLinks :items="FOOTER_LINKS" />
  </footer>
</template>

<script setup lang="ts">
import { FOOTER_LINKS } from '../shared/site-links'
</script>

<style scoped>
.footer {
  margin: 4.5em 0 2em;
  font-size: 0.75em;
}

.footer>span {
  margin-bottom: 0.7em;
  display: block;
}

</style>
