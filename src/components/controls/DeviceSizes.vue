<template>
	<div class="device-sizes">
		<v-btn class="mx-1" icon v-for="(item, i) in devices" :key="i" @click="setSize(item.width, item.height)">
			<v-icon>{{ item.icon }}</v-icon>
		</v-btn>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class DeviceSizes extends Vue {
	devices = [
		{
			width: 1920,
			height: 1080,
			icon: 'mdi-monitor'
		},
		{
			width: 1600,
			height: 1400,
			icon: 'mdi-laptop'
		},
		{
			width: 1337,
			height: 1024,
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

	setSize(width: number, height: number) {
		this.$store.commit('setProperty', {key: 'width', value: width})
		this.$store.commit('setProperty', {key: 'height', value: height})
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
