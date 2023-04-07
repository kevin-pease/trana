<script>
	import Modal from "./Modal.svelte";
	import Graph from "./Graph.svelte";
	import AddUser from "./AddUser.svelte";
	import UserList from "./UserList.svelte";
	import MonthList from "./MonthList.svelte";
    import {openModal, closeModal} from "./Modal.svelte";
	import {api, getRandomGreeting} from "./tools";

	const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	const date = new Date();
	let currentMonthIndex;
	let currentMonthName;
	
	let exercises;
	let userName;
	let users;
	let activeUser = -1;
	let dataLoaded = false;
	let showSplash = true;
	let showGraph = false;
	
	// Attempt registering service worker
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js')
		.then(function(registration) {
		console.log('Registration successful, scope is:', registration.scope);
		})
		.catch(function(error) {
		console.log('Service worker registration failed, error:', error);
		});
	}

	// Get pre-existing exercises from database and store in local storage
	async function getExternalExercises() {
		let result  = await api('GET', '/externalexercises');
		localStorage.setItem('externalExercises', JSON.stringify(result));
	}

	// Adds an exercise to local storage
	function addNewExercise(newExercise) {
		exercises.push(newExercise);
		// localStorage.setItem('exercises', exercises);
	}

	// Adjusts the current month index; wraps around januari/december
	function updateMonth(value) {
		currentMonthIndex = (currentMonthIndex + 12 + value) % 12;
		currentMonthName = months[currentMonthIndex];
	}

	// Returns an array of exercises for current month for a user
	function getExercisesByMonth() {
		let exercisesCurrentMonth = [];
		if (exercises) {
			for (var i=0; i < exercises.length; i++) {
				let exercise = exercises[i];
				let dat = exercise.date.slice(5,7);
				if (dat == Number(currentMonthIndex+1)) {
					exercisesCurrentMonth.push(exercise);
				}
			}
		}
		return exercisesCurrentMonth;
	}
	
	// Sets all variables so that it triggers the splash screen
	function enableSplash() {
		activeUser = -1;
		showSplash = true;
		showGraph = false;
	}
	
	// Sets all variables so that it triggers the hiding of the splash screen
	function disableSplash() {
		showSplash = false;
		showGraph = false;
	}

	// Sets all variables so that it triggers the graph page
	function enableGraph() {
		if (dataLoaded == true && activeUser > 0) {
			showSplash = false;
			showGraph = true;
		}
	}

	// Gets a list of all users from database and stores it in local storage.
	// Also sets the `dataLoaded` boolean to true, triggering the hiding of loading animation
	function getUsers() {
		setTimeout(async function() {
			users  = await api('GET', '/users');
			localStorage.setItem('users', users);
			dataLoaded = true;
		}, 3000); // Simulated transmission delay for testing purposes
	}

	// Gets all exercises for a user and stores it in local storage
	async function getProfileData(userId, username) {
		currentMonthIndex = date.getMonth(); // Note that date.getMonth() returns a value between 0-11
		currentMonthName = months[currentMonthIndex];
		localStorage.setItem('username', username);
		localStorage.setItem('userId', userId);
		activeUser = userId;
		userName = username;
		let result  = await api('GET', '/users/'+activeUser+'/exercises');
		if (result.hasOwnProperty("error")) {
			exercises = null; 
		} else {
			exercises = result;
		}
		currentMonthIndex += 1; // This needs to be here for the e2e test to work in chrome.
		currentMonthIndex -= 1;

	}

	// Opens a modal window for adding a new user
	function addUser() {
        openModal(AddUser, {onSubmit:submitAdd});
    }
    
	// Callback function for the `add profile` dialog. Stores the new user in database and local storage
    async function submitAdd(username, profilePicId) {
        let newUserId = await api('POST', '/users/', {"username":username, "profile_pic_id":profilePicId});
		users.push({id:newUserId, name:username, profile_pic_id:profilePicId})
		users = [...users];
		localStorage.setItem('users', users);
        closeModal();
    }

	// Callback function for the `edit profile` dialog. Stores the changes in local storage. Api request is made in UserProfile.svelte
	function editProfile(profile) {
		for (var i=0; i< users.length; i++) {
 		   if (users[i].id == profile.id) {
				users[i] = profile;
			}
		}
		users = [...users];
		showSplash = false;
		activeUser = -1;
	}


	$: exercisesByMonth = getExercisesByMonth(currentMonthIndex);
	$: greeting = (activeUser > 0) ? getRandomGreeting() : getRandomGreeting();

	// Upon loading website, get all starting data
	getUsers();
	getExternalExercises();
</script>

<header>
	<div class="header-container centered">
		<div class="logo">
			<img class="logo" src="appicon.png" alt="logo">
			<h2>träna</h2>
		</div>
		<nav>
			<button class="nav" on:click={enableSplash}>Home</button>
			<button class="nav" on:click={disableSplash}>Profile</button>
			<button class="nav" on:click={enableGraph}>Graph</button>
		</nav>
	</div>
</header>


<main>
	<div class="centered">
		{#if showSplash === true}
			<!-- Show introducting `splash` screen -->
			<div class="welcome greeting">
				<h1>Welcome to <span class="emph">träna!</span></h1>
			</div>
			<div class="welcome text">
				Keeping track of your workouts is a tedious affair. With <span class="emph">träna</span> you can direct all your time and energy to your healthy lifestyle. 
			</div>
			<div class="welcome text">
				We've picked a pretentious Scandinavian word for our app so that you feel more encouraged to make obnoxious health-related content about your perfect life on social media!
			</div>
			<div class="button-container center">
				<input type="submit" class="big" value="GET STARTED" on:click={disableSplash}>
			</div>
			{:else}
			<!-- Show `select profile` screen -->
			{#if dataLoaded === true}
				{#if activeUser == -1}
					<h1>Who's training?</h1>
					<div class="profile-container">
						{#if users}		
							<UserList users={users} onEditProfile={editProfile} onSelectProfile={getProfileData}/>
						{/if}
					</div>
					<div class="main-container">
						<input type="submit" class="big margin" value="Add new user" on:click={addUser}>
					</div>
					{:else}
					<!-- Profile selected, show calendar for user -->
					{#if showGraph == false}
						<div class="top">
							<img src="return.png" on:click={e => {activeUser=-1}} class="icon large padding" alt="back">
							<h1>
								{greeting}, {userName}?
							</h1>
						</div>
						<div class="center-header">
							<img src="left-arrow.png" data-cy="arrow-left" class="icon large" alt="month left" on:click={e => {updateMonth(-1)}}>
							<span class="month">{currentMonthName}</span>
							<img src="right-arrow.png" data-cy="arrow-right" class="icon large" alt="month right" on:click={e => {updateMonth(1)}}>
						</div>
						<div class="main-container">
							<MonthList month={currentMonthIndex} onAddExercise={addNewExercise} exercisesData={exercisesByMonth}/>
						</div>
					{:else}
						<!-- Show graph for user -->
						<div class="center-header">
							<h1>Statistics for {userName}</h1>
						</div>
						<div class="center-header">
							<h2>Good busy!<h2>
						</div>
						<div class="main-container">
							<Graph exercises={exercises}/>
						</div>
					{/if}
				{/if}
				{:else}
				<!-- No API data loaded, show loading animation -->
				<div class="button-container center">
					<div class="lds-hourglass"></div>
				</div>
			{/if}
		{/if}
	</div>
</main>

<Modal />
