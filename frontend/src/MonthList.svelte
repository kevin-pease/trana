<script>
    import ExerciseDay from "./ExerciseDay.svelte";
    import Edit from "./Edit.svelte";
    import {openModal, closeModal} from "./Modal.svelte";
	import {api} from "./tools";
    export let exercisesData;
    export let month;
    export let onAddExercise;
    
    let userId = localStorage.getItem("userId");

    // Receives an exercise, finds the corresponding existing exercise (by id) and replaces old with new one if found
    function editExercise(exercise) {
        for (let i=0; i < exercisesData.length; i++) {
            if (exercisesData[i].id == exercise.id) {
                exercisesData[i] = exercise;
            }
        }
        exercisesData = [...exercisesData];
    }

    // Determines the month for which to create new exercise, opens a modal window for the `add dialog`,
    // and prefills the date with the first day of active month, for user convenience
    function addTrainingDay(month) {
        month += 1;
        let month_str = ""+month;
        if (month <= 9) {
            month_str = "0"+month_str; 
        }
        let date = '2022-'+month_str+'-01'; // default date for current month for edit window
        openModal(Edit, {userId:userId, date:date, onSubmit:submitAdd});
    }
    
    // Callback function for the `add exercise` dialog, adds a new exercise to database and local storage
    async function submitAdd(obj) {
        let result = await api('POST', '/users/'+userId+'/exercises', {name:obj.name, date: obj.date});
        exercisesData.push(result);
        exercisesData = [...exercisesData];
        onAddExercise(result);
        closeModal();
    }

    // Groups all existing exercises for current month by day
    function sortByDay(data) {
        let sorted = {};
        if (data) {
            for (let i=0; i < data.length; i++) {
                let exercise = data[i];
                let day = exercise.date.slice(8,10);
                let key = day.toString();
                if (!sorted.hasOwnProperty(day)) {
                    sorted[key] = [];
                    sorted[key].push(exercise);
                } else {
                    sorted[key].push(exercise);
                }
            }
        }
        return sorted;
    }

    // Deletes an exercise from local storage
    function deleteExercise(id) {
        let index = exercisesData.findIndex(exercise => {
            return exercise.id === id;
        });
        exercisesData.splice(index, 1);
        exercisesData = [...exercisesData];
    }

    $:sortedExercises = sortByDay(exercisesData);
</script>

{#if sortedExercises}
    {#each Object.entries(sortedExercises) as [day, exerciseDay]}
            <ExerciseDay month={month} onEditExercise={editExercise} onAddExercise={submitAdd} exerciseData={exerciseDay} onDelete={deleteExercise}/>
    {/each}
{/if}
{#if exercisesData.length == 0}
    <div class="message vertical">
        No exercises found for this month! 
    </div>
{/if}
<input type="submit" data-cy="add-ex" class="big margin" value="Add training day..." on:click={e => {addTrainingDay(month)}}>