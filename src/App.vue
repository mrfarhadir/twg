<template>
	<v-app app style="margin: 0">
		<router-view/>
	</v-app>
</template>

<style>
#app, body {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	background: #2c3e50;
	margin-bottom: 64px;
}

nav {
	padding: 30px;
}

nav a {
	font-weight: bold;
	color: #2c3e50;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Header from "@/components/helper/Header.vue";

@Component({
	components: {Header}
})
export default class App extends Vue {
}
</script>