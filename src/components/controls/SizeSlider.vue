<template>
	<div>
		<label for="width" class="mx-4">
			width:
			<input id="width" class="mx-2" v-model="width" type="range" min="320" max="1920" >
			<v-text-field hide-details solo-inverted class="ml-2" style="width: 64px" filled flat dense v-model="width" />
		</label>
		<label for="height" class="mx-4">
			height:
			<input id="height" class="mx-2" v-model="height" type="range" min="480" max="1080" >
			<v-text-field hide-details solo-inverted class="ml-2" style="width: 64px" filled flat dense v-model="height"  />
		</label>
	</div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";

@Component
export default class SizeSlider extends Vue {
	width = this.$store.getters.width
	height = this.$store.getters.height

	@Watch('width')
	widthChanged(value: number) {
		this.$store.commit('setProperty', {key: 'width', value})
		this.$root.$emit('re-paint')
	}

	@Watch('height')
	heightChanged(value: number) {
		this.$store.commit('setProperty', {key: 'height', value})
		this.$root.$emit('re-paint')
	}
}
</script>

<style scoped>
label {
	display: inline-flex;
	align-items: center;
}
</style>
