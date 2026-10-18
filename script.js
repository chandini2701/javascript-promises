const output = document.getElementById("output");
const statusText = document.getElementById("status");

function showStatus(message) {
  statusText.textContent = "Status: " + message;
}

function showOutput(message) {
  output.textContent = message;
}

// 1. Fulfilled Promise
function runResolve() {
  showStatus("Running resolve example...");

  Promise.resolve("Operation completed successfully!").then((result) => {
    showStatus("Fulfilled");
    showOutput(result);
  });
}

// 2. Rejected Promise
function runReject() {
  showStatus("Running reject example...");

  Promise.reject(new Error("Something went wrong!")).catch((error) => {
    showStatus("Rejected and handled");
    showOutput("Error: " + error.message);
  });
}

// 3. Promise chaining
function runChain() {
  showStatus("Running Promise chain...");

  Promise.resolve(10)
    .then((value) => {
      showOutput("Step 1: " + value);
      return value + 5;
    })
    .then((value) => {
      showOutput("Step 2: " + value);
      return value * 2;
    })
    .then((value) => {
      showStatus("Chain completed");
      showOutput("Final result: " + value);
    })
    .catch((error) => {
      showStatus("Error");
      showOutput(error.message);
    });
}

// 4. finally()
function runFinally() {
  showStatus("Running finally example...");

  Promise.resolve("Task successful")
    .then((result) => {
      showOutput(result);
      return result;
    })
    .finally(() => {
      showStatus("Finally executed");
    })
    .then((result) => {
      showOutput(result + "\nThe finally block has completed.");
    })
    .catch((error) => {
      showStatus("Error");
      showOutput(error.message);
    });
}

// Helper to create a Promise that settles after a delay
function createTask(name, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error(name + " failed"));
      } else {
        resolve(name + " completed");
      }
    }, delay);
  });
}

// 5. Promise.all()
async function runAll() {
  showStatus("Running Promise.all...");
  showOutput("Waiting for all tasks...");

  try {
    const results = await Promise.all([
      createTask("HTML", 500),
      createTask("CSS", 800),
      createTask("JavaScript", 300),
    ]);

    showStatus("All tasks completed");
    showOutput(JSON.stringify(results, null, 2));
  } catch (error) {
    showStatus("One or more tasks failed");
    showOutput(error.message);
  }
}

// 6. Promise.allSettled()
async function runAllSettled() {
  showStatus("Running Promise.allSettled...");
  showOutput("Waiting for all tasks to settle...");

  const results = await Promise.allSettled([
    createTask("Task 1", 400),
    createTask("Task 2", 600, true),
    createTask("Task 3", 200),
  ]);

  showStatus("All tasks settled");
  showOutput(JSON.stringify(results, null, 2));
}

// 7. Promise.race()
async function runRace() {
  showStatus("Running Promise.race...");
  showOutput("Waiting for the first task to settle...");

  try {
    const result = await Promise.race([
      createTask("Fast task", 300),
      createTask("Slow task", 1000),
    ]);

    showStatus("Race completed");
    showOutput("First result: " + result);
  } catch (error) {
    showStatus("Race rejected");
    showOutput(error.message);
  }
}

// 8. Promise.any()
async function runAny() {
  showStatus("Running Promise.any...");
  showOutput("Waiting for the first successful task...");

  try {
    const result = await Promise.any([
      createTask("Task 1", 200, true),
      createTask("Task 2", 500),
      createTask("Task 3", 700),
    ]);

    showStatus("First success received");
    showOutput(result);
  } catch (error) {
    showStatus("All tasks failed");
    showOutput(error.message);
  }
}

// 9. async and await
async function runAsyncAwait() {
  showStatus("Running async/await example...");
  showOutput("Loading data...");

  try {
    const result = await createTask("Student data", 1000);

    showStatus("Async operation completed");
    showOutput(result);
  } catch (error) {
    showStatus("Error");
    showOutput(error.message);
  }
}
