const fs = require("fs");
const parse = require(".");

(async () => {
  const replayBuffer = fs.readFileSync(
    "UnsavedReplay-2023.07.19-13.49.36.replay"
  );

  console.time();
  const parsedReplay = await parse(replayBuffer, {
    parseLevel: 1,
    // customNetFieldExports: [
    //   require('./NetFieldExports/SafeZoneIndicator.json'),
    // ],
    // onlyUseCustomNetFieldExports: true,
    debug: true,
    useCheckpoints: true,
  });
  console.timeEnd();

  fs.writeFileSync("replay.json", JSON.stringify(parsedReplay, null, 2));
})().catch((err) => {
  console.error(err.stack);
});
