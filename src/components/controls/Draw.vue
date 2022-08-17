<template>
	<div>
		<v-btn icon class="primary accent--text" @click="$root.$emit('re-draw')">
			<v-icon>mdi-reload</v-icon>
		</v-btn>
		<v-btn icon class="primary accent--text" @click="download">
			<v-icon>mdi-cloud-download</v-icon>
		</v-btn>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Draw extends Vue {

	download() {
		const svg = document.querySelector('.background-wrapper > svg')
		// eslint-disable-next-line no-undef
		downloadSvg(svg, '1337.jpg', this.$store.getters.width, this.$store.getters.height)
	}
}
</script>

<style scoped>

</style>
