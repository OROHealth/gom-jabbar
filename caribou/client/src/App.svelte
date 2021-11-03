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
	<PrivateRoute path="/">
      <Map />
    </PrivateRoute>

    <Route path="register" component={Register} />

	<Route path="login" component={Login} />
  </main>
</Router>


<style>
	main {
		background: url('/images/background.jpeg') no-repeat;
		background-size: cover;
		height: calc(100vh - 60px);
		margin: 0 auto;
		padding: 0 20px;
		position: relative;
		width: 100%;
	}
</style>