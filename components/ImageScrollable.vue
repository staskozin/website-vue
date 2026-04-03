<template>
  <div ref="wrap">
    <div
      ref="image"
      :class="className"
      :style="style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

const props = defineProps<{
  src: string
  width: number
  height: number
  numberOfImages: number
  perRow?: number
  perspective?: boolean
  rounded?: boolean
}>()

const columns = props.perRow ?? props.numberOfImages
const rows = Math.ceil(props.numberOfImages / columns)

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
let cleanup: (() => void) | null = null


onMounted(() => {
  if (wrap.value === null || image.value === null) return

  const wrapEl = wrap.value
  const imageEl = image.value
  const dpr = window.devicePixelRatio || 1

  const snapToDevicePixel = (value: number) => Math.round(value * dpr) / dpr
  const toAngle = (value: number) => Math.round(value * 100) / 100

  let frameWidth = 0
  let frameHeight = 0
  let selectedImage = -1
  let rafId = 0
  let pendingX = 0
  let pendingY = 0
  let pendingRotationModifier = 10
  let hasPendingMove = false

  function readFrameSize() {
    const rect = wrapEl.getBoundingClientRect()
    frameWidth = snapToDevicePixel(rect.width)
    frameHeight = snapToDevicePixel(rect.height)
  }

  function selectImage(selected: number) {
    const clamped = Math.min(Math.max(selected, 0), props.numberOfImages - 1)
    if (clamped === selectedImage) return
    selectedImage = clamped

    const col = clamped % columns
    const row = Math.floor(clamped / columns)
    const x = -snapToDevicePixel(col * frameWidth)
    const y = -snapToDevicePixel(row * frameHeight)
    imageEl.style.backgroundPosition = `${x}px ${y}px`
  }

  function updateBackgroundSize() {
    readFrameSize()
    imageEl.style.backgroundSize = `${snapToDevicePixel(frameWidth * columns)}px ${snapToDevicePixel(frameHeight * rows)}px`
    selectImage(selectedImage < 0 ? 0 : selectedImage)
  }

  function applyMove() {
    rafId = 0
    if (!hasPendingMove) return

    hasPendingMove = false
    const xVal = Math.min(Math.max(pendingX, 0), frameWidth)
    const yVal = Math.min(Math.max(pendingY, 0), frameHeight)

    if (props.perspective) {
      const yRotation = toAngle(pendingRotationModifier * ((xVal - frameWidth / 2) / frameWidth))
      const xRotation = toAngle(-pendingRotationModifier * ((yVal - frameHeight / 2) / frameHeight))
      imageEl.style.transform = `translateZ(0) perspective(${frameWidth}px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`
    }

    const zoneWidth = frameWidth / props.numberOfImages || 1
    const nextSelected = Math.trunc(xVal / zoneWidth)
    selectImage(nextSelected)
  }

  function scheduleMove(clientX: number, clientY: number, rotationModifier: number) {
    const rect = wrapEl.getBoundingClientRect()
    pendingX = clientX - rect.left
    pendingY = clientY - rect.top
    pendingRotationModifier = rotationModifier
    hasPendingMove = true

    if (rafId !== 0) return
    rafId = window.requestAnimationFrame(applyMove)
  }

  function resetPerspective() {
    imageEl.style.transform = `translateZ(0) perspective(${frameWidth}px) scale(1) rotateX(0) rotateY(0)`
    imageEl.style.boxShadow = 'rgba(0, 0, 0, 0.16) 0px 2px 6px, rgba(0, 0, 0, 0.23) 0px 2px 6px'
  }

  function setShadow() {
    imageEl.style.boxShadow = 'rgba(50, 50, 93, 0.3) 0px 13px 27px -5px, rgba(0, 0, 0, 0.35) 0px 8px 16px -8px'
  }

  const handleMouseMove = (e: MouseEvent) => scheduleMove(e.clientX, e.clientY, 10)
  const handleTouchMove = (e: TouchEvent) => scheduleMove(e.changedTouches[0].clientX, e.changedTouches[0].clientY, 7)

  const img = new window.Image()
  img.onload = updateBackgroundSize
  img.src = props.src
  updateBackgroundSize()

  window.addEventListener('resize', updateBackgroundSize)
  screen.orientation?.addEventListener('change', updateBackgroundSize)
  wrapEl.addEventListener('mousemove', handleMouseMove)
  wrapEl.addEventListener('touchmove', handleTouchMove)

  if (props.perspective) {
    wrapEl.addEventListener('mouseout', resetPerspective)
    wrapEl.addEventListener('touchend', resetPerspective)
    wrapEl.addEventListener('touchstart', setShadow)
    wrapEl.addEventListener('mouseover', setShadow)
  }

  cleanup = () => {
    window.removeEventListener('resize', updateBackgroundSize)
    screen.orientation?.removeEventListener('change', updateBackgroundSize)
    wrapEl.removeEventListener('mousemove', handleMouseMove)
    wrapEl.removeEventListener('touchmove', handleTouchMove)

    if (props.perspective) {
      wrapEl.removeEventListener('mouseout', resetPerspective)
      wrapEl.removeEventListener('touchend', resetPerspective)
      wrapEl.removeEventListener('touchstart', setShadow)
      wrapEl.removeEventListener('mouseover', setShadow)
    }

    if (rafId !== 0)
      window.cancelAnimationFrame(rafId)
  }
})

onUnmounted(() => {
  cleanup?.()
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
  background-repeat: no-repeat;
  background-position: 0 0;
  transform: translateZ(0);
  will-change: background-position, transform;
}
</style>
