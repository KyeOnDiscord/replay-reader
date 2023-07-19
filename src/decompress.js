const ooz = require("ooz-wasm");
const Replay = require("./Classes/Replay");
const fs = require("fs");

/**
 * @param {Replay} replay
 * @param {Boolean} isCompressed
 */
const decompress = async (replay, isCompressed) => {
  if (!isCompressed) {
    return replay;
  }

  const decompressedSize = replay.readInt32();
  const compressedSize = replay.readInt32();
  const compressedBuffer = replay.readBytes(compressedSize);

  const unsafeDecompress = await ooz.decompressUnsafe(
    compressedBuffer,
    decompressedSize
  );
  const decompressed = Buffer.from(unsafeDecompress);
  console.log(
    "Decompressed replay, size: " +
      decompressed.length +
      " | " +
      decompressedSize
  );
  //Write decompressed replay to file
  fs.writeFileSync("decompressed.replay", decompressed);

  const newReplay = new Replay(decompressed);

  newReplay.header = replay.header;
  newReplay.info = replay.info;

  return newReplay;
};

module.exports = decompress;
