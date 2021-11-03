<script>
	import { Router, Route } from "svelte-navigator";
	import Header from './header/Header.svelte';
	import Login from "./user/Login.svelte";
	import Register from "./user/Register.svelte";
	import Map from "./map/Map.svelte";
	import PrivateRoute from "./PrivateRoute.svelte";
</script>


<Router primary={false}>
  <Header />

  <main>
	<Route path="/">
		Test
	</Route>
	
	<Route path="/map" component={Map} />

    <Route path="register" component={Register} />

	<Route path="login" component={Login} />
  </main>
</Router>


<style>
	main {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 60px);
		margin: 0 auto;
		max-width: 1440px;
		padding: 0 20px;
		width: 100%;
	}
</style>