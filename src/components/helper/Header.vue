<template>
	<div>
		<h1 class="accent--text">1337 Wallpaper Generator</h1>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Header extends Vue {
}
</script>

<style scoped>
h1 {
	font-weight: 300;
}
</style>