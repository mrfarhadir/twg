<template>
	<v-menu offset-y>
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="primary"
				class="ml-4"
				dark
				v-bind="attrs"
				v-on="on"
			>
				Styles ({{$store.getters.shapes[activeShape]}})
			</v-btn>
		</template>
		<v-list>
			<v-list-item
				v-for="(item, index) in $store.getters.shapes"
				:key="index"
				@click="setShape(index)"
			>
				<v-list-item-title>{{ item }}</v-list-item-title>
			</v-list-item>
			<v-list-item disabled>
				More styles on the way...
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import Vue from "vue";

@Component
export default class Styles extends Vue {
	activeShape = 0

	setShape(shapeIndex: number) {
		this.activeShape = shapeIndex
		this.$root.$emit('setStyle', shapeIndex)
	}
}
</script>

<style scoped>

</style>