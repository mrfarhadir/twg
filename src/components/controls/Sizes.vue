<template>
	<div>
		<v-btn color="primary" @click="sliderSheet = !sliderSheet">
			{{$store.getters.width}}x{{$store.getters.height}}
		</v-btn>
		<v-bottom-sheet v-model="sliderSheet" width="100%">
			<v-card dark style="width: 100%" :height="64" class="d-flex align-center justify-center">
				<SizeSlider />
				<v-btn icon fixed right class="primary accent--text" @click="sliderSheet = false"  >
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card>
		</v-bottom-sheet>
	</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SizeSlider from "@/components/controls/SizeSlider.vue";
@Component({
	components: {SizeSlider}
})
export default class Sizes extends Vue {
	sliderSheet = false
}
</script>

<style scoped>

</style>
