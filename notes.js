var notes = {};
var names = [];

exports.list = function(req, res) {
  res.json(Object.keys(notes));    
  console.log(notes.count); 
}
exports.get = function(note_name, req, res) {
  if (!notes.hasOwnProperty(note_name)) {
    res.status(404);
    res.end();
    console.error(note_name + " NOT FOUND!");
  } else {
    res.json(notes[note_name]);
  }
};

exports.getbycontent = function(content, req, res) {
  for(let i = 0; i < names.length; i++){
    if(notes[names[i]].content.includes(content)){
      this.get(names[i], req, res);
      return;
    }
  }
  res.send("Not found");
  res.end();
};

exports.insert = function(note_name, req, res) {
  if (notes.hasOwnProperty(note_name)) {
    res.status(409);
    return console.error(note_name + " ALREADY THERE!");
  } else {
    if (!req.body.content) {
      res.status(422);
      res.end();
      return console.error(note_name + " INCORRECT BODY JSON!");
    }
    notes[note_name] = { content: req.body.content, inserted: new Date() };
    names.push(note_name);
    res.end();
  }
};

exports.delete = function(note_name, req, res) {
  if (!notes.hasOwnProperty(note_name)) {
    res.status(404);
    res.end();
    console.error(note_name + " NOT FOUND!");
  } else {
    delete notes[note_name];
    this.list(note_name, req, res);
  }
};

exports.upsert = function(note_name, req, res) {
  if (notes.hasOwnProperty(note_name)) {
    notes[note_name] = { content: req.body.content, modified: new Date() };
    res.end();
  } else {
    this.insert(note_name, req, res);
  }
};
