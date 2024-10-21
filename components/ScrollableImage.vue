<template>
  <div ref="wrap">
    <div ref="image" :class="className" :style="style"></div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

const props = defineProps<{
  src: string
  width: number
  height: number
  numberOfImages: number
  perRow?: number
  perspective?: boolean
  rounded?: boolean
}>()

let className = "image "
if (props.perspective)
  className += "perspective "
if (props.rounded)
  className += "rounded "

const style: CSSProperties = {
  backgroundImage: `url(${props.src})`,
  aspectRatio: props.width / props.height
}

const wrap = useTemplateRef('wrap')
const image = useTemplateRef('image')


onMounted(() => {
  function updateBackgroundSize() {
    if (image.value === null) return
    if (props.perRow === undefined)
      image.value!.style.backgroundSize = `${wrap.value!.clientWidth * props.numberOfImages}px ${wrap.value!.clientHeight}px`
    else
      image.value!.style.backgroundSize = `${wrap.value!.clientWidth * props.perRow}px ${wrap.value!.clientHeight * Math.ceil(props.numberOfImages / props.perRow)}px`
  }
  const img = new window.Image()
  img.onload = updateBackgroundSize
  img.src = props.src
  window.addEventListener('resize', updateBackgroundSize)
  screen.orientation.addEventListener("change", updateBackgroundSize)

  function handleMove(clientX: number, clientY: number, rotationModifier: number) {
    const n = wrap.value!.getBoundingClientRect()
    const xVal = clientX - n.x
    if (props.perspective) {
      const yVal = clientY - n.y
      const yRotation = rotationModifier * ((xVal - image.value!.clientWidth / 2) / image.value!.clientWidth)
      const xRotation = -rotationModifier * ((yVal - image.value!.clientHeight / 2) / image.value!.clientHeight)
      const styles = 'perspective(' + image.value!.clientWidth + 'px) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg) scale(1.02)'
      requestAnimationFrame(() => {
        image.value!.style.transform = styles
        selectImage(xVal)
      })
    } else {
      requestAnimationFrame(() => {
        selectImage(xVal)
      })
    }
  }

  function selectImage(xVal: number) {
    let selected = Math.trunc(xVal / (wrap.value!.clientWidth / props.numberOfImages))
    selected = Math.min(Math.max(selected, 0), props.numberOfImages - 1) // clamp
    if (props.perRow === undefined)
      image.value!.style.backgroundPositionX = `${selected / (props.numberOfImages - 1) * 100}%`
    else
      image.value!.style.backgroundPosition = `${(selected % props.perRow) / (props.perRow - 1) * 100}% ${Math.floor(selected / props.perRow) / (Math.ceil(props.numberOfImages / props.perRow) - 1) * 100}%`
  }

  function resetPerspective() {
    image.value!.style.transform = 'perspective(' + image.value!.clientWidth + 'px) scale(1) rotateX(0) rotateY(0)'
    image.value!.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 2px 6px, rgba(0, 0, 0, 0.23) 0px 2px 6px'
  }

  function setShadow() {
    image.value!.style.boxShadow = 'rgba(50, 50, 93, 0.3) 0px 13px 27px -5px, rgba(0, 0, 0, 0.35) 0px 8px 16px -8px'
  }

  wrap.value!.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY, 10))
  wrap.value!.addEventListener('touchmove', (e) => handleMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 7))
  if (props.perspective) {
    wrap.value!.addEventListener('mouseout', resetPerspective)
    wrap.value!.addEventListener('touchend', resetPerspective)
    wrap.value!.addEventListener('touchstart', setShadow)
    wrap.value!.addEventListener('mouseover', setShadow)
  }
})
</script>

<style scoped>
.perspective {
  position: relative;
  transition: transform 0.1s, box-shadow 0.2s;
  backface-visibility: hidden;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 6px, rgba(0, 0, 0, 0.23) 0px 2px 6px;
}

.rounded {
  border-radius: .67em;
}

.image {
  image-rendering: smooth;
}
</style>
