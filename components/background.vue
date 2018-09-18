<template>
  <div class="canvas-wrapper" ref="el"></div>
</template>

<script src="@/components/background.js"></script>

<style scoped>
.canvas-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: #f1f1f1;
}
</style>

