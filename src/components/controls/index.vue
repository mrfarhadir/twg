<template>
	<v-card tile dark class="controls" :class="active ? 'active' : ''">
		<div class="d-flex align-center justify-center">
			<Sizes />
			<Styles />
		</div>
		<!--Draw / -->
		<DeviceSizes />
		<div>
			<v-btn :loading="$store.getters.isLoading" icon class="primary accent--text" @click="rePaint">
				<v-icon>mdi-reload</v-icon>
			</v-btn>
			<v-btn icon class="primary accent--text mx-2" @click="download">
				<v-icon>mdi-cloud-download</v-icon>
			</v-btn>
			<v-btn :style="active ? '' : 'bottom: 16px; left: 16px'" class="primary accent--text" :fixed="!active" icon @click="active = !active"  >
				<v-icon>{{ active ? 'mdi-chevron-left' : 'mdi-chevron-right'}}</v-icon>
			</v-btn>
		</div>
	</v-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SizeSlider from "@/components/controls/SizeSlider.vue";
import DeviceSizes from "@/components/controls/DeviceSizes.vue";
import Sizes from "@/components/controls/Sizes.vue";
import Draw from "@/components/controls/Draw.vue";
import Styles from "@/components/controls/Styles.vue";

@Component({
	name: 'Controls',
	components: {Styles, Draw, Sizes, DeviceSizes, SizeSlider}
})
export default class Controls extends Vue {
	active = true

	rePaint() {
		console.log('okkkkk')
		this.$root.$emit('re-paint')
	}

	download() {
		const svg = document.querySelector('.background-wrapper > svg')
		// eslint-disable-next-line no-undef
		downloadSvg(svg, '1337.jpg', this.$store.getters.width, this.$store.getters.height)
	}
}
</script>

<style>
.v-card.controls {
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(0, 0, 0, 0.75);
	width: 0;
	transition: all 650ms cubic-bezier(0, 1, 1, 1);
	height: 64px;
	bottom: 0;
}

.controls.active {
	width: 100%;
	padding: 0 16px;
}
</style>