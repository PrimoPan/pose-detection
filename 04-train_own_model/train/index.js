let pose;
let brain;

function setup() {
    let options = {
        inputs: 34,
        outputs: 4,
        task: 'classification',
        debug: true
    }
    brain = ml5.neuralNetwork(options);
    brain.loadData("abcd.json", dataReady)
}

function dataReady()
{
    brain.normalizeData();
    brain.train({epochs:100},finished);
}
function finished()
{
    console.log("model trained")
    brain.save()
}