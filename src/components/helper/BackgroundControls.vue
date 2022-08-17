<template>
	<div>
		<label for="width">
			Width
			<input v-model="width" type="range" min="320" max="1920" >
		</label>
		<label for="height">
			Height
			<input v-model="height" type="range" min="480" max="1080" >
		</label>
	</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";

@Component
export default class BackgroundControls extends Vue {
	width = 1024
	height = 768

	@Watch('width')
	widthChanged(value: number) {
		this.$store.commit('setProperty', {key: 'width', value})
	}

	@Watch('height')
	heightChanged(value: number) {
		this.$store.commit('setProperty', {key: 'height', value})
	}
}
</script>

<style scoped>

</style>
