<template>
	<div class="background-wrapper">
		<svg ref="svg" :height="$store.getters.height" :width="$store.getters.width"/>
	</div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {Rod} from "@/class/Rod";
import {Stripe} from "@/class/stripe/Stripe";
import axios from "axios";
import {ImageProcessor} from "@/class/ImageProcessor";
import {ImageProcessEvents} from "@/class/enums";
import {Logo} from "@/class/Logo";
import {sleep} from "@/utils/General";

@Component
export default class Background extends Vue {

	style = 2

	background = '#0c0c91'
	foreground = '#05e273'

	logoUrl = '/img/logo.svg'
	logoBase64 = ''

	svg = {} as SVGElement
	logo: Logo = {} as Logo

	mounted() {
		const svg = document.querySelector('svg') || {} as SVGElement
		this.setBackground()
		this.logo = new Logo(svg, this.logoUrl)
		this.init()

		this.$root.$on('re-draw', async () => {
			this.$store.commit('setProperty', {key: 'loading', value: true})
			await sleep(0.3)
			this.init()
			this.$store.commit('setProperty', {key: 'loading', value: false})
		})

		this.$root.$on('setStyle', (style: number) => {
			this.style = style
			this.init()
		})
	}

	@Watch('$store.getters.height')
	widthChanged() {
		this.init()
	}

	@Watch('$store.getters.width')
	heightChanged() {
		this.init()
	}

	init() {
		const svg = document.querySelector('svg') || {} as SVGElement
		svg.innerHTML = ''
		this.applyStripeBackground()
		// this.initLogo()
		const imageProcessor = new ImageProcessor()

		imageProcessor.findSuitableAreaForLogo(svg)

		imageProcessor.on<Matrix>(ImageProcessEvents.LOGO_AREA_FOUND, async (areasPercent) => {
			console.log(areasPercent)
			this.logo.setAreaPercent(areasPercent)
			await this.logo.init()
			this.$store.commit('setProperty', {key: 'loading', value: false})
		})
	}

	setBackground() {
		const svg = document.querySelector('svg') || {} as SVGElement
		svg.style.backgroundColor = this.background
	}

	applyStripeBackground() {
		const svg = document.querySelector('svg') || {} as SVGElement
		const stripe = new Stripe({height: this.$store.getters.height, width: this.$store.getters.width}, svg, this.style)
		stripe.setColor(this.foreground)
		stripe.render()
	}

	async getLogo() {
		try {
			const response = await axios.get(this.logoUrl)
			const data = response.data
		} catch (e) {
			console.log(e)
		}
	}

	async initLogo() {
		const svg = this.$refs.svg as SVGElement
		let imageWrapper = svg.querySelector('g.image-wrapper')
		if (!imageWrapper) {
			svg.innerHTML += '<g class="image-wrapper"></g>'
			imageWrapper = svg.querySelector('g.image-wrapper')
		} else {
			imageWrapper.innerHTML = ''
		}

		const logo = new Image() // create image to get height and width in order to put it exactly in center
		logo.src = this.logoUrl
		logo.onload = () => {
			const existedCanvas = document.querySelector('canvas')
			if (existedCanvas) {
				existedCanvas.remove()
			}
			var canvas = document.createElement('canvas')
			const ctx = canvas.getContext("2d");
			canvas.width = 3 * logo.width;
			canvas.height = 3 * logo.height;
			console.log(logo.naturalHeight, logo.naturalWidth)
			if (ctx)
				ctx.drawImage(logo, 0, 0, 3 * logo.naturalWidth, 3 * logo.naturalHeight);
			document.body.append(canvas)
			this.logoBase64 = canvas.toDataURL('png', 100)
			const positionX = (this.$store.getters.width / 2) - (logo.width / 2)
			const positionY = (this.$store.getters.height / 2) - (logo.height / 2)
			const existedLogoSvg = document.querySelector('.background-wrapper > svg #logo')
			const logoSvg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
			logoSvg.setAttribute('id', 'logo')
			logoSvg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.logoBase64);
			logoSvg.setAttributeNS(null, 'height', (3 * logo.height).toString());
			logoSvg.setAttributeNS(null, 'width', (3 * logo.width).toString());
			// logoSvg.setAttributeNS(null, 'x', positionX.toString());
			// logoSvg.setAttributeNS(null, 'y', positionY.toString());
			// logoSvg.style.transform = 'rotate(45deg)'
			// logoSvg.style.transformOrigin = 'center'
			if (imageWrapper)
				imageWrapper.append(logoSvg)
		}


	}

	addRod() {
		const svg = this.$refs.svg as SVGElement
		const rod = new Rod({height: this.$store.getters.height, width: this.$store.getters.width}, svg)
		rod.setColor(this.foreground)
		rod.render()
	}
}
</script>

<style>
.background-wrapper {
	display: flex;
	transform: scale(.85);
	border: 2px #ccc dashed;
}
</style>