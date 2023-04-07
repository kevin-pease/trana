<script>
    import { onMount } from 'svelte';
    export let exercises;

    // Returns an object with months for keys, and corresponding number of exercises for that month
    function generateStats(exercises) {
        let matrix = {
            0:0,
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
        }
        for (let exercise in exercises) {
            let month = parseInt(exercises[exercise].date.slice(5,7));
            matrix[month] += 1;
        }
        return matrix;
    }

    const months = ['j','f','m','a', 'm', 'j','j','a','s','o','n','d'];

    let canvasRect;
    let canvasGraph;
    let graphData = generateStats(exercises);

    onMount(() => {
        // Draw background for graph
        var context1 = canvasRect.getContext("2d");
        context1.lineWidth = 1;
        context1.rect(0, 0, canvasRect.width, 200);
        var grd = context1.createLinearGradient(0, 0, 0, 200);
        grd.addColorStop(0, 'rgba(0, 0, 0, 0)');   
        grd.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        context1.fillStyle = grd;
        context1.fill();
        // Draw initials of months
        context1.font = "14px Arial";
        context1.fillStyle = "black";
        for (let i = 0; i < 12; i++) {
            context1.fillText(months[i], (i*72)-1, 215); 
        }
        // Draw graph
        var context2 = canvasGraph.getContext("2d");
        context2.lineWidth = 3;
        context2.strokeStyle = 'grey';
        context2.lineCap = "round";
        let oldX;
        let oldY = 0;
        for (let x in graphData) {
            let y = graphData[x];
            y =  200 -  (y * 20);
            x = x * 72;
            oldX = x;
            oldY = graphData[y];
            // Draw
            context2.moveTo(oldX, oldY);
            context2.lineTo(x, y);
            context2.stroke();
            context2.arc(x, y, 3, 0, 2 * Math.PI, false);
            context2.stroke();
        }
    });
</script>

<div class="canvas-overlay">
    <canvas id="canvasRect" bind:this={canvasRect} width="792" height="220"></canvas>
    <canvas id="=canvasGraph" bind:this={canvasGraph} width="792" height="220"></canvas>
</div>