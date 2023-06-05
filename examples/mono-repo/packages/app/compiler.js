const { asyncShellExecutor } = require("../../../../lib/utils");

asyncShellExecutor("yarn webpack")
  .then((code, info) => {
    info && console.log("info: ", info);
  })
  .catch((reason) => {
    reason && console.log("reason: ", reason);
  });
