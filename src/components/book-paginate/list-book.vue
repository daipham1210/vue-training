<template>
	<pagination 
		:total-page="11"
	/>
</template>
<script>
import pagination from "@components/book-paginate/pagination.vue";

import { defineComponent } from 'vue'
export default defineComponent({
	name: 'ListBook',
	components: {
		"pagination": pagination
	},
})
</script>
