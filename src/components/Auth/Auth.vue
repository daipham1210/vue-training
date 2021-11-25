<template>
  <counter v-if="userIsAuthenticated" />
	<div class="auth">
		<h1>Auth</h1>
		<el-button v-if="!userIsAuthenticated" @click="login">
			login
		</el-button>
		<el-button v-if="userIsAuthenticated" @click="logout">
			logout
		</el-button>
	</div>
</template>

<script>
import counter from "@components/counter/BaseContainer.vue";
import { defineComponent, getCurrentInstance, computed } from "vue";
export default defineComponent ({
	name: 'Auth',
	components: {
		counter
	},
	setup() {
    const vm = getCurrentInstance().proxy
		const userIsAuthenticated = computed(() => vm.$store.getters['auth/userIsAuthenticated'])

		const login = () => vm.$store.dispatch('auth/login')
		const logout = () => vm.$store.dispatch('auth/logout')
		
		return {
			userIsAuthenticated,
			login,
			logout,
		}
	}

})

</script>

<style lang="scss">
.auth {
	padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	h1 {
		display: flex;
		justify-content: center;
	}
}
</style>