const generateRoomId = (id1, id2) => [id1, id2].sort().join("_")

module.exports = generateRoomId