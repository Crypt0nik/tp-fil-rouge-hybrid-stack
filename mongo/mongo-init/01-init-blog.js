const databaseName = process.env.MONGODB_INITDB_DATABASE || db.getName();
const collectionName = "posts";

const schema = {
  $jsonSchema: {
    bsonType: "object",
    required: ["titre", "auteur", "vues"],
    additionalProperties: false,
    properties: {
      _id: {
        bsonType: "objectId",
      },
      titre: {
        bsonType: "string",
      },
      auteur: {
        bsonType: "string",
      },
      vues: {
        bsonType: ["int", "long", "double", "decimal"],
      },
    },
  },
};

const blogDb = db.getSiblingDB(databaseName);
const existingCollections = blogDb.getCollectionInfos({ name: collectionName });

if (existingCollections.length === 0) {
  blogDb.createCollection(collectionName, {
    validator: schema,
    validationLevel: "strict",
    validationAction: "error",
  });
} else {
  blogDb.runCommand({
    collMod: collectionName,
    validator: schema,
    validationLevel: "strict",
    validationAction: "error",
  });
}

const posts = blogDb.getCollection(collectionName);

if (posts.countDocuments() === 0) {
  posts.insertMany([
    { titre: "La creation du tsty crousty", auteur: "Patoche Nowak", vues: NumberInt(67) },
    { titre: "La creation du 67", auteur: "Arthur Chesse", vues: NumberInt(143) },
    { titre: "La tasty crousty d'RNboy", auteur: "Rn Boy", vues: NumberInt(221) },
    { titre: "Les election presidentielle 2027", auteur: "Cyril Hanouna", vues: NumberInt(92) },
    { titre: "Touche pas a mon poste", auteur: "Cyril Hanouna", vues: NumberInt(118) },
  ]);
}
