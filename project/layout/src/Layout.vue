<template>
  <div>
    <h1>Container</h1>
    <div class="box">
      Should be Remote 1 content
      <Remote1/>
    </div>
    <div class="box">
      Should be Remote 2 content
      <Remote2/>
    </div>
  </div>
</template>
<script setup>
import Remote1 from 'remote1/Content';
import Remote2 from 'remote2/Content';
</script>
<style scoped>
.box {
  border: 1px solid black;
}
</style>
