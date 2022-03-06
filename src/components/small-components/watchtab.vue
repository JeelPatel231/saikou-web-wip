<template>
  <div>{{ id }}</div>
  WATCH COMPONENT
</template>

<script>
export default {
  name: "watchtab",
  props: ["id", "details"], // details here to suppress prop pass warning
};
</script>

<style lang="scss" scoped></style>
