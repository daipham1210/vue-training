<template>
  <ul class='panigation'>
		<li @click="firstPage" class='panigation-item'>
			<button :disabled="isFirstPage">First</button>
		</li>
		<li @click="previousPage" class='panigation-item'>
			<button :disabled="isFirstPage">Previous</button>
		</li>
		<!-- <li class='panigation-item'><button>1</button></li>
		<li class='panigation-item'><button>2</button></li>
		<li class='panigation-item'><button>3</button></li> -->
		<li 
			v-for="item in pages" 
			:key="item"
			class='panigation-item'
		>
			<button
				@click="changePage(item)"
				:class="{'activeItem': item === currentPage }"
			>
				{{ item }}
			</button>
		</li>
		<li @click="nextPage" class='panigation-item'>
			<button :disabled="isLastPage">Next</button>
		</li>
		<li @click="lastPage" class='panigation-item'>
			<button :disabled="isLastPage">Last</button>
		</li>
	</ul>
</template>

<script>

import { defineComponent, toRefs, reactive, computed, onMounted } from "vue";
export default defineComponent({
	name: 'pagination',
	props: {
		maxVisibleButtons: {
			type: Number,
			default: 3,
		},
		totalPage: Number,
		total: Number,
		perPage: Number,
	},
	setup(props) {
		const data = reactive ({
			currentPage: 1,
			startPage: computed(() => {
			}),
			pages: computed(() => {

			}),
			isFirstPage: computed(() => data.currentPage === 1),
			isLastPage: computed(() =>  data.currentPage === 3),
		})

		const changePage = (item) => {
			data.currentPage = item
		}

		const previousPage = () => {
			if (data.isFirstPage) return
			data.currentPage = data.currentPage - 1
		}

		const nextPage = () => {
			if (data.isLastPage) return
			data.currentPage = data.currentPage + 1
		}

		const firstPage = () => {
			if (data.isFirstPage) return
			data.currentPage = data.currentPage = 1
		}

		const lastPage = () => {
			data.currentPage = data.currentPage = 3

		}

		return {
			...toRefs(data),
			changePage,
			previousPage,
			nextPage,
			firstPage,
			lastPage,
		}
	}

});
</script>

<style lang="scss">
.panigation {
	display: flex;
  list-style-type: none;
	.panigation-item {
		padding: 5px;
		// button:hover {
		// 	background-color: aqua;
		// }
	}
	.activeItem {
		background-color: #4AAE9B;
	}
}
</style>
