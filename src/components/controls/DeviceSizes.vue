<template>
	<div class="device-sizes">
		<v-btn :loading="activeLoadingIndex === i" :title="item.width + 'x' + item.height" class="mx-1" icon v-for="(item, i) in devices" :key="i" @click="setSize(item.width, item.height, i)">
			<v-icon>{{ item.icon }}</v-icon>
		</v-btn>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class DeviceSizes extends Vue {
  activeLoadingIndex = -1
	devices = [
		{
			width: 2560,
			height: 1600,
			icon: 'mdi-video-4k-box'
		},
		{
			width: 1920,
			height: 1080,
			icon: 'mdi-monitor'
		},
		{
			width: 1600,
			height: 1024,
			icon: 'mdi-laptop'
		},
		{
			width: 1337,
			height: 768,
			icon: 'mdi-monitor-small'
		},
		{
			width: 1024,
			height: 768,
			icon: 'mdi-tablet'
		},
		{
			width: 390,
			height: 844,
			icon: 'mdi-cellphone'
		},
	]

	setSize(width: number, height: number, index: number) {
    this.activeLoadingIndex = index
		this.$store.commit('setProperty', {key: 'width', value: width})
		this.$store.commit('setProperty', {key: 'height', value: height})
    this.$root.$emit('re-draw')
    this.activeLoadingIndex = -1
	}
}
</script>

<style>
.device-sizes {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
