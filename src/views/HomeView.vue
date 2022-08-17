<template>
	<div class="home">
		<Header />
		<Background />
		<Controls />
	</div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import Background from "@/components/Background.vue";
import BackgroundControls from "@/components/helper/BackgroundControls.vue";
import Controls from "@/components/controls/index.vue";
import Header from "@/components/helper/Header.vue";
// @ is an alias to /src

@Component({
	components: {
		Header,
		Controls,
		BackgroundControls,
		Background,
		HelloWorld,
	},
})
export default class HomeView extends Vue {

}
</script>

<style>
.home {
	padding-top: 16px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
